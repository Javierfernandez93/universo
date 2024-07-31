import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.0.9'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.0.9'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
