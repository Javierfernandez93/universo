/* vue */
import { AcademyinfoViewer } from '../../src/js/academyinfoViewer.vue.js?v=2.3.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.9'

Vue.createApp({
    components: {
        AcademyinfoViewer, FlyerViewer
    },
}).mount('#app')