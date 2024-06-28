/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=1.0.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')