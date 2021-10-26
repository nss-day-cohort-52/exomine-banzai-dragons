// make a function that generates a drop down select element for each Facility (.map)

import { getFacilities, setFacility } from "./database.js";

const facilities = getFacilities() 

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "facility") {
            setFacility(parseInt(event.target.value))
        }
    }
)

export const Facilities = () => {
    let html = ""
    const facilitiesArray = facilities.map(
        (facility) => {
            return `
            <select name="facility" id="facility">
            <option value="${facility.id}">${facility.facility}</option>
          </select>
            `
        }
    )
    html += facilitiesArray.join("")
    return html
}
