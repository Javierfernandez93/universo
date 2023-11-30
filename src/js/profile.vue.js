import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=2.3.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.6'

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer
    },
}).mount('#app')