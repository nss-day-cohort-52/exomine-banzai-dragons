// make a function that generates HTML that displays the current colony's mineral inventory (colony is dependent on the selected governor)
import { getGovernors, getMinerals, getColonyMinerals, getTransientState } from "./database.js"

// this function builds list items of minerals and tons purchased
const buildListItem = (colmin) => {
    const minerals = getMinerals()
    const governors = getGovernors()

    const foundGovernor = governors.find((governor) => {
        return governor.colonyId === colmin.colonyId
    })

    const foundMin = minerals.find(
        (mineral) => {
            return mineral.id === colmin.mineralId
        }
    )
    if (foundGovernor.colonyId === colmin.colonyId) {
        return `<div> ${colmin.ton} tons of ${foundMin.mineral}</div>`
    }

}

export const colonyMinerals = () => {
    const colmins = getColonyMinerals()
    let html = ""

    const halcyonArray = colmins.filter(colmin => {
        return colmin.colonyId === 1
    })
    const tamrielArray = colmins.filter(colmin => {
        return colmin.colonyId === 2
    })
    const jumanjiArray = colmins.filter(colmin => {
        return colmin.colonyId === 3
    })
    const transState = getTransientState()

    if (transState.colonyId === 1) {
        html += "<ul>"
        const listItems = halcyonArray.map(buildListItem)
        html += listItems.join("")
        html += "</ul>"
    }
    else if (transState.colonyId === 3) {
        html += "<ul>"
        const listItems = jumanjiArray.map(buildListItem)
        html += listItems.join("")
        html += "</ul>"
    }
    else if (transState.colonyId === 2) {
        html += "<ul>"
        const listItems = tamrielArray.map(buildListItem)
        html += listItems.join("")
        html += "</ul>"
    }
    else {
        html = "Please select governor to see available resources for the colony"
    }

    return html
}