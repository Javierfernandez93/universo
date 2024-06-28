/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')