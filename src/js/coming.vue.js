/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=1.0.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.0'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')