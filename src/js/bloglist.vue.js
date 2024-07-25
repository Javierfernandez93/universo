import { BloglistViewer } from '../../src/js/bloglistViewer.vue.js?v=1.0.6'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.6'

Vue.createApp({
    components : { 
        BloglistViewer, FooterViewer
    },
}).mount('#app')