/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')