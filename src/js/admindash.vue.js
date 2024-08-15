import { AdmindashViewer } from '../../src/js/admindashViewer.vue.js?v=1.1.7'
import { LeadershipStatsViewer } from '../../src/js/leadershipStatsViewer.vue.js?v=1.1.7'

Vue.createApp({
    components: { 
        AdmindashViewer, LeadershipStatsViewer
    },
}).mount("#app");
