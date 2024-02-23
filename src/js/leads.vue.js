import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.4.6.2'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.4.6.2'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')