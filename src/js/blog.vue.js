import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=1.1.7'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')