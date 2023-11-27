import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=2.3.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')