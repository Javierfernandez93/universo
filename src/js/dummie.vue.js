/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=1.1.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.0'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')