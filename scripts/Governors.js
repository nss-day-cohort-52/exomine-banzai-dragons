import { getGovernors, getTransientState, setColony } from "./database.js";

const governors = getGovernors()

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "governor") {
            for (const gov of governors) {
                const selectedGovernorId = parseInt(changeEvent.target.value)
                if (selectedGovernorId === gov.id) {
                    setColony(gov.colonyId)
                }
            }
        }
    }
)
export const Governors = () => {
    const transientState = getTransientState()
    let html = ""

    html += `<select id="governor">
    <option value="0">Prompt to select governor...</option>`

    for (const governor of governors) {
        if (transientState.colonyId === governor.colonyId && governor.active === true) {
            html += `<option value="${governor.id}" selected>${governor.name}</option>`
        } else if (governor.active === true) {
            html += `<option value="${governor.id}">${governor.name}</option>`
        }
    }
    html += `</select>`
    return html
}