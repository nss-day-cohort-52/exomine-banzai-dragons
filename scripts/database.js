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


export const incrementCM = (id) => {
    const colonyMinerals = getColonyMinerals()
    const foundColonyMin = colonyMinerals.find((colonyMineral) => {
        return colonyMineral.id === id
    })
    foundColonyMin.ton += 1
    document.dispatchEvent(new CustomEvent("permanentStateChanged"))
}
export const decrementFM = (id) => {
    const facilityMinerals = getFacilityMinerals()
    const foundFacilityMin = facilityMinerals.find((facilityMineral) => {
        return facilityMineral.id === id
    })
    foundFacilityMin.ton -= 1
    document.dispatchEvent(new CustomEvent("permanentStateChanged"))
}

// The responsibility of this function is to add to the ton property on an existing object in the colonyMinerals array. 
// If an object doesn't already exist with the same mineralId and colonyId as the newPurchase object, we want to push that object to the colonyMinerals array
export const purchaseMineral = () => {
    // Copy the current state of user choices
    const newPurchase = { ...database.transientState }

    const colonyMinerals = getColonyMinerals()
    const facilityMinerals = getFacilityMinerals()
    // Use .find to interate through the colonyMinerals array and see if the object in the transient state has the same MineralId and colonyId of an object in the calling array
    // IF this condition is met, our .find method will return that object. We store this object in our foundColonyObj variable
    const foundColonyObj = database.colonyMinerals.find(
        (colonyMineralObj) => {
            return colonyMineralObj.mineralId === newPurchase.mineralId && colonyMineralObj.colonyId === newPurchase.colonyId
        })
    const foundFacilityObj = database.facilityMinerals.find(
        (facilityMineralObj) => {
            return facilityMineralObj.mineralId === newPurchase.mineralId && facilityMineralObj.facilityId === newPurchase.facilityId
        })
    // Iterate through the colonyMinerals array
    // While iterating, we want to check and see if any of the objects in that array have the same id property value as our foundColonyObj.id
    // If this is true, we want to increase the exisiting ton property by 1  
    // for (const colonyMineralObj of colonyMinerals) {
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
        // If there is not an existing object with the same facilityId and colonyId on it as our transientState object, we want to add a new unique id to the newPurchase object and push that object to the colonyMinerals array 
        const lastIndex = database.colonyMinerals.length - 1
        brandNewPurchase.id = database.colonyMinerals[lastIndex].id + 1
        // We also want to add a ton property and set it's value to 1
        // newPurchase.ton = 1
        // Finally, push the new colonyMineral object to colonyMinerals array
        // debugger
        database.colonyMinerals.push(brandNewPurchase)
        // document.dispatchEvent(new CustomEvent("pushedNewObject"))
    }
    delete database.transientState.mineralId
    document.dispatchEvent(new CustomEvent("permanentStateChanged"))
    // }
    // Reset the temporary state for user choices

    // Broadcast a notification that permanent state has changed
}