import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=2.4.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.7'

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer
    },
}).mount('#app')