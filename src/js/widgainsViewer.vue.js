import { User } from '../../src/js/user.module.js?v=1.1.6'   

const WidgainsViewer = {
    name : 'widgains-viewer',
    data() {
        return {
            User : new User,
            amount : 0
        }
    },
    methods: {
        getEwalletAmount() {
            return new Promise((resolve, reject) => {
                this.User.getEwalletAmount({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.amount)
                    }

                    reject()
                })
            })
        }
    },
    mounted() 
    {   
        this.getEwalletAmount().then((amount) => {
            this.amount = amount
        })
    },
    template : `
        <div class="card bg-blue rounded shadow">
            <div class="card-body p-0">
                <div class="row align-items-center">
                    <div class="col-12 col-xl p-5">
                        <h4 class="text-white">Total ganancias</h4>
                        <h1 class="text-white">$ {{amount.numberFormat(2)}}</h1>
                        <h4 class="text-white">+0 esta semana</h4>
                    </div>
                    <div class="col-12 col-xl-auto d-none d-md-inline">
                        <img src="../../src/img/gains-dollar.png" class="img-100 float" alt="telegram-floating" title="telegram-floating"/>
                    </div>
                </div>
            </div>
            <div class="justify-content-center text-center">
                <a href="../../apps/ewallet/" class="btn px-0 fs-5 text-lowercase text-white btn-lg mb-0 shadow-none">Ver reporte completo <i class="bi ms-2 bi-arrow-right"></i> </a>
            </div>
        </div>
    `,
}

export { WidgainsViewer } 