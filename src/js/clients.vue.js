import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.5.0'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')