/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')