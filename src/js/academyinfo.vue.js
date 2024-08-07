/* vue */
import { AcademyinfoViewer } from '../../src/js/academyinfoViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        AcademyinfoViewer, FlyerViewer
    },
}).mount('#app')