import { ViewclientfromsellerViewer } from '../../src/js/viewclientfromsellerViewer.vue.js?v=1.0.5'
import { PropertieslistViewer } from '../../src/js/propertieslistViewer.vue.js?v=1.0.5'
import { ViewuserwidgetfromsellerViewer } from '../../src/js/viewuserwidgetfromsellerViewer.vue.js?v=1.0.5'
import { ViewtasklistwidgetViewer } from '../../src/js/viewtasklistwidgetViewer.vue.js?v=1.0.5'
import { FeedbackclientViewer } from '../../src/js/feedbackclientViewer.vue.js?v=1.0.5'
import { PropertypullViewer } from '../../src/js/propertypullViewer.vue.js?v=1.0.5'

Vue.createApp({
    components : { 
        ViewclientfromsellerViewer, 
        ViewuserwidgetfromsellerViewer, 
        ViewtasklistwidgetViewer, 
        PropertieslistViewer,
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