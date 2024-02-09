import { User } from '../../src/js/user.module.js?v=2.3.8'   

const PaybusinesswidgetViewer = {
    name : 'paybusinesswidget-viewer',
    data() {
        return {
            User: new User,
            membership : null
        }
    },
    methods: {
        getPercentajes(membership) {
            membership.percentaje = 0

            if(membership.amount > 0) 
            {
                membership.percentaje = Math.round((membership.amount * 100) / membership.target)
            }

            return membership
        },
        getCurrentMembership() {
            this.User.getCurrentMembership({},(response)=>{
                if(response.s == 1)
                {
                    this.membership = this.getPercentajes(response.membership)
                } else {
                    this.membership = false
                }
            })
        },
    },
    mounted() 
    {   
        this.getCurrentMembership()
    },
    template : `
        <div v-if="membership" class="card shadow-none border">
            <div class="card-body text-center">
                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <h1 class="text-dark">Pay Business</h1>
                        <h3 class="text-secondary fw-semilight">{{membership.title}}</h3>
                    </div>
                </div>
                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" :style="{width: membership.percentaje+'%'}">{{membership.percentaje}}%</div>
                </div>
            </div>
        </div>
        <div v-else-if="membership == false" class="card shadow-none overflow-hidden border">
            <div class="mask bg-dark d-flex justify-content-center align-items-center text-center text-white z-index-1">
                <div class="row">
                    <div class="col-12">
                        <div><i class="bi h1 text-white bi-lock-fill"></i></div>
                        Activate para comenzar
                    </div>
                </div>
            </div>
            <div class="card-body text-center position-relative z-index-0">
                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <h1 class="text-dark">Pay Business</h1>
                        <h3 class="text-secondary fw-semilight">Membresía 20 USDT</h3>
                    </div>
                </div>
                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" style="width: 1%">1%</div>
                </div>
            </div>
        </div>
    `,
}

export { PaybusinesswidgetViewer } 