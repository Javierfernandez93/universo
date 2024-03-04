/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')