/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')