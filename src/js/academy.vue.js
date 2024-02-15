/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=2.4.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.1'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')