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
            ton: 6
        }
    ],
    transientState: {}
}

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent( new CustomEvent("stateChanged") )
}

export const getFacilities = () => {
    return database.facilities.map(f => ({...f}))
}

export const purchaseMineral = () => {

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state
        document.dispatchEvent( new CustomEvent("stateChanged") )
    }

export const getGovernors = () => {
    return database.governors.map(governor => ({...governor}))
}
