/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')