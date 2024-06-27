/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=1.1.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.2'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')