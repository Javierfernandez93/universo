import { ViewclientViewer } from '../../src/js/viewclientViewer.vue.js?v=2.5.0'
import { ViewuserwidgetViewer } from '../../src/js/viewuserwidgetViewer.vue.js?v=2.5.0'
import { ViewtasklistwidgetViewer } from '../../src/js/viewtasklistwidgetViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        ViewclientViewer, ViewuserwidgetViewer, ViewtasklistwidgetViewer
    },
    methods: {
        show(user_login_id)
        {
            this.$refs.task.show(user_login_id)
        },
        refresh()
        {
            this.$refs.client.refresh()
        }
    },
}).mount('#app')