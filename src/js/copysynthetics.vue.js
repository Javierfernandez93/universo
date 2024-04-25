/* vue */
import { CopysyntheticsViewer } from '../../src/js/copysyntheticsViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        CopysyntheticsViewer, FlyerViewer
    },
}).mount('#app')