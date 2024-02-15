/* vue */
import { ExmaaccountViewer } from '../../src/js/exmaaccountViewer.vue.js?v=2.4.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.1'

Vue.createApp({
    components: {
        ExmaaccountViewer, FlyerViewer
    },
}).mount('#app')