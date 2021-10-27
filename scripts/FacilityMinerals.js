import { getFacilities, getFacilityMinerals, getMinerals, setFacility, setMineral } from "./database.js"



const facilities = getFacilities()
const facilityMinerals = getFacilityMinerals()
const minerals = getMinerals()

let clickFacilityId = 0

document.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "facilityResource") {
            clickFacilityId = parseInt(changeEvent.target.value)
            for (const facility of facilities) {
                if (parseInt(changeEvent.target.value) === facility.id) {
                    setFacility(facility.id)
                }
            }
        }
    })

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

    return `<li>
            <input type="radio" name="facilityMinerals" value="${foundMineral.id}" /> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
            </li>`
}
export const FacilityMinerals = () => {
    const facilityMineralsArr = getFacilityMinerals()

    let html = ""
    if (clickFacilityId > 0) {
        html = "<ul>"

        const listItems = facilityMineralsArr.map(buildFacilityMineralsList)

        html += listItems.join("")
        html += "</ul>"
    }

    return html
}
