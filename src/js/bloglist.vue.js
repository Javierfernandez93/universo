import { BloglistViewer } from '../../src/js/bloglistViewer.vue.js?v=1.1.7'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.7'

Vue.createApp({
    components : { 
        BloglistViewer, FooterViewer
    },
}).mount('#app')