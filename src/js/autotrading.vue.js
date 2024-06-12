/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=1.1.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.0'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')