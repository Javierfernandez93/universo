/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')