import { getColonies, getTransientState } from "./database.js"

const colonies = getColonies()

export const Colony = () => {
    const transientState = getTransientState()
    const foundColony = colonies.find(
        (colony) => {
            return colony.id === transientState.colonyId
        }
    )
    if (foundColony) {
        return `Available Resources for ${foundColony.colony}`
    } else {
        return "Available Resources..."
    }

}