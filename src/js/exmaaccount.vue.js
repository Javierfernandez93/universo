/* vue */
import { ExmaaccountViewer } from '../../src/js/exmaaccountViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        ExmaaccountViewer, FlyerViewer
    },
}).mount('#app')