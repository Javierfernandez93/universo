/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')