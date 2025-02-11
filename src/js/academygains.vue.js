/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=1.1.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')