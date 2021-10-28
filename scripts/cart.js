import { getFacilities, getFacilityMinerals } from "./database.js"
import { getMinerals, getTransientState } from "./database.js"


// The responsibility of this module is to display the selected input value from the Minerals at Facility to the Cart section. 
const facilities = getFacilities()
const minerals = getMinerals()
const facilityMinerals = getFacilityMinerals()

// Write a function that displays in HTML the values stored in the transient state object. 

// Use the value of the radio button that gets selected. 

// Click event listener that listens for when a certain radio button in the facility minerals array gets selected and generates HTML with a space cart function. Does each of the input buttons listed in the facility minerals have a unique identifier?
let clickedFacilityId = 0
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name === "facilityMinerals") {
            clickedFacilityId = parseInt(changeEvent.target.value)
        }
    }
)

export const SpaceCart = () => {
    if (clickedFacilityId > 0) {
        const transientState = getTransientState()
        const foundFacility = facilities.find(facility => {
                return facility.id === transientState.facilityId
            })
        const foundMineral = minerals.find(mineral => {
                return mineral.id === transientState.mineralId
            })
        return `<div>
            1 ton of ${foundMineral.mineral} at ${foundFacility.facility}
            </div>`
    } else {
        return `<div>
            Please choose a mineral from a facility...
        </div>`
    }
}

document.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "orderButton") {
            clickedFacilityId = 0
        }
    }
)



// Need a function that activates once the event listener finds a click event so that it responds with a string interpolation of one mineral from which facility. 
// const buildShoppingCart = (facilityMineralObj) => {
    // Here we are using the .find array method to iterate through the facilities array and return the first facility object that meets the condition set within the function body 
    // Store the value of the .find method in a variable 
    
        // Here we are using the .find array method to iterate through the minerals array and return the first mineral object that meets the condition set within the function body
        // Store the value of the .find method in a variable 
        
        
        // IF the object stored in our foundFacility variable has an id propery that is strictly equal to the facilityId property on the object that is passed into the fuction as an argument...
        // if (foundFacility.id === facilityMineralObj.facilityId) {
            // We will return a string of html (a radio button enclosed in a list element) that is interpolated with the values of object properties
    //         return `<p>1 ton of ${foundMineral.mineral} at ${foundFacility.facility}</p>`
    //     }
    // }
