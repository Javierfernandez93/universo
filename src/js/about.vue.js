import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=2.5.0'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')