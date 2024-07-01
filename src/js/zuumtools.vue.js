import { User } from '../../src/js/user.module.js?v=1.0.4'   

/* vue */ 
import { ZuumtoolsViewer } from '../../src/js/zuumtoolsViewer.vue.js?v=1.0.4'

Vue.createApp({
    components : { 
        ZuumtoolsViewer
    },
    data() {
        return {
            User : new User,
            profits : {}
        }
    },
    watch : {
        user : {
            handler() {
                
            },
            deep: true
        },
    },
    methods: {
    },
    mounted() 
    {
        // this.getProfits()
    },
}).mount('#app')