import { CommunityViewer } from '../../src/js/communityViewer.vue.js?v=2.4.4'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.4'

Vue.createApp({
    components: {
        CommunityViewer, FlyerViewer
    },
}).mount('#app')