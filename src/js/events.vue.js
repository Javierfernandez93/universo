/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=1.0.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.0'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')