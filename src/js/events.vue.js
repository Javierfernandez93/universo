/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.3.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')