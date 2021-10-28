import { getGovernors, setColony } from "./database.js";

const governors = getGovernors()
let selectedGovernorId = null
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "governor") {
            // clickGovId = parseInt(changeEvent.target.value)
            for (const gov of governors) {
                selectedGovernorId = parseInt(changeEvent.target.value)
                if (selectedGovernorId === gov.id) {
                    setColony(gov.colonyId) 
                }
            }
        }  
})
 
// governors function provides html for gov options in dropdown format
export const Governors = () => {
    let html = ""

    html += `<select id="governor">
    <option value="0">Prompt to select governor...</option>`

    for (const governor of governors) {
        if (selectedGovernorId === governor.id) {
            html += `<option value="${governor.id}" selected>${governor.name}</option>`
        } else {
            html += `<option value="${governor.id}">${governor.name}</option>`
        }
    }
    html += `</select>`
    return html
}
