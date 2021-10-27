import { getFacilities, getFacilityMinerals, getMinerals, setFacility } from "./database.js"


let clickFacilityId = 0

const facilities = getFacilities()

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

const buildFacilityMineralsList = (facilityMineralObj) => {
    const facilities = getFacilities()
    const minerals = getMinerals()

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
            <input type="radio" name="facilityMinerals" value="${foundFacility.id}" /> ${facilityMineralObj.ton} tons of ${foundMineral.mineral} at ${foundFacility.facility}
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
