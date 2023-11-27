import { UserSupport } from './userSupport.module.js?t6'   


Vue.createApp({
    data() {
        return {
            UserSupport: new UserSupport,
            crons: null,
        }
    },
    methods: {
        getCrons: function () {
            return new Promise((resolve) => {
                this.UserSupport.getCrons({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.crons)
                    }
                })
            })
        },
        saveCron: function (cron) {
            this.UserSupport.saveCron(cron, (response) => {
                if (response.s == 1) {
                    
                }
            })
        },
    },
    mounted() {
        this.getCrons().then((crons) => {
            this.crons = crons
        })
    },
}).mount('#app')