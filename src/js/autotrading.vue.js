/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=1.1.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.2'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')