// make a function that generates HTML that displays the current colony's mineral inventory (colony is dependent on the selected governor)
import { getColonies, getGovernors, getMinerals, getColonyMinerals } from "./database.js"

// build a function for the html of the colony mineral section
// i need to access the mineral name from minerals 
export const colonyMinerals = () => {
    const colonymins = getColonyMinerals()
    let html = ""
    for (const colmin of colonymins) {
        html += `<li>${colmin.ton} tons of ${colmin.id}</li>`
    }

    return html
}

// this function runs when the gov drop down menu gets selected 
// export const colonyMinerals = () => {   
//     const colonyMinerals = getColonyMinerals()
//     const colonies = getColonies()

//     let html = "<ul>"

//     colonyMinerals.map(buildOrderListItem)

//     html += listItems.join("")

//     html += "</ul>"

//     return html
// }