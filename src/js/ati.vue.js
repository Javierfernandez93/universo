/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=2.3.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.4'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')