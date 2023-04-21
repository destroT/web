/** @odoo-module alias=web_pwa_oca.pwa_launch **/
import { registry } from "@web/core/registry";
import core from "web.core";
import PWAManager from "web_pwa_oca.PWAManager";

export const webClientReadyService = {
    start() {
        core.bus.on("web_client_ready", this, function () {
            console.log(PWAManager)
            const pwa_manager = new PWAManager(this);
            console.log(pwa_manager)
            const def = pwa_manager.start();
            return Promise.all([def]);
        });
    }
}

// env.bus.on("web_client_ready", null, function () {
//     this.pwa_manager = new PWAManager(this);
//     const def = this.pwa_manager.start();
//     return Promise.all([def]);
// });

registry.category("services").add("webClientReady", webClientReadyService);
