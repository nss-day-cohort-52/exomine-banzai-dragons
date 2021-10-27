import { getGovernors } from "./database.js";

const governors = getGovernors()
 
// governors function provides html for gov options in dropdown format
export const Governors = () => {
    let html = ""

    html += `<select id="governor">
    <option value="0">Prompt to select governor...</option>`

    for (const governor of governors) {
        html += `<option value="${governor.id}">${governor.name}</option>`
    }

    html += `</select>`
    return html
}