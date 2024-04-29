import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=1.0.3'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.3'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')