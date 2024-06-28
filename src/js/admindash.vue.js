import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.0.2'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
