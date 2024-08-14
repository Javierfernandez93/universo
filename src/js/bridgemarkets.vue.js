/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=1.1.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.6'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')