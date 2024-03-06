import { User } from '../../src/js/user.module.js?v=2.4.8'   

const MembershipwidgetViewer = {
    name : 'membershipwidget-viewer',
    data() {
        return {
            User : new User,
            productPermissions : null,
        }
    },
    methods: {
        getProductPermissions() {
            this.User.getProductPermissions({},(response)=>{
                if(response.s == 1)
                {
                    this.productPermissions = response.productPermissions
                }
            })
        },
    },
    mounted() 
    {   
        this.getProductPermissions()
    },
    template : `
        <div v-if="productPermissions" class="card shadow-none border">
            <div class="card-body text-center text-center">
                <div class="lead fw-semibold text-dark mb-3">
                    Membresía
                </div>
                <div class="mb-2">
                    <span v-if="productPermissions.pay_business" class="badge bg-success text-uppercase">
                            <i class="bi bi-check"></i>
                        Pay Business
                    </span>
                    <span v-else class="badge bg-danger text-uppercase">
                        <i class="bi bi-x"></i>
                        Pay Business
                    </span>
                </div>
                <div>
                    <span v-if="productPermissions.academy" class="badge bg-success text-uppercase">
                        <i class="bi bi-check"></i>
                        Pay Academy
                    </span>
                    <span v-else class="badge bg-danger text-uppercase">
                        <i class="bi bi-x"></i>
                        Pay Academy
                    </span>
                </div>
            </div>
        </div>
    `,
}

export { MembershipwidgetViewer } 