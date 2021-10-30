import { Exomine } from "./Exomine.js";

// Stores the querySelector in a variable that looks for the container id in the html. 
const mainContainer = document.querySelector(".container")

// Function that tells the Exomine function where to keep the HTML interpolation on the browser. 
const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}

renderAllHTML()

// This eventListener is for whenever the setFunctions are called (This is when we recieve user input via dropdowns and radio buttons) 
document.addEventListener("transientStateChanged", event => {
    console.log("Transient state has changed. User has selected input. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener is for when a user adds 1 ton to an existing colonyMineral object (meaning: mineral already exist for specified colony)
document.addEventListener("tonIncrease", event => {
    console.log("Added 1 ton to colony's existing mineral inventory. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener is for when a user adds a new object ot the colonyMinerals array (meaning: mineral doesnt't already exist for specified colony)
document.addEventListener("newMineralAdded", event => {
    console.log("A new mineral was detected for this colony. Adding 1 ton. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener runs anytime the purchase Mineral button is clicked
document.addEventListener("permanentStateChanged", event => {
    console.log("Permanent state has changed. Regenerating HTML...")
    renderAllHTML()
})

