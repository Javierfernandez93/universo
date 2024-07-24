import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.0.5'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.0.5'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
