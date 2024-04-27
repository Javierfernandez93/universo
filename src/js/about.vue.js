import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=1.0.2'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')