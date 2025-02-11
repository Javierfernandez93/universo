/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=1.1.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')