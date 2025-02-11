/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=1.1.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')