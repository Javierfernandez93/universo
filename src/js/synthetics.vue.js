/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')