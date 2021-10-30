import { getFacilities, getFacilityMinerals, getMinerals, getTransientState, setMineral } from "./database.js"

// Get all of the permanent data we will need to use in this module by calling the getFunctions declared in the database.js 
// Store their values (arrays of objects) in variables
const facilities = getFacilities()
const minerals = getMinerals()

// The responsibility of this eventListener is to call the setMineral() function whenever a mineral is selected on a radio button (adds a mineralId property to the transientState object)
document.addEventListener(
    "change",
    (changeEvent) => {
        const facilityMinerals = getFacilityMinerals()
        /*We are checking to see IF the changeEvent.target.name is equal to the string, "facilityMinerals" (in this case its the name property
            of the input html element)*/    //--see the string of html within the buildFacilityMineralsList() function below in this module--//
        if (changeEvent.target.name === "facilityMinerals") {
            /*IF that condition is met, we need to iterate through the facilityMinerals array with a forof loop (see line 12 for where we stored our array in a variable, what is the scope of this variable?)*/
            for (const facilityMineral of facilityMinerals) {
                const clickedMineralId = parseInt(changeEvent.target.value)
                /*While iterating the array, we use an if statement to check the value of the facilityMineral.id property on each object and see IF any of them are equal to the value to our changeEvent.target.value (the selected radio button) */
                if (clickedMineralId === facilityMineral.id) {
                    /*IF that condition is met, we use the setMineral() function to set the mineralId property that met the condition to our transientState object (see database.js:168 for function declaration)*/
                    setMineral(facilityMineral.mineralId)
                }
            }
        }
    }
)

// This function takes an object as a parameter and it's responsibility is to generate strings of html for each object to display the inventory of minerals for a selected facility (radio buttons)
const buildFacilityMineralsList = (facilityMineralObj) => {
    const transientState = getTransientState()
    // Here we are using the .find array method to iterate through the facilities array and return the facility object that has the id property with a value equal to the facilityId property on a unique facilityMineral object 
    // Store the value of the .find method in a variable (an object)
    const foundFacility = facilities.find(
        facility => {
            return facility.id === facilityMineralObj.facilityId
        })
    // Here we are using the .find array method to iterate through the minerals array and return the mineral object that has the id property with a value equal to the mineralId property on a unique facilityMineral object 
    // Store the value of the .find method in a variable (an object)
    const foundMineral = minerals.find(
        mineral => {
            return mineral.id === facilityMineralObj.mineralId
        })

    // IF the mineral in the transientState object is equal to the mineral selected, render the selected radio button with a checked attribute. (if a radio button was selected, it will stay selected on render)
    if (transientState.mineralId === foundMineral.id) {
        return `<li>
        <input type="radio" name="facilityMinerals" value="${facilityMineralObj.id}" checked="checked"/> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
        </li>`
    } 
    // ELSE just render the buttons normally (none selected)
    else {
        return `<li>
        <input type="radio" name="facilityMinerals" value="${facilityMineralObj.id}" /> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
        </li>`
    }
}


// This function is be responsible for generating our list of minerals for a specific facility (string of html, radio buttons)
export const FacilityMinerals = () => {
    const transientState = getTransientState()
    const facilityMinerals = getFacilityMinerals()

    let html = ""
    // IF a facility has been selected...
    if (transientState.facilityId) {
        // THEN we can use the .filter array method to iterate through the facilityMinerals array and return all of the facilityMineral objects that have the same facilityId property as what's in the transientState
        // Store the value of the .find method in a variable (an array of facilityMineral objects for the specified facility)
        const filiteredFacilityMineralArr = facilityMinerals.filter(facilityMineralObj => {
            return facilityMineralObj.facilityId === transientState.facilityId
        })

        html = "<ul>"
        /* STEPS FOR USING THE .map() ARRAY METHOD
        1. Add the .map() array method on the array you want to iterate through
        2. .map() creates a new array populated with the results of calling a provided function on every object in the calling array.
        3. Store this value in a new variable (listItems)
        */
        const listItems = filiteredFacilityMineralArr.map(buildFacilityMineralsList)
        //The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
        html += listItems.join("")
        // CLose up our unordered list with a closing tag (string of html)
        html += "</ul>"
    }
    // ELSE meaning no facility was selected...generate placeholder string
    else {
        html += "Please select a facility from the drop down!!"
    }
    // Finally, return the string of html that meets the first test it passes in the if else statements
    return html
}

// The responsibility of this funtion is to generate dynamic html content in the <h2> element of the Facility Minerals section, dependent on which facility is chosen in the drop down
export const FacilityMineralHeading = () => {
    const transientState = getTransientState()
    const foundFacility = facilities.find((facility) => {
        return facility.id === transientState.facilityId
    })
    let html = "Facility Minerals "
    if (foundFacility) {
        html += `at ${foundFacility.facility}`
    }
    return html
}

