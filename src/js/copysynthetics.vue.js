/* vue */
import { CopysyntheticsViewer } from '../../src/js/copysyntheticsViewer.vue.js?v=2.3.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.9'

Vue.createApp({
    components: {
        CopysyntheticsViewer, FlyerViewer
    },
}).mount('#app')