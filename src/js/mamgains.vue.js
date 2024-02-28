/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.4.6.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.4'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')