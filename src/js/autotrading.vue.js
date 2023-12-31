/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=2.3.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.7'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')