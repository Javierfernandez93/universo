import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=1.0.1'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')