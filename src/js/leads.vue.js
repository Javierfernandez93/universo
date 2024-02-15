import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.4.1'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.4.1'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')