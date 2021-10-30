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
        },
        {
            id: 4,
            mineral: "Diamond"
        },
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
        },
        {
            id: 4,
            facility: "Old Hundred Gold Mine",
            active: true
        },
        {
            id: 5,
            facility: "Eldorado Canyon",
            active: true
        },
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
        },
        {
            id: 8,
            mineralId: 2,
            facilityId: 4,
            ton: 96
        },
        {
            id: 9,
            mineralId: 4,
            facilityId: 4,
            ton: 21
        },
        {
            id: 10,
            mineralId: 1,
            facilityId: 5,
            ton: 21
        },
        {
            id: 11,
            mineralId: 3,
            facilityId: 5,
            ton: 8
        },
        {
            id: 12,
            mineralId: 2,
            facilityId: 5,
            ton: 87
        },
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

// GET FUNCTIONS (returns a COPY of an ARRAY)
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
/*special get function (returns a COPY of an OBJECT)*/
export const getTransientState = () => {
    let copyOfTransientState = Object.assign({}, database.transientState)
    return copyOfTransientState
}

// SET FUNCTIONS (adds properties to the transientState object)
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
// IF an object doesn't already exist in the colonyMinerals array with the same mineralId and colonyId as the newPurchase object, we want to push that transientState object to the colonyMinerals array
export const purchaseMineral = () => {
    // making a copy of the transientState object and storing that copy in a variable
    const newPurchase = { ...database.transientState }
    // use .find to see is there is an object in the colonyMinerals array that has the same mineralId and colonyId as the object in transient state
    const foundColonyMineralObj = database.colonyMinerals.find(
        (colonyMineralObj) => {
            // RETURNS the first object that meets the conditions defined within the return statement // ELSE {RETURNS UNDEFINED}
            return colonyMineralObj.mineralId === newPurchase.mineralId && colonyMineralObj.colonyId === newPurchase.colonyId
        })
    // use .find to see is there is an object in the facilityMinerals array that has the same mineralId and facilityId as the object in transient state
    const foundFacilityMineralObj = database.facilityMinerals.find(
        (facilityMineralObj) => {
            // RETURNS the first object that meets the conditions defined within the return statement // ELSE {RETURNS UNDEFINED}
            return facilityMineralObj.mineralId === newPurchase.mineralId && facilityMineralObj.facilityId === newPurchase.facilityId
        })
    // This condition runs if the colony selected DOES already have an inventory of the mineral selected
    if (foundColonyMineralObj && newPurchase.colonyId) {
        foundColonyMineralObj.ton += 1
        foundFacilityMineralObj.ton -= 1
        document.dispatchEvent(new CustomEvent("tonIncrease"))
    }
    // This condition runs if the colony selected DOES NOT already have an inventory of the mineral selected
    else if (newPurchase.colonyId && newPurchase.facilityId && newPurchase.mineralId) {
        const brandNewPurchase = {
            colonyId: newPurchase.colonyId,
            mineralId: newPurchase.mineralId,
            ton: 1
        }
        foundFacilityMineralObj.ton -= 1
        const lastIndex = database.colonyMinerals.length - 1
        brandNewPurchase.id = database.colonyMinerals[lastIndex].id + 1
        database.colonyMinerals.push(brandNewPurchase)
        document.dispatchEvent(new CustomEvent("newMineralAdded"))
    }
    // This condition runs if a facility and mineral have been selected, but NOT a governor
    else if (newPurchase.facilityId && newPurchase.mineralId) {
        window.alert("Please select a Governor to purchase this mineral!🐱‍🚀")
    }
    // This condition runs if a facility and governor have been selected, but NOT a mineral
    else if (newPurchase.facilityId && newPurchase.colonyId) {
        window.alert("You have not selected a mineral to purchase from the facility !🐱‍🚀")
    }
    // This condition runs if a facility has NOT been selected yet
    else {
        window.alert("You have not selected a facility to purchase anything from 😮")
    }

    // Deletes the mineralId from the object 
    delete database.transientState.mineralId

    // Disptaches a customEvent for the DOM to listen for
    document.dispatchEvent(new CustomEvent("permanentStateChanged"))
}