import { getMinerals, getTransientState, getFacilities } from "./database.js"

const facilities = getFacilities()
const minerals = getMinerals()

// The responsibily of this function is to generate html content in the Space Cart section of the webpage, this is dependent upon which radio button is selected by the user
export const SpaceCart = () => {
    const transientState = getTransientState()
    // IF a radio button has been selected
    if (transientState.mineralId) {
        // We can use the .find array method to iterate through the facilites array and return the facility object that is related to the object selected (radio button selected)
        // Store the value of the .find method in a variable (an object)
        const foundFacility = facilities.find(facility => {
            return facility.id === transientState.facilityId
        })
        // We can use the .find array method to iterate through the minerals array and return the mineral object that is related to the object selected (radio button selected)
        // Store the value of the .find method in a variable (an object)
        const foundMineral = minerals.find(mineral => {
            return mineral.id === transientState.mineralId
        })
        // RETURN A STRING WITH INTERPOLATION
        return `<div>
            1 ton of ${foundMineral.mineral} at ${foundFacility.facility}
            </div>`
    }
    // ELSE (meaning a radio button has not been selected)
    else {
        //RETURN A STRING (acts as a placeholder)
        return `<div>
            Please choose a mineral from a facility...
        </div>`
    }
}