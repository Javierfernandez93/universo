/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=2.3.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')