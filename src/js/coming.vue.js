/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=2.3.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.7'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')