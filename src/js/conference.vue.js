/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=2.3.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')