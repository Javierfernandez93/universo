import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=2.5.0'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')