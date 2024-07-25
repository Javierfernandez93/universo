/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=1.0.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.8'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')