/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=1.1.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')