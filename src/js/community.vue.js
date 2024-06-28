import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=1.0.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.1'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')