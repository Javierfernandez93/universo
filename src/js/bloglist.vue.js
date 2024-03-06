import { BloglistViewer } from '../../src/js/bloglistViewer.vue.js?v=2.5.0'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        BloglistViewer, FooterViewer
    },
}).mount('#app')