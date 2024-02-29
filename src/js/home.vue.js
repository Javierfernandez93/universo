import { HomeViewer } from '../../src/js/homeViewer.vue.js?v=2.4.6.6'
import { BlogwidgetViewer } from '../../src/js/blogwidgetViewer.vue.js?v=2.4.6.6'
import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=2.4.6.6'
import { PromoViewer } from '../../src/js/promoViewer.vue.js?v=2.4.6.6'

Vue.createApp({
    components : { 
        HomeViewer, BlogwidgetViewer, FooterViewer, PromoViewer
    },
}).mount('#app')