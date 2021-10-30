import { getColonies, getTransientState } from "./database.js"

const colonies = getColonies()

// The responsibility of this funtion is to generate dynamic html content in the h2 element of the Colony Minerals section. This is dependent upon which governor is chosen in the drop down
export const Colony = () => {
    const transientState = getTransientState()
    const foundColony = colonies.find(
        (colony) => {
            return colony.id === transientState.colonyId
        }
    )
    if (foundColony) {
        return `Available Resources for ${foundColony.colony}`
    } 
    else {
        return "Available Resources..."
    }

}