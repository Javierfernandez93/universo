/* vue */
import { AcademycreateViewer } from '../../src/js/academycreateViewer.vue.js?v=1.1.2'
import { MarketingfeedbackViewer } from '../../src/js/marketingfeedbackViewer.vue.js?v=1.1.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.2'

Vue.createApp({
    components: {
        AcademycreateViewer, FlyerViewer, MarketingfeedbackViewer
    },
}).mount('#app')