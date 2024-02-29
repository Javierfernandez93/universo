/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.4.6.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.6'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')