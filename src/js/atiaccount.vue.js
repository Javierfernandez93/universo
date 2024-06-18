/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=1.1.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.1'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')