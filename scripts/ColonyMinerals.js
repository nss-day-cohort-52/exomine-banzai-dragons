// make a function that generates HTML that displays the current colony's mineral inventory (colony is dependent on the selected governor)
import { getColonies, getGovernors, getMinerals, getColonyMinerals, setColony } from "./database.js"

const governors = getGovernors()    
let clickGovId = 0

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "governor") {
            clickGovId = parseInt(changeEvent.target.value)
            for (const gov of governors) {
                if (parseInt(changeEvent.target.value) === gov.id) {
                    setColony(gov.colonyId) 
                }
            }
        }  
})

// this function builds list items of minerals and tons purchased
const buildOrderListItem = (purchase) => {
    const minerals = getMinerals()
    const foundGov = governors.find(
        (gov) => {
            return gov.colonyId === purchase.colonyId
        }
    )
    
    const foundMin = minerals.find(
        (mineral) => {
            return mineral.id === purchase.mineralId
        }
    )

    return `<li>${purchase.ton} tons of ${foundMin.mineral}</li>`
}

export const colonyMinerals = () => {  
    const colmins = getColonyMinerals()
    let html = ""

    if (clickGovId > 0) {
        html += "<ul>"
        
        const listItems = colmins.map(buildOrderListItem)

        html += listItems.join("")
        
        html += "</ul>"
    }

    return html
}