/** @odoo-module alias=web_pwa_oca.PWAManager **/

import { _t } from 'web.core';
import config from "web.config"
const { Component } = owl;

function isPWAStandalone() {
    return (
        window.navigator.standalone ||
        document.referrer.includes("android-app://") ||
        window.matchMedia("(display-mode: standalone)").matches
    );
}
if (isPWAStandalone()) {
    config.device.isMobile = true;
}

class PWAManager extends Component {
    start() {
        // super.setup(...arguments);
        this._isServiceWorkerSupported = "serviceWorker" in navigator;
        if (!this._isServiceWorkerSupported) {
            console.error(
                _t(
                    "Service workers are not supported! Maybe you are not using HTTPS or you work in private mode."
                )
            );
        } else {
            this._service_worker = navigator.serviceWorker;
            this.registerServiceWorker("/service-worker.js", {
                updateViaCache: "none",
            });
        }
    }
    registerServiceWorker(sw_script, options) {
        return this._service_worker
            .register(sw_script, options)
            .then(this._onRegisterServiceWorker.bind(this))
            .catch(function (error) {
                console.log(_t("[ServiceWorker] Registration failed: "), error);
            });
    }
    isPWAStandalone() {
        return isPWAStandalone();
    }

    _onRegisterServiceWorker(registration) {
        console.log(_t("[ServiceWorker] Registered:"), registration);
    }
}

export default PWAManager
