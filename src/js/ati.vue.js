/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=1.0.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.6'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')