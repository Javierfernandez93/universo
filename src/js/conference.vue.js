/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')