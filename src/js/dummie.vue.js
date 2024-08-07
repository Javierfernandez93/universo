/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')