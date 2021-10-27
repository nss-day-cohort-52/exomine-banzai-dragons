import { Exomine } from "./Exomine.js";

const mainContainer = document.querySelector(".container")

const renderAllHTML = () => {
    mainContainer.innerHTML = Exomine()
}

renderAllHTML()


document.addEventListener("permanentStateChanged", event => {
    console.log("Permanent state has changed. Regenerating HTML...")
    renderAllHTML()
})

document.addEventListener("transientStateChanged", event => {
    console.log("Transient state has changed. Regenerating HTML...")
    // NEED TO FIND A WAY TO ONLY RE-RENDER SPECIFIC HTML ELEMENTS WHEN THIS CustomEvent HAPPENS
    renderAllHTML()
})
