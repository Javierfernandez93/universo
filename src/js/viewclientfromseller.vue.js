import { ViewclientfromsellerViewer } from '../../src/js/viewclientfromsellerViewer.vue.js?v=2.4.0'
import { ViewuserwidgetfromsellerViewer } from '../../src/js/viewuserwidgetfromsellerViewer.vue.js?v=2.4.0'
import { ViewtasklistwidgetViewer } from '../../src/js/viewtasklistwidgetViewer.vue.js?v=2.4.0'
import { PropertypullViewer } from '../../src/js/propertypullViewer.vue.js?v=2.4.0'

Vue.createApp({
    components : { 
        ViewclientfromsellerViewer, ViewuserwidgetfromsellerViewer, ViewtasklistwidgetViewer, PropertypullViewer
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