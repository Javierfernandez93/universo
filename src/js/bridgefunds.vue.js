/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.3.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.7'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')