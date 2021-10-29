import { getFacilities } from "./database.js"
import { getMinerals, getTransientState } from "./database.js"

// Store the imported functions in a variable to be used later. 
const facilities = getFacilities()
const minerals = getMinerals()


// Write a function that displays in HTML the values stored in the transient state object. 

// Use the value of the radio button that gets selected. 

// Click event listener that listens for when a certain radio button in the facility minerals array gets selected and generates HTML with a space cart function. Does each of the input buttons listed in the facility minerals have a unique identifier?
let clickedFacilityId = null

// Create a variable named clickedFacilityId that is equal to 0.


// Create an event listener that looks through the entire document that listens for a changeEvent. 

document.addEventListener(
    "change",
    (changeEvent) => {
// Create an if statement that only is activated when a target with a name of "facilityMinerals" changes. 
        if (changeEvent.target.name === "facilityMinerals") {
// Set the clickedFacilityId variable to the value of the facilityMinerals button that was clicked and convert it to a number instead of a string. 
            clickedFacilityId = parseInt(changeEvent.target.value)
        }
    }
)
// Create a function stored in a variable named SpaceCart, whose responsibily is to render the HTML when an input button is changed. 
export const SpaceCart = () => {

    if (clickedFacilityId) {
// Make an if statement that has an argument if clickedFacilityId is greater than one, then run the following lines. 
      
// Store the getTransientState function into a variable names transientState.
        const transientState = getTransientState()
// Store the facilities.find function in a variable named foundFacility.
        const foundFacility = facilities.find(facility => {
// This function finds the transientState.facilityId that is equal to the facility.id number. 
                return facility.id === transientState.facilityId
            })
// Store the minerals.find function into a variable named foundMineral.
        const foundMineral = minerals.find(mineral => {
// This function finds the transientState.mineralId that is equal to the mineral.id number. 
                return mineral.id === transientState.mineralId
            })
// If both of those conditionals are met, then return this string interpolation. 
        return `<div>
            1 ton of ${foundMineral.mineral} at ${foundFacility.facility}
            </div>`
    } else {
// If none of these conditionals are met, then run this string interpolation. 
        return `<div>
            Please choose a mineral from a facility...
        </div>`
    }
}