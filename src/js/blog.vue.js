import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=2.4.1'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.4.1'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')