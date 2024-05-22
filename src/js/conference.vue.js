/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=1.0.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')