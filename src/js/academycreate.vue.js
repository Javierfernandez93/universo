/* vue */
import { AcademycreateViewer } from '../../src/js/academycreateViewer.vue.js?v=2.4.5'
import { MarketingfeedbackViewer } from '../../src/js/marketingfeedbackViewer.vue.js?v=2.4.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.5'

Vue.createApp({
    components: {
        AcademycreateViewer, FlyerViewer, MarketingfeedbackViewer
    },
}).mount('#app')