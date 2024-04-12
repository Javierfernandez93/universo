import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.0'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.0.0'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')