/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.4.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.9'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')