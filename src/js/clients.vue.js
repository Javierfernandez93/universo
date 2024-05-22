import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.9'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.0.9'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')