/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.4.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')