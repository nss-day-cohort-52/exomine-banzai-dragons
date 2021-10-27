// make a function that generates a drop down select element for each Facility (.map)

import { getFacilities, setFacility, setMineral } from "./database.js";
import { FacilityMinerals } from "./FacilityMinerals.js";

const facilities = getFacilities() 

// export const renderFacilityMinerals = () => {
//     document.addEventListener(
//         "change",
//         (event) => {
//             if (event.target.id === "facilityResource") {
//                 FacilityMinerals()
//             } 
//         }
//     )
// }
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facilityResource") {
                for (const facility of facilities) {
                    if (parseInt(changeEvent.target.value) === facility.id){
                        setFacility(facility.id)
                    }
                }
        }
})

    export const Facilities = () => {
    let html = ""

    html += `<select id="facilityResource">
    <option value="0">Prompt to select facility...</option>`

    for (const facility of facilities) {
        html += `<option value="${facility.id}">${facility.facility}</option>`
    }
    html += `</select>`
    return html
}


