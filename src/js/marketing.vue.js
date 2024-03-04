/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')