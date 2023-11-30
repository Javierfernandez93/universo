/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')