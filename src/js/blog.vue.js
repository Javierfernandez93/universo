import { BlogViewer } from '../../src/js/blogViewer.vue.js?v=2.4.6.6'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.4.6.6'

Vue.createApp({
    components : { 
        BlogViewer, FooterViewer
    },
}).mount('#app')