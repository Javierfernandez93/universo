import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.1.3'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.1.3'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')