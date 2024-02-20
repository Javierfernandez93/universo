import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.4.4'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=2.4.4'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')