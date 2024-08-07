/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=1.1.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')