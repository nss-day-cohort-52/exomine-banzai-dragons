import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"
import { purchaseMineral } from "./database.js"

document.addEventListener(
    "click",
    (event) => {
        if(event.target.id === "orderButton"){
            purchaseMineral()
        }
    }
)

export const Exomine = () => {
    return `
        <h1>Exomine</h1>

        <section id = "top-section">
            <div class = "section governor">
            <article>
                <h2>Choose Governor</h2>
                ${Governors()}
            </article>
            <article class = "section facility">
                <h2>Choose Facility</h2>
                ${Facilities()}
            </article>
            </div>
            <div class = "section colony-resources">
                <h2>Available Resources for Colony</h2>
            
            </div>
        </section>
        <section id="bottom-section">
            <div class = "section minerals">
                <h2>Minerals at Facility</h2>

            </div>
            <div class ="section cart">
                <h2>Cart</h2>

                <article class="button">
                    <button id="orderButton"> Purchase Minerals </button>
                </article>
            </div>
        </section>
    `
}