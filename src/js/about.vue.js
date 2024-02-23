import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=2.4.6.2'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.4.6.2'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')