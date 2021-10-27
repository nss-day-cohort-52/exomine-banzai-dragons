import { getFacilities, getFacilityMinerals, getMinerals, setFacility, setMineral } from "./database.js"



const facilities = getFacilities()
const facilityMinerals = getFacilityMinerals()
const minerals = getMinerals()

let clickFacilityId = 0

// change event listener that listens for the facility drop down to be selected, uses setFacility() to set facilityId to our transientState
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facilityResource") {
            clickFacilityId = parseInt(changeEvent.target.value)
            for (const facility of facilities) {
                if (clickFacilityId === facility.id) {
                    setFacility(facility.id)
                }
            }
        }
    })

// change event listener that listens for a radio button to be selected, uses setMineral() to set mineralId to our transientState
document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.name === "facilityMinerals") {
            for (const facilityMineralObj of facilityMinerals) {
                if (parseInt(changeEvent.target.value) === facilityMineralObj.id) {
                    setMineral(facilityMineralObj.mineralId)
                }
            }
        }
    }
)

const buildFacilityMineralsList = (facilityMineralObj) => {

    const foundFacility = facilities.find(
        facility => {
            return facility.id === facilityMineralObj.facilityId
        }
    )
    const foundMineral = minerals.find(
        mineral => {
            return mineral.id === facilityMineralObj.mineralId
        }
    )
    if (foundFacility.id === facilityMineralObj.facilityId) {
        return `<li>
            <input type="radio" name="facilityMinerals" value="${facilityMineralObj.id}" /> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
            </li>`
    }
}
export const FacilityMinerals = () => {
    const facilityMineralsArr = getFacilityMinerals()

    const redHawkMineralsArr = facilityMineralsArr.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 1
    })
    const leadvilleMineralsArr = facilityMineralsArr.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 2
    })
    const keaneWonderMineralsArr = facilityMineralsArr.filter(facilityMineralObj => {
        return facilityMineralObj.facilityId === 3
    })

    let html = ""

    if (clickFacilityId === 1) {
        html = "<ul>"

        const listItems = redHawkMineralsArr.map(buildFacilityMineralsList)
        html += listItems.join("")
        html += "</ul>"
    } else if (clickFacilityId === 2) {
        html = "<ul>"

        const listItems = leadvilleMineralsArr.map(buildFacilityMineralsList)
        html += listItems.join("")
        html += "</ul>"
    } else if (clickFacilityId === 3) {
        html = "<ul>"

        const listItems = keaneWonderMineralsArr.map(buildFacilityMineralsList)
        html += listItems.join("")
        html += "</ul>"
    } else {
        html = "Please choose a facility!"
    }

    return html
}


