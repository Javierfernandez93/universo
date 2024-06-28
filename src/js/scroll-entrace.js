import { HomeViewer } from '../../src/js/homeViewer.vue.js?v=1.0.2'
import { BlogwidgetViewer } from '../../src/js/blogwidgetViewer.vue.js?v=1.0.2'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components : { 
        HomeViewer, BlogwidgetViewer, FooterViewer
    },
}).mount('#app')