import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=1.1.7'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')