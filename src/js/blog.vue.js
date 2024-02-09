import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=2.3.8'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.3.8'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')