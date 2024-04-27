/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=1.0.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')