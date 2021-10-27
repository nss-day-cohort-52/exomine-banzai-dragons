// The responsibility of this module is to display the selected input value from the Minerals at Facility to the Cart section. 

import { getFacilityMinerals } from "./database.js"

// Write a function that displays in HTML the values stored in the transient state object. 

// Use the value of the radio button that gets selected. 
const FacilityMinerals = getFacilityMinerals()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "cart") {
            parseInt(event.target.value)
        }
    }
)

export const SpaceCart = () => {
    let html = ""
    for (const FacilityMineralObj of FacilityMinerals) {
        html += `
            <li name="cart" value="${FacilityMineralObj.id}">One ton of ${FacilityMineralObj.mineralId} at ${FacilityMineralObj.facilityId}</li>
        `
    }
    return html
}
