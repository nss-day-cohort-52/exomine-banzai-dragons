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
// This eventListener is for when a user adds 1 ton to an existing colonyMineral object
document.addEventListener("permanentStateChanged", event => {
    console.log("Permanent state has changed. Added 1 ton of the mineral selected to the colony's inventory . Regenerating HTML...")
    renderAllHTML()
})

