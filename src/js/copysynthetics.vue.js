/* vue */
import { CopysyntheticsViewer } from '../../src/js/copysyntheticsViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        CopysyntheticsViewer, FlyerViewer
    },
}).mount('#app')