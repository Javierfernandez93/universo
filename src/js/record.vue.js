/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=1.0.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.0'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')