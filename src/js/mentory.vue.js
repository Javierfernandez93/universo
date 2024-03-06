/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')