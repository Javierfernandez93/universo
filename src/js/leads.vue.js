import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.1.1'
import { ClientlistViewer } from '../../src/js/clientlistViewer.vue.js?v=1.1.1'

Vue.createApp({
    components : { 
        ClientlistViewer, UserwidgetViewer
    },
}).mount('#app')