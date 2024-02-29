/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=2.4.6.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.6'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')