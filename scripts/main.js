import { Exomine } from "./Exomine.js";

// Stores the querySelector in a variable that looks for the container id in the html. 
const mainContainer = document.querySelector(".container")

// Function that tells the Exomine function where to keep the HTML interpolation on the browser. 
const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}

renderAllHTML()

// This eventlistener is for when the purchase button is clicked
document.addEventListener("permanentStateChanged", event => {
    console.log("Permanent state has changed. Regenerating HTML...")
    renderAllHTML()
})
// This eventListener is for whenever the setFunctions are called (This is when we recieve user input via dropdowns and radio buttons) 
document.addEventListener("transientStateChanged", event => {
    console.log("Transient state has changed. Regenerating HTML...")
    // WE NEED TO FIND A WAY TO ONLY RE-RENDER SPECIFIC HTML ELEMENTS WHEN THIS CustomEvent HAPPENS
    renderAllHTML()
})
