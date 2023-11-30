/* vue */
import { ExmasignViewer } from '../../src/js/exmasignViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components: {
        ExmasignViewer, FlyerViewer
    },
}).mount('#app')