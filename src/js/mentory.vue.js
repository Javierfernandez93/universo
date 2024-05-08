/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=1.0.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.6'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')