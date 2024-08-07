/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')