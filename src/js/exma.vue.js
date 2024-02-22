/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=2.4.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')