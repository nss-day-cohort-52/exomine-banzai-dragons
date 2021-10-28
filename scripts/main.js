import { Exomine } from "./Exomine.js";

// Stores the querySelector in a variable that looks for the container id in the html. 
const mainContainer = document.querySelector(".container")

// Function that tells the Exomine function where to keep the HTML interpolation on the browser. 
const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}

renderAllHTML()

// This shows a message on the console to let us know that there has been a change in state. 
document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()
})
