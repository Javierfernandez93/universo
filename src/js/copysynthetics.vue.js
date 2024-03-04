/* vue */
import { CopysyntheticsViewer } from '../../src/js/copysyntheticsViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components: {
        CopysyntheticsViewer, FlyerViewer
    },
}).mount('#app')