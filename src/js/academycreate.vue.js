/* vue */
import { AcademycreateViewer } from '../../src/js/academycreateViewer.vue.js?v=1.0.1'
import { MarketingfeedbackViewer } from '../../src/js/marketingfeedbackViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        AcademycreateViewer, FlyerViewer, MarketingfeedbackViewer
    },
}).mount('#app')