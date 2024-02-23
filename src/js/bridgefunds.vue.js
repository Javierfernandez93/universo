/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.4.6.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.2'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')