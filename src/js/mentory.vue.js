/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=1.1.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')