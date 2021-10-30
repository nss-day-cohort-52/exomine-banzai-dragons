import { getGovernors, getMinerals, getColonyMinerals, getTransientState } from "./database.js"

// this function takes an object as a parameter and generates html elements to display the inventory of minerals for a selected colony
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
        html = "Please select a governor to see available resources for a colony"
    }

    return html
}