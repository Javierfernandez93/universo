/* vue */
import { AcademyinfoViewer } from '../../src/js/academyinfoViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        AcademyinfoViewer, FlyerViewer
    },
}).mount('#app')