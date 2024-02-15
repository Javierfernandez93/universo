/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=2.4.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.1'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')