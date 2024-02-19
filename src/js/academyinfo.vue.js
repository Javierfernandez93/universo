/* vue */
import { AcademyinfoViewer } from '../../src/js/academyinfoViewer.vue.js?v=2.4.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.3'

Vue.createApp({
    components: {
        AcademyinfoViewer, FlyerViewer
    },
}).mount('#app')