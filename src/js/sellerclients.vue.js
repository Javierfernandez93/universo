import { SellerclientsViewer } from '../../src/js/sellerclientsViewer.vue.js?v=2.3.7'
import { SellerclientsaddViewer } from '../../src/js/sellerclientsaddViewer.vue.js?v=2.3.7'
import { SellerclientseditViewer } from '../../src/js/SellerclientseditViewer.vue.js?v=2.3.7'

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