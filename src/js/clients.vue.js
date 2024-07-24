import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.5'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.0.5'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')