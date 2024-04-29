import { TicketViewer } from '../../src/js/ticketViewer.vue.js?v=1.0.3'
import { AddticketViewer } from '../../src/js/addticketViewer.vue.js?v=1.0.3'
import { FaqViewer } from '../../src/js/faqViewer.vue.js?v=1.0.3'

Vue.createApp({
    components: {
        TicketViewer, FaqViewer, AddticketViewer
    },
    data() {
        return {
            addTicket: false,
            viewFullFaq: false,
        }
    },
    methods: {
        toogleViewFullFaq(state)
        {
            state = state ? state : !this.viewFullFaq

            this.viewFullFaq = state
        },
        toggleMakeTicket()
        {
            this.addTicket = !this.addTicket
        }
    }
}).mount('#app')