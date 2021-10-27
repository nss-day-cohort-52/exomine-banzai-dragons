import { colonyMinerals } from "./ColonyMinerals.js"
import { Governors } from "./Governors.js"
import { getTransState } from "./database.js"

export const Exomine = () => {
    return `
        <h1>Exomine</h1>

        <section id = "top-section">
            <div class = "section governor">
            <article>
                <h2>Choose Governor</h2>
                <div>${Governors()}</div>
            </article>
            <article class = "section facility">
                <h2>Choose Facility</h2>
                
            </article>
            </div>
            <div class = "section colony-resources">
                <h2>Available Resources for Colony</h2>
                ${colonyMinerals(getTransState())}
            </div>
        </section>
        <section id="bottom-section">
            <div class = "section minerals">
                <h2>Minerals at Facility</h2>

            </div>
            <div class ="section cart">
                <h2>Cart</h2>
            
            </div>
        </section>
    `
}