import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.0.8'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.0.8'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
