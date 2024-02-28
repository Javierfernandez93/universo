/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=2.4.6.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.4'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')