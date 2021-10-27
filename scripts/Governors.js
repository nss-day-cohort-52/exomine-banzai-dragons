// make a function that generates a drop down select element for each Governor (.map)

import { getGovernors, setColony } from "./database.js";

const governors = getGovernors()

// event listener sets colony id for transient state object based on governor selected
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "resource") {
                for (const governor of governors) {
                    if (parseInt(changeEvent.target.value) === governor.id){
                        setColony(governor.colonyId)
                    }
                }
        }
})
 
// governors function provides html for gov options in dropdown format
export const Governors = () => {
    let html = ""

    html += `<select id="resource">
    <option value="0">Prompt to select governor...</option>`

    for (const governor of governors) {
        html += `<option value="${governor.id}">${governor.name}</option>`
    }
    html +=`</select>`
    return html
}