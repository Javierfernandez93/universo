/* vue */
import { CopysyntheticsViewer } from '../../src/js/copysyntheticsViewer.vue.js?v=1.0.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.0'

Vue.createApp({
    components: {
        CopysyntheticsViewer, FlyerViewer
    },
}).mount('#app')