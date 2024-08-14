/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=1.1.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.5'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')