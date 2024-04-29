/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')