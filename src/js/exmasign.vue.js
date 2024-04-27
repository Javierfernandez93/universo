/* vue */
import { ExmasignViewer } from '../../src/js/exmasignViewer.vue.js?v=1.0.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: {
        ExmasignViewer, FlyerViewer
    },
}).mount('#app')