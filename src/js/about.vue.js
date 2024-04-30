import { AboutViewer } from '../../src/js/aboutViewer.vue.js?v=1.0.5'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.5'

Vue.createApp({
    components : { 
        AboutViewer, FooterViewer
    },
}).mount('#app')