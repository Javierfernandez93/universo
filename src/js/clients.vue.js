import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.3.9'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.3.9'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')