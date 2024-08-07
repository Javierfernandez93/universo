/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')