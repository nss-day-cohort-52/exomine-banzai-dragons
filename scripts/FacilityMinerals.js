import { getFacilities, getFacilityMinerals} from "./database.js"

// make a function that generates HTML that displays the current facility's mineral inventory (minerals listed is dependent on facility chosen from drop down)
const facilityMineralsArr  = getFacilityMinerals()
const facilitiesArr = getFacilities()

export const FacilityMinerals = () => {
    let html = "<ul>"
    // This is how you have been converting objects to <li> elements
    for (const facilityMineralObj of facilityMineralsArr) {
        for (const facilityObj of facilitiesArr) {
            if (facilityMineralObj.facilityId === facilityObj.id) {
                html += `<li>
                    <input type="radio" name="facility" value="${facilityMineralObj.id}" /> ${facilityMineralObj.ton} tons of ${facilityMineralObj.id}
                </li>`
            }
        }
    }
    html += "</ul>"

    return html
}

// make a function that generates HTML radio buttons for the user to select a certain mineral listed