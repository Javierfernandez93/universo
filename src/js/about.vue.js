import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=1.0.9'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.9'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')