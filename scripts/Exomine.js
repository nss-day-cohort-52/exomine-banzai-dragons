import { Facilities } from "./Facilities.js"
import { FacilityMinerals, facMinHeading } from "./FacilityMinerals.js"
import { Governors } from "./Governors.js"
import { purchaseMineral } from "./database.js"
import { colonyMinerals, Colony } from "./ColonyMinerals.js"
import { SpaceCart } from "./cart.js"

// This eventListner listens for when the user clicks the purchase button
document.addEventListener(
    "click",
    (event) => {
        if (event.target.id === "orderButton") {
            purchaseMineral()
        }
    }
)
// The resposibility of this function is to return a the html content for our webpage as a string 
export const Exomine = () => {
    return `
    <i class="far fa-gem"></i>    
    <h1 id="header">Exomine</h1>

        <section id = "top-section">
            <div class="govFacility">
            <article class="section governor">
                <h3>Choose Governor</h3>
                ${Governors()}
            </article>
            <article class="section facility">
                <h3>Choose Facility</h3>
                ${Facilities()}
            </article>
            </div>
            <div class = "section colony-resources">
                <h2>${Colony()}</h2>
                ${colonyMinerals()}
            </div>
        </section>
        <section id="bottom-section">
            <div class = "section minerals">
                <h2>${facMinHeading()}</h2>
                ${FacilityMinerals()}
            </div>
            <div class ="section cart">
                <h2>Cart</h2>
                ${SpaceCart()}
                <article class="button">
                    <button id="orderButton"> Purchase Minerals </button>
                </article>
            </div>
        </section>
    `
}
