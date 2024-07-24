/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=1.0.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.5'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')