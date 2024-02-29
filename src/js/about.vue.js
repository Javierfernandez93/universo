import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=2.4.6.5'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.4.6.5'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')