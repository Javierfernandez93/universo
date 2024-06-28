/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')