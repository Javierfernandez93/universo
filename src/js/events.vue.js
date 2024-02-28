/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.4.6.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.4'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')