/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.4.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.9'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')