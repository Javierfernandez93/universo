import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=2.4.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')