/* vue */
import { ExmaaccountViewer } from '../../src/js/exmaaccountViewer.vue.js?v=1.1.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.0'

Vue.createApp({
    components: {
        ExmaaccountViewer, FlyerViewer
    },
}).mount('#app')