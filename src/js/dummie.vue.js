/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=2.3.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.9'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')