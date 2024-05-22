import { SellerleadsViewer } from '../../src/js/sellerleadsViewer.vue.js?v=1.0.9'
import { SellerleadsaddViewer } from '../../src/js/sellerleadsaddViewer.vue.js?v=1.0.9'
import { SellerleadseditViewer } from '../../src/js/sellerleadseditViewer.vue.js?v=1.0.9'

Vue.createApp({
    components : { 
        SellerleadsViewer, SellerleadsaddViewer, SellerleadseditViewer
    },
    methods: {
        add()
        {
            this.$refs.add.add()
        },
        edit(company_id)
        {
            this.$refs.edit.edit(company_id)
        },
        update()
        {
            this.$refs.list.getSellerClients()
        }
    },
}).mount('#app')