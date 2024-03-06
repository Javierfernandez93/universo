import { ApiwalletsViewer } from './apiwalletsViewer.vue.js?v=2.5.0'
import { AuthViewer } from './authViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        ApiwalletsViewer, AuthViewer
    },
    methods: {
        authSuccess(data) 
        {
            this.$refs.wallets.authSuccess(data)
        },
        requestAuth(request) 
        {
            this.$refs.auth.requestAuth(request)
        },
    },
    mounted() 
    {       
    },
}).mount('#app')