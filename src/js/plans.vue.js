import { User } from '../../src/js/user.module.js?v=1.0.8'   

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            User : null,
            plans : {},
        }
    },
    watch : {
    },
    methods: {
        getPlans : function() {
            this.User.getPlans({},(response)=>{
                if(response.s == 1)
                {
                    this.plans = response.plans
                }
            })
        },
    },
    mounted() 
    {
        this.User = new User
        
        this.getPlans()
    },
}).mount('#app')