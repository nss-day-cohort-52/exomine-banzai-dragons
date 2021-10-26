// make a function that generates a drop down select element for each Governor (.map)

import { getGovernors } from "./database.js";

const governors = getGovernors()

// event listener below to be added later
// document.addEventListener(
//     "change",
//     (changeEvent) => {
//         if (changeEvent.target.id === "resource") {
//             setColony(parseInt(changeEvent.target.value))
//         }
//     }
// )
 

export const Governors = () => {
    let html = ""

    html += `<select id="resource">
    <option value="0">Prompt to select governor...</option>`

    for (const governor of governors) {
        html += `<option value="${governor.id}">${governor.name}</option>`
    }

    return html
}