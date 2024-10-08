/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=1.1.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')