/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')