/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')