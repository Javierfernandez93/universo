import { ViewclientfromsellerViewer } from '../../src/js/viewclientfromsellerViewer.vue.js?v=2.3.7'
import { ViewuserwidgetfromsellerViewer } from '../../src/js/viewuserwidgetfromsellerViewer.vue.js?v=2.3.7'
import { ViewtasklistwidgetViewer } from '../../src/js/viewtasklistwidgetViewer.vue.js?v=2.3.7'
import { PropertypullViewer } from '../../src/js/propertypullViewer.vue.js?v=2.3.7'

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