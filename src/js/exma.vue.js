/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=1.1.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.2'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')