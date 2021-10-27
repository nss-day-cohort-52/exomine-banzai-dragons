// make a function that generates a drop down select element for each Facility (.map)

import { getFacilities } from "./database.js";

const facilities = getFacilities()


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


