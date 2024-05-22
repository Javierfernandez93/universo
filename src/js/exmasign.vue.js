/* vue */
import { ExmasignViewer } from '../../src/js/exmasignViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        ExmasignViewer, FlyerViewer
    },
}).mount('#app')