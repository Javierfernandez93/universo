import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.6'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.0.6'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')