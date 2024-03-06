/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')