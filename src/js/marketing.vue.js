/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=2.3.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.9'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')