/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')