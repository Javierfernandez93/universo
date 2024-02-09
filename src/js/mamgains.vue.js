/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.3.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.8'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')