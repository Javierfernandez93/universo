/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')