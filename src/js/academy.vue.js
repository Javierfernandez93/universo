/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=1.0.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.4'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')