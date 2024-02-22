/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=2.4.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.5'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')