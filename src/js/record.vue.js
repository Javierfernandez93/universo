/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=2.3.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.4'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')