import { User } from '../../src/js/user.module.js?v=1.0.8'   

const SellerstatswidgetViewer = {
    data() {
        return {
            User: new User,
            blog: null,
            stats: {
                total: {
                    clients: 0,
                    leads: 0,
                    commissions: 0,
                }
            }
        }
    },
    methods : {
        getSellerStats()
        {
            this.User.getSellerStats({},(response)=>{
                if(response.s == 1)
                {
                    this.stats = response.stats
                }
            })
        }
    },
    mounted() 
    {       
        this.getSellerStats()
    },
    template : `
        <div class="row">   
            <div class="col-12 col-xl mb-3">   
                <div class="card card-body shadow-none border p-3">
                    <div class="row">
                        <div class="col">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Clientes</p>
                                <h5 class="font-weight-bolder mb-0">
                                    {{stats.total.clients.numberFormat(0)}}
                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                </h5>
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <div class="icon icon-shape bg-primary text-center border-radius-md">
                                <i class="bi bi-person text-white text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl mb-3">   
                <div class="card card-body shadow-none border p-3">
                    <div class="row">
                        <div class="col">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Prospectos</p>
                                <h5 class="font-weight-bolder mb-0">
                                    {{stats.total.leads.numberFormat(0)}}
                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                </h5>
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <div class="icon icon-shape bg-primary text-center border-radius-md">
                                <i class="bi bi-person text-white text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl mb-3">   
                <div class="card card-body shadow-none border p-3">
                    <div class="row">
                        <div class="col">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Comisiones generadas</p>
                                <h5 class="font-weight-bolder mb-0">
                                    {{stats.total.commissions.numberFormat(0)}}
                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                </h5>
                            </div>
                        </div>
                        <div class="col-auto text-end">
                            <div class="icon icon-shape bg-primary text-center border-radius-md">
                                <i class="bi bi-currency-dollar text-white text-lg opacity-10" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { SellerstatswidgetViewer }