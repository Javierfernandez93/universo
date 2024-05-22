/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')