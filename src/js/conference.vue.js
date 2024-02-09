/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=2.3.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.8'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')