/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')