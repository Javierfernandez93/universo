/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')