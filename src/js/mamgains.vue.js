/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')