import { SellerleadsViewer } from '../../src/js/sellerleadsViewer.vue.js?v=1.0.6'
import { SellerleadsaddViewer } from '../../src/js/sellerleadsaddViewer.vue.js?v=1.0.6'

Vue.createApp({
    components : { 
        SellerleadsViewer, SellerleadsaddViewer
    },
    methods: {
        add()
        {
            this.$refs.add.add()
        },
        edit(company_id)
        {
            this.$refs.add.add(company_id)
        },
        update()
        {
            this.$refs.list.getSellerClients()
        }
    },
}).mount('#app')