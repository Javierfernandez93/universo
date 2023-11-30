/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')