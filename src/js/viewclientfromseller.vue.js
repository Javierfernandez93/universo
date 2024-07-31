import { ViewclientfromsellerViewer } from '../../src/js/viewclientfromsellerViewer.vue.js?v=1.0.8'
import { ViewuserwidgetfromsellerViewer } from '../../src/js/viewuserwidgetfromsellerViewer.vue.js?v=1.0.8'
import { ViewtasklistwidgetViewer } from '../../src/js/viewtasklistwidgetViewer.vue.js?v=1.0.8'
import { FeedbackclientViewer } from '../../src/js/feedbackclientViewer.vue.js?v=1.0.8'
import { PropertypullViewer } from '../../src/js/propertypullViewer.vue.js?v=1.0.8'

Vue.createApp({
    components : { 
        ViewclientfromsellerViewer, 
        ViewuserwidgetfromsellerViewer, 
        ViewtasklistwidgetViewer, 
        FeedbackclientViewer,
        PropertypullViewer
    },
    methods: {
        show(user_login_id)
        {
            this.$refs.task.show(user_login_id)
        },
        pull(property,user_login_id)
        {
            this.$refs.property.pull(property,user_login_id)
        },
        refresh()
        {
            this.$refs.client.refresh()
        }
    },
}).mount('#app')