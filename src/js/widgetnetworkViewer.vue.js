import { User } from '../../src/js/user.module.js?v=1.0.6'   

const WidgetnetworkViewer = {
    name : 'widgetnetwork-viewer',
    data() {
        return {
            User : new User,
            networkInfo : {
                directs: 0,
                total: 0 
            }
        }
    },
    methods: {
        getNetworkInfo() {
            return new Promise((resolve, reject) => {
                this.User.getNetworkInfo({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.networkInfo)
                    }

                    reject()
                })
            })
        }
    },
    mounted() 
    {   
        this.getNetworkInfo().then((networkInfo) => {
            this.networkInfo = networkInfo
        })
    },
    template : `
        <div class="card bg-purple rounded shadow">
            <div class="card-body p-0">
                <div class="row align-items-center">
                    <div class="col-12 col-xl p-5">
                        <div class="row">
                            <div class="col-12 col-xl-6">
                                <div>
                                    <h4 class="text-white">Total directos</h4>
                                    <h1 class="text-white">{{networkInfo.directs}}</h1>
                                </div>
                            </div>
                            <div class="col-12 col-xl-6">
                                <div>
                                    <h4 class="text-white">Total Clientes</h4>
                                    <h1 class="text-white">{{networkInfo.total}}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto d-none d-md-inline">
                        <img src="../../src/img/network-info-image.png" class="img-100 float" alt="telegram-floating" title="telegram-floating"/>
                    </div>
                </div>
            </div>
            <div class="justify-content-center text-center">
                <a href="../../apps/multilevel" class="btn px-0 fs-5 text-lowercase text-white btn-lg mb-0 shadow-none">Ver más <i class="bi ms-2 bi-arrow-right"></i> </a>
            </div>
        </div>
    `,
}

export { WidgetnetworkViewer } 