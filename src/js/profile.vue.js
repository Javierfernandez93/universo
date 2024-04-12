import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=1.0.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.0'

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer
    },
}).mount('#app')