import { getFacilities, getFacilityMinerals, getMinerals, setFacility, setMineral } from "./database.js"


// Get all of the permanent data we will need to use in this module by calling the getFunctions declared in the database.js 
// Store their values (arrays of objects) in variables
const facilities = getFacilities()
const facilityMinerals = getFacilityMinerals()
const minerals = getMinerals()

// We need a variable we can use in our eventListeners to be able to store within it, the changeEvent.target.value (the option selected in the facilities dropdown)
// We will declare this variable with "let" in the global scope and set it's value to 0
let clickFacilityId = 0


// This is a change event listener that listens for the facility drop down to be selected
// It then sets the facility.id of the chosen facility as the value of the new facilityId property in the transientState object within the database using the setFacility() function
document.addEventListener(
    "change",
    (changeEvent) => {
        /*We are checking to see if the changeEvent.target.id is equal to the string, "facilityResource" (in this case its the id property
        of the html select element)*/    //--see the strong of html within the Facilities() function in Facilities.js--//
        if (changeEvent.target.id === "facilityResource") {
            /*We will need to use the variable declared on line 12 to store the value of the changeEvent.target.value 
            (which just so happens to be the facility.id of the facility selected) --see the html within the Facilities() function in Facilities.js--  */
            clickFacilityId = parseInt(changeEvent.target.value)
            /*IF the above condition is met, We need to iterate through the facilities array with a forof loop (see line 6 for where we stored our array in a variable)*/
            for (const facility of facilities) {
                /*Next, we can use an if statement to check the value of the facility.id property on each object and see if any of them are equal to the value in our clickFacilityId variable */
                if (clickFacilityId === facility.id) {
                    /*Here we use the setFacility() function to set the "facilityId" property that met the condition to our transientState object (see database.js:168 for function declaration)*/
                    setFacility(facility.id)
                }
            }
        }
    })

// This is a change event listener that listens for a radio button to be selected
document.addEventListener(
    "change",
    (changeEvent) => {
        /*We are checking to see IF the changeEvent.target.name is equal to the string, "facilityMinerals" (in this case its the name property
        of the input html element)*/    //--see the string of html within the buildFacilityMineralsList() function below in this module--//
        if (changeEvent.target.name === "facilityMinerals") {
            /*IF that condition is met, we need to iterate through the facilityMinerals array with a forof loop (see line 7 for where we stored our array in a variable)*/
            for (const facilityMineral of facilityMinerals) {
                /*Next we use an if statement to check the value of the facilityMineral.id property on each object and see if any of them are equal to the value to our changeEvent.target.value (the selected radio button) */
                if (parseInt(changeEvent.target.value) === facilityMineral.id) {
                    /*IF that condition is met, we use the setMineral() function to set the "mineralId" property that met the condition to our transientState object (see database.js:168 for function declaration)*/
                    setMineral(facilityMineral.mineralId)
                }
            }
        }
    }
)

// Here we are declaring and exporting a fuction that will return a string of html (a radio button). This function takes an object as a parameter
const buildFacilityMineralsList = (facilityMineralObj) => {
    // Here we are using the .find array method to iterate through the facilities array and return the first facility object that meets the condition set within the function body 
    // Store the value of the .find method in a variable 
    const foundFacility = facilities.find(
        facility => {
            return facility.id === facilityMineralObj.facilityId
        }
    )
    // Here we are using the .find array method to iterate through the minerals array and return the first mineral object that meets the condition set within the function body
    // Store the value of the .find method in a variable 
    const foundMineral = minerals.find(
        mineral => {
            return mineral.id === facilityMineralObj.mineralId
        }
    )

    // IF the object stored in our foundFacility variable has an id propery that is strictly equal to the facilityId property on the object that is passed into the fuction as an argument...
    if (foundFacility.id === facilityMineralObj.facilityId) {
        // We will return a string of html (a radio button enclosed in a list element) that is interpolated with the values of object properties
        return `<li>
            <input type="radio" name="facilityMinerals" value="${facilityMineralObj.id}" /> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
            </li>`
    }
}
// Declare and export a new function. This function will be responsible for generating our list of minerals for a specific facility (string of html, radio buttons)
export const FacilityMinerals = () => {
    /* STEPS FOR USING THE .filter() ARRAY METHOD
    1. Add the .filter() array method on the array that we just stored in a variable
    2. .filter() takes a function as an argument and then iterates through the array (vocabulary: "callback function")
    3. A new array will be returned with all of the objects that met the condition(s) that were declared in the function body
    4. Store this value in a new variable
    */
    const redHawkMineralsArr = facilityMinerals.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 1
    })
    // Repeat steps above using .filter until each facility has it's own array of facilityMineral objects
    const leadvilleMineralsArr = facilityMinerals.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 2
    })
    // Repeat steps above using .filter until each facility has it's own array of facilityMineral objects
    const keaneWonderMineralsArr = facilityMinerals.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 3
    })

    // Here we are declaring a variable, html, and setting it equal to an empty string
    let html = ""
    // We want to be able to display the facilityMineral objects as html, but we only want to display the facilityMineral objects that are related to the unique facility selected in the drop down on the web page
    // We can repurpose the global variable (clickFacilityId) we have been using throughout the module (see line 23)
    // Here we are checking to see if the value of clickFacilityId is strictly equal to the integer of 1 (which is what the value is when the user selects "Red Hawk" from the facilities dropdown)
    if (clickFacilityId === 1) {
        /*IF that condition is met, then we will set our html variable to an opening unordered list tag (string of html)*/
        html = "<ul>"
        /* STEPS FOR USING THE .map() ARRAY METHOD
        1. Add the .map() array method on the array you want to iterate through
        2. .map() creates a new array populated with the results of calling a provided function on every object in the calling array.
        3. Store this value in a new variable (listItems)
        */
        const listItems = redHawkMineralsArr.map(buildFacilityMineralsList)
        //The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
        html += listItems.join("")
        // CLose up our unordered list with a closing tag (string of html)
        html += "</ul>"
    }
    // Write an else if statement, and repeat the steps above to map a new string of html content (radio buttons) for each object in leadvilleMineralsArr
    else if (clickFacilityId === 2) {
        html = "<ul>"
        const listItems = leadvilleMineralsArr.map(buildFacilityMineralsList)
        html += listItems.join("")
        html += "</ul>"
    }
    // Write another else if statement, and repeat the steps above to map a new string of html content (radio buttons) for each object in leadvilleMineralsArr
    else if (clickFacilityId === 3) {
        html = "<ul>"
        const listItems = keaneWonderMineralsArr.map(buildFacilityMineralsList)
        html += listItems.join("")
        html += "</ul>"
    }
    //This final else statement acts as an html content placeholder. It displays the string, "Please choose a facility", if nothing is selected in the facilities drop down
    else {
        html = "Please choose a facility!"
    }
    // Finally, return the string of html that meets the first test it passes in the if else statements
    return html
}


