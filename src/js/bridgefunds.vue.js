/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.4.6.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.3'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')