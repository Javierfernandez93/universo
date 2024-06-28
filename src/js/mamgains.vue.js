/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')