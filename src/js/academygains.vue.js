/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')