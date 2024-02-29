/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=2.4.6.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.6'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')