/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')