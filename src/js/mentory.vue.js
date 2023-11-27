/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=2.3.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')