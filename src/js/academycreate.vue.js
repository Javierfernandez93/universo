/* vue */
import { AcademycreateViewer } from '../../src/js/academycreateViewer.vue.js?v=2.3.8'
import { MarketingfeedbackViewer } from '../../src/js/marketingfeedbackViewer.vue.js?v=2.3.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.8'

Vue.createApp({
    components: {
        AcademycreateViewer, FlyerViewer, MarketingfeedbackViewer
    },
}).mount('#app')