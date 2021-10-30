const database = {
    governors: [
        {
            id: 1,
            name: "Alex Lewis",
            colonyId: 1,
            active: true
        },
        {
            id: 2,
            name: "Laci Zeidler",
            colonyId: 3,
            active: true
        },
        {
            id: 3,
            name: "Ashley Dickey",
            colonyId: 2,
            active: true
        },
        {
            id: 4,
            name: "Bob Bobberson",
            colonyId: 3,
            active: false
        }
    ],
    colonies: [
        {
            id: 1,
            colony: "Halcyon",
        },
        {
            id: 2,
            colony: "Tamriel",
        },
        {
            id: 3,
            colony: "Jumanji",
        }
    ],
    minerals: [
        {
            id: 1,
            mineral: "Iron"
        },
        {
            id: 2,
            mineral: "Gold"
        },
        {
            id: 3,
            mineral: "Plutonium"
        }
    ],
    facilities: [
        {
            id: 1,
            facility: "Red Hawk",
            active: true
        },
        {
            id: 2,
            facility: "Leadville",
            active: true
        },
        {
            id: 3,
            facility: "Keane Wonder",
            active: false
        }
    ],
    facilityMinerals: [
        {
            id: 1,
            mineralId: 2,
            facilityId: 3,
            ton: 32
        },
        {
            id: 2,
            mineralId: 2,
            facilityId: 1,
            ton: 41
        },
        {
            id: 3,
            mineralId: 1,
            facilityId: 1,
            ton: 24
        },
        {
            id: 4,
            mineralId: 3,
            facilityId: 1,
            ton: 20
        },
        {
            id: 5,
            mineralId: 1,
            facilityId: 2,
            ton: 12
        },
        {
            id: 6,
            mineralId: 1,
            facilityId: 3,
            ton: 37
        },
        {
            id: 7,
            mineralId: 3,
            facilityId: 3,
            ton: 11
        }
    ],
    colonyMinerals: [
        {
            id: 1,
            colonyId: 3,
            mineralId: 1,
            ton: 6
        },
        {
            id: 2,
            colonyId: 3,
            mineralId: 2,
            ton: 13
        },
        {
            id: 3,
            colonyId: 1,
            mineralId: 2,
            ton: 3
        },
        {
            id: 4,
            colonyId: 2,
            mineralId: 3,
            ton: 10
        }
    ],
    transientState: {}
}

// GET FUNCTIONS
export const getGovernors = () => {
    return database.governors.map(f => ({ ...f }))
}
export const getColonies = () => {
    return database.colonies.map(f => ({ ...f }))
}
export const getMinerals = () => {
    return database.minerals.map(f => ({ ...f }))
}
export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}
export const getFacilityMinerals = () => {
    return database.facilityMinerals.map(f => ({ ...f }))
}
export const getColonyMinerals = () => {
    return database.colonyMinerals.map(f => ({ ...f }))
}
export const getTransientState = () => {
    // find a method to return a COPY of the object
    let copyOfTransientState = Object.assign({}, database.transientState)
    return copyOfTransientState
}

// SET FUNCTIONS
export const setColony = (id) => {
    database.transientState.colonyId = id
    document.dispatchEvent(new CustomEvent("transientStateChanged"))
}
export const setMineral = (id) => {
    database.transientState.mineralId = id
    document.dispatchEvent(new CustomEvent("transientStateChanged"))
}
export const setFacility = (id) => {
    database.transientState.facilityId = id
    document.dispatchEvent(new CustomEvent("transientStateChanged"))
}

// The responsibility of this function is to increase the ton property on an existing object by 1 in the colonyMinerals array. 
// It also needs to decrease the ton property by 1 on the facilityMineral object selected within the radio buttons 
// If an object doesn't already exist in the colonyMinerals array with the same mineralId and colonyId as the newPurchase object, we want to push that NEW object from the trasientState to the colonyMinerals array
export const purchaseMineral = () => {
    const newPurchase = { ...database.transientState }

    const foundColonyObj = database.colonyMinerals.find(
        (colonyMineralObj) => {
            return colonyMineralObj.mineralId === newPurchase.mineralId && colonyMineralObj.colonyId === newPurchase.colonyId
        })
    const foundFacilityObj = database.facilityMinerals.find(
        (facilityMineralObj) => {
            return facilityMineralObj.mineralId === newPurchase.mineralId && facilityMineralObj.facilityId === newPurchase.facilityId
        })
    if (foundColonyObj) {
        foundColonyObj.ton += 1
        foundFacilityObj.ton -= 1
    } else {
        const brandNewPurchase = {
            colonyId: newPurchase.colonyId,
            mineralId: newPurchase.mineralId,
            ton: 1
        }
        foundFacilityObj.ton -= 1
        const lastIndex = database.colonyMinerals.length - 1
        brandNewPurchase.id = database.colonyMinerals[lastIndex].id + 1
        database.colonyMinerals.push(brandNewPurchase)
    }
    delete database.transientState.mineralId
    document.dispatchEvent(new CustomEvent("permanentStateChanged"))

}