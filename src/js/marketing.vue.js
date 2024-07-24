/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=1.0.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.5'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')