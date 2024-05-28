import { SellerclientsViewer } from '../../src/js/sellerclientsViewer.vue.js?v=1.0.9'
import { SellerclientsaddViewer } from '../../src/js/sellerclientsaddViewer.vue.js?v=1.0.9'

Vue.createApp({
    components : { 
        SellerclientsViewer, SellerclientsaddViewer
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