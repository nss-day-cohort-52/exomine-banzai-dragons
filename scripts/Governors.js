import { getGovernors, getTransientState, setColony } from "./database.js";

const governors = getGovernors()

// The responsibility of this eventListener is to call the setColony() function whenever a governor is selected from the governor drop down (adds a colonyId property to the transientState object)
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

// The responsibility of this function is to genrerate the html content for our governors array. The html content will be displayed as a dropdown with an option for each governor
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