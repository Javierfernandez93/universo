import { HomeViewer } from '../../src/js/homeViewer.vue.js?v=2.3.7'
import { BlogwidgetViewer } from '../../src/js/blogwidgetViewer.vue.js?v=2.3.7'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.3.7'

Vue.createApp({
    components : { 
        HomeViewer, BlogwidgetViewer, FooterViewer
    },
}).mount('#app')