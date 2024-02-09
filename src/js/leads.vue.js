import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.3.8'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.3.8'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')