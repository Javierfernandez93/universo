import { HomeViewer } from '../../src/js/homeViewer.vue.js?v=1.1.4'
import { BlogwidgetViewer } from '../../src/js/blogwidgetViewer.vue.js?v=1.1.4'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.1.4'

Vue.createApp({
    components : { 
        HomeViewer, BlogwidgetViewer, FooterViewer
    },
}).mount('#app')