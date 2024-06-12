import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=1.1.0'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.0'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')