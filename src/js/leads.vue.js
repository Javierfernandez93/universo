import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.2'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.0.2'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')