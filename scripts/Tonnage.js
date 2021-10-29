// import { getColonyMinerals, getTransientState } from "./database.js"

import { getColonyMinerals } from "./database.js"

/*
1. We need a function that will iterate through the colonyMinerals array
2. We need this function to be able to check IF the colonyMineralObj.mineralId === transientState.mineralId
3. We will also need to check IF the colonyMineralObject.colonyId === transientState.colonyId
3. IF BOTH of these conditions are met, we want to return the colonyMineralObj
*/

// const colonyMinerals = getColonyMinerals()

// export const foundColonyObj = colonyMinerals.find(
//     (colonyMineralObj) => {
//         const transientState = getTransientState()
//         return colonyMineralObj.mineralId === transientState.mineralId && colonyMineralObj.colonyId === transientState.colonyId
//     })





