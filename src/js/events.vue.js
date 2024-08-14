/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=1.1.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.5'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')