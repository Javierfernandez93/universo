/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.3.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.7'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')