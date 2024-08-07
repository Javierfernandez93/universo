/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')