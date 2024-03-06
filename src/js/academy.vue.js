/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=2.4.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.8'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')