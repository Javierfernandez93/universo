/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')