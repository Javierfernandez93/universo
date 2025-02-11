import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=1.1.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.1.8'

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer
    },
}).mount('#app')