import { ClientViewer } from '../../src/js/clientViewer.vue.js?v=2.5.0'
import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=2.5.0'
import { TasklistwidgetViewer } from '../../src/js/tasklistwidgetViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        UserwidgetViewer, ClientViewer, TasklistwidgetViewer
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