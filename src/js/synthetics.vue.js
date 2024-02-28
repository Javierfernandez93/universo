/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.4.6.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.4'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')