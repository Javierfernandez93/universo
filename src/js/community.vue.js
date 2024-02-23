import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=2.4.6.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6.1'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')