/* vue */
import { ExmaaccountViewer } from '../../src/js/exmaaccountViewer.vue.js?v=1.0.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.6'

Vue.createApp({
    components: {
        ExmaaccountViewer, FlyerViewer
    },
}).mount('#app')