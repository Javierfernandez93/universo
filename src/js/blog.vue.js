import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=1.1.6'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.6'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')