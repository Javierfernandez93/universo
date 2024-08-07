import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.1.3'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.1.3'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
