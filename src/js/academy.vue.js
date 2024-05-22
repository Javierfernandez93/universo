/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')