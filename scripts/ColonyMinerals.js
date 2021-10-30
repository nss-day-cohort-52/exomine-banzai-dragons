import { getGovernors, getMinerals, getColonyMinerals, getTransientState } from "./database.js"

// This function takes an object as a parameter, and it's responsibility is to generate strings of html for each object (displays the inventory of minerals for a selected colony)
const buildColonyMineralsList = (colonyMineralObj) => {
    const minerals = getMinerals()
    const governors = getGovernors()
    // Here we are using the .find array method to iterate through the governors array and return the governor object that has the colonyId property equal to the value of the colonyId property on a unique colonyMineral object 
    // Store the value of the .find method in a variable (an object)
    const foundGovernor = governors.find((governor) => {
        return governor.colonyId === colonyMineralObj.colonyId
    })
    // Here we are using the .find array method to iterate through the minerals array and return the mineral object that has the id property equal to the value of the mineralId property on a unique colonyMineral object 
    // Store the value of the .find method in a variable (an object)
    const foundMineral = minerals.find(
        (mineral) => {
            return mineral.id === colonyMineralObj.mineralId
        }
    )
    // IF the colonyId property in the transientState object is equal to the colonyId of the governor selected, generate all of the minerals as html for that specified governor's colony. (when a governor is selected, display all the minerals for their colony and their amounts)
    if (foundGovernor.colonyId === colonyMineralObj.colonyId) {
        return `<div> ${colonyMineralObj.ton} tons of ${foundMineral.mineral}</div>`
    }

}
// This function will be responsible for generating each mineral for the specified colony as html (related to the governor selected, returns a string of html)
export const ColonyMinerals = () => {
    const transientState = getTransientState()
    const colonyMinerals = getColonyMinerals()

    let html = ""
    // IF a governor has been selected from the dropdown...
    if (transientState.colonyId) {
        // THEN we can use the .filter array method to iterate through the colonyMinerals array and return all of the colonyMineral objects that have the same colonyId property as what's in the transientState
        // Store the value of the .find method in a variable (an array of colonyMineral objects for the specified colony)
        const filiteredColonyMineralArr = colonyMinerals.filter(colonyMineralObj => {
            return colonyMineralObj.colonyId === transientState.colonyId
        })

        html = "<ul>"
        /* STEPS FOR USING THE .map() ARRAY METHOD
        1. Add the .map() array method on the array you want to iterate through
        2. .map() creates a new array populated with the results of calling a provided function on every object in the calling array.
        3. Store this value in a new variable (listItems)
        */
        const listItems = filiteredColonyMineralArr.map(buildColonyMineralsList)
        //The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
        html += listItems.join("")
        // CLose up our unordered list with a closing tag (string of html)
        html += "</ul>"
    }
    // ELSE meaning no governor was selected...generate placeholder string
    else {
        html += "Please select a governor to see available resources for a colony..."
    }
    // Finally, return the string of html that meets the first test it passes in the if else statements
    return html
}