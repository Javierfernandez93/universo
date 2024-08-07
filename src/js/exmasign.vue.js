/* vue */
import { ExmasignViewer } from '../../src/js/exmasignViewer.vue.js?v=1.1.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: {
        ExmasignViewer, FlyerViewer
    },
}).mount('#app')