import { getFacilities, getTransientState, setFacility } from "./database.js";

const facilities = getFacilities()

// The responsibility of this eventListener is to call the setFacility() function whenever a facility is selected from the facility drop down (adds a facilityId property to the transientState object)
document.addEventListener(
    "change",
    (changeEvent) => {
        /*We are checking to see if the changeEvent.target.id is equal to the string, "facilityResource" (in this case its the id property
        of the html select element)*/    //--see the strong of html within the Facilities() function in Facilities.js--//
        if (changeEvent.target.id === "facilityResource") {
            /*Here we are parsing changeEvent.target.value as an integer and storing that value in a variable called clickedFacilityId --see the html within the Facilities() function below for the value attribute on the option elements--  */
            const clickedFacilityId = parseInt(changeEvent.target.value)
            /*IF the above condition is met, We need to iterate through the facilities array with a forof loop (see line 5 for where we stored our array in a variable)*/
            for (const facility of facilities) {
                /*Next, we can use an if statement to check the value of the facility.id property on each object and see if any of them are equal to the value in our clickedFacilityId variable */
                if (clickedFacilityId === facility.id) {
                    /*Here we use the setFacility() function to set the "facilityId" property that met the condition to our transientState object (see database.js:168 for function declaration)*/
                    setFacility(facility.id)
                }
            }
        }
    })

// The responsibility of this function is to genrerate the html content for our facilities array. The html content will be displayed as options for each facility in a select element (dropdown menu)
export const Facilities = () => {
    const transientState = getTransientState()
    let html = ""

    html += `<select id="facilityResource">
    <option value="0">Prompt to select facility...</option>`

    for (const facility of facilities) {
        if (transientState.facilityId === facility.id && facility.active === true) {
            html += `<option value="${facility.id}" selected>${facility.facility}</option>`
        }
        else if (facility.active === true) {
            html += `<option value="${facility.id}">${facility.facility}</option>`
        }
    }
    html += `</select>`
    return html
}
