/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')