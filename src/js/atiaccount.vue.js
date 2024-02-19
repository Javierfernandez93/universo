/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=2.4.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.3'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')