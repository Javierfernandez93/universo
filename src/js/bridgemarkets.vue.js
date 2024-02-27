/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=2.4.6.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.3'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')