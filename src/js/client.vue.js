import { ClientViewer } from '../../src/js/clientViewer.vue.js?v=1.0.9'
import { UserwidgetViewer } from '../../src/js/userwidgetViewer.vue.js?v=1.0.9'
import { TasklistwidgetViewer } from '../../src/js/tasklistwidgetViewer.vue.js?v=1.0.9'

Vue.createApp({
    components : { 
        UserwidgetViewer, ClientViewer, TasklistwidgetViewer
    },
    methods: {
        refresh()
        {
            this.$refs.client.refresh()
        }
    },
}).mount('#app')