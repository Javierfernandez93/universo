import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=2.5.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.0'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')