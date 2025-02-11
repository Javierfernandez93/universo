import { ClientViewer } from '../../src/js/clientViewer.vue.js?v=1.1.8'
import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.1.8'
import { TasklistwidgetViewer } from '../../src/js/tasklistwidgetViewer.vue.js?v=1.1.8'
import { PropertyAdminPullViewer } from '../../src/js/propertyAdminPullViewer.vue.js?v=1.1.8'

Vue.createApp({
    components : { 
        UserwidgetViewer, ClientViewer, TasklistwidgetViewer, PropertyAdminPullViewer
    },
    methods: {
        refresh()
        {
            this.$refs.client.refresh()
        },
        pull(property,user_login_id)
        {
            console.log(property)
            console.log(user_login_id)
            this.$refs.property.show(property,user_login_id)
        },
    },
}).mount('#app')