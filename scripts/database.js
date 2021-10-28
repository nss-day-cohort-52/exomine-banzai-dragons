const database = {
    governors:[
        {
            id: 1,
            name: "Alex Lewis",
            colonyId: 1
        },
        {
            id: 2,
            name: "Laci Zeidler",
            colonyId: 3
        },
        {
            id: 3,
            name: "Ashley Dickey",
            colonyId: 2
        },
        {
            id: 3,
            name: "Bob Bobberson",
            colonyId: 3
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
            id:1,
            mineral: "Iron"
        },
        {
            id:2,
            mineral: "Gold"
        },
        {
            id:3,
            mineral: "Plutonium"
        }
    ],
    facilities: [
        {
            id: 1,
            facility: "Red Hawk"
        },
        {
            id: 2,
            facility: "Leadville"
        },
        {
            id: 3,
            facility: "Keane Wonder"
        }
    ],
    facilityMinerals:[
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
            // mineralName: "",
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
    ],
    transientState: {}
}

// GET FUNCTIONS
export const getGovernors = () => {
    return database.governors.map(f => ({...f}))
}
export const getColonies = () => {
    return database.colonies.map(f => ({...f}))
}
export const getMinerals = () => {
    return database.minerals.map(f => ({...f}))
}
export const getFacilities = () => {
    return database.facilities.map(f => ({...f}))
}
export const getFacilityMinerals = () => {
    return database.facilityMinerals.map(f => ({...f}))
}
export const getColonyMinerals = () => {
    return database.colonyMinerals.map(f => ({...f}))
}
export const getTransientState = () => {
    // find a method to return a COPY of the object
    let copyOfTransientState = Object.assign({}, database.transientState)
    return copyOfTransientState
}

// SET FUNCTIONS
export const setColony = (id) => {
    database.transientState.colonyId = id
    document.dispatchEvent( new CustomEvent("transientStateChanged") )
}
export const setMineral = (id) => {
    database.transientState.mineralId = id
    document.dispatchEvent( new CustomEvent("transientStateChanged") )
}
export const setFacility = (id) => {
    database.transientState.facilityId = id
    document.dispatchEvent( new CustomEvent("transientStateChanged") )
}



export const purchaseMineral = () => {
    // Copy the current state of user choices
    const newPurchase = {...database.transientState}

    // Add a new primary key to the object
    if (database.colonyMinerals.length === 0) {
        newPurchase.id = 1
    } else {
        const lastIndex = database.colonyMinerals.length - 1
        newPurchase.id = database.colonyMinerals[lastIndex].id + 1
    }
        // Add a timestamp to the order
        newPurchase.timestamp = Date.now()

        // Add the new order object to custom orders state
        database.colonyMinerals.push(newPurchase)
    
        // Reset the temporary state for user choices
        database.transientState = {}
    
        // Broadcast a notification that permanent state has changed
        document.dispatchEvent(new CustomEvent("permanentStateChanged"))
}


