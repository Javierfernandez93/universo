/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=1.1.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')