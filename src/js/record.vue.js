/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=1.1.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.6'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')