/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')