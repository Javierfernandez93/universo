import { SellerclientsViewer } from '../../src/js/sellerclientsViewer.vue.js?v=1.0.8'
import { SellerclientsaddViewer } from '../../src/js/sellerclientsaddViewer.vue.js?v=1.0.8'
import { SellerclientseditViewer } from '../../src/js/SellerclientseditViewer.vue.js?v=1.0.8'

Vue.createApp({
    components : { 
        SellerclientsViewer, SellerclientsaddViewer, SellerclientseditViewer
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