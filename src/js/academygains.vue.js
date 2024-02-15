/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=2.4.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.1'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')