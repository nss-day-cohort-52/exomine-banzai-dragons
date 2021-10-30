import { Exomine } from "./Exomine.js";

// Stores the html element from the DOM with the class of ".container" in a variable called mainContainer 
const mainContainer = document.querySelector(".container")

// The responsibility of this function is to render all the html within the specified location of the DOM (uses .innerHTML)
const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}
// Fuction call that renders all the HTML on page load
renderAllHTML()

// This eventListener is for whenever the setFunctions are called (This is when we recieve user input via dropdowns and radio buttons) 
document.addEventListener("transientStateChanged", event => {
    console.log("Transient state has changed. User has selected input. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener is for when a user adds 1 ton to an existing colonyMineral object (meaning: the mineral DOES already exist for specified colony)
document.addEventListener("tonIncrease", event => {
    console.log("Added 1 ton to colony's existing mineral inventory. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener is for when a user adds a new object ot the colonyMinerals array (meaning: the mineral DOES NOT already exist for specified colony)
document.addEventListener("newMineralAdded", event => {
    console.log("A new mineral was detected for this colony. Adding 1 ton. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener runs anytime the purchase Mineral button is clicked
document.addEventListener("permanentStateChanged", event => {
    console.log("Permanent state has changed. Regenerating HTML...")
    renderAllHTML()
})

