import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.5'

const AdmindashViewer = {
    name : 'admindash-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            myChart : null,
            lastInvoices : null,
            stats : {
                lastClients : null,
                lastLeads : null,
                total : {
                    clients: 0,
                    sellers: 0,
                    leads: 0,
                },
                stats: {},
            },
            STATUS : {
                EXPIRED: {
                    code: -1,
                    text: 'Expired',
                },
                PENDING: {
                    code: 1,
                    text: 'Pending',
                },
                PAID: {
                    code: 2,
                    text: 'Paid',
                }
            },
        }
    },
    methods : {
        initChart(stats) {
            const ctx = document.getElementById("myChart").getContext("2d");

            console.log(stats)

            let datasets = [];
            let labels = [];
            let profits = [];

            stats.map((stat)=>{
                labels.push(stat.create_date)
                profits.push(stat.users)
            })
            
            datasets.push({
                label: "Clientes",
                data: profits,
                borderColor: "#7928CA",
                backgroundColor: "#7928CA",
            })

            const data = {
                labels: labels,
                datasets: datasets,
            };

            const config = {
                type: "line",
                data: data,
                options: {
                    tension: 0.1,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                            },
                            grid: {
                                display: false,
                            }                          
                        },
                        y: {
                            display: false,
                            title: {
                                display: true,
                                text: "($) USD",
                            },
                            grid: {
                                display: false,
                            } 
                        },
                    },
                },
            };

            this.myChart = new Chart(ctx, config);
        },
        getDashStats() {
            return new Promise((resolve,reject)=> {
                this.UserSupport.getDashStats({user_api_id:this.user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.stats)
                    }

                    reject()
                })

            })
        },
        getAdminLastInvoices() {
            this.UserSupport.getAdminLastInvoices({}, (response) => {
                if (response.s == 1) {
                    this.lastInvoices = response.lastInvoices
                }
            })
        },
    },
    mounted() 
    {     
        this.getDashStats().then((stats) => {
            this.stats = {...this.stats, ...stats}
            
            this.initChart(stats.chart)
        }).catch(() => {
            this.stats = false 
        })
    },
    template : `
        <div class="card">
            <div class="card-body">
                <div class="row">       
                    <div class="col-12 col-md-8">       
                        <canvas v-show="stats" ref="myChart" id="myChart"></canvas>
                    </div>

                    <div class="col-12 col-md-4">   
                        <div v-if="stats" class="row">   
                            <div class="col-12 mb-3">   
                                <div class="card card-body p-3">
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="numbers">
                                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Clientes</p>
                                                <h5 v-if="stats.total.clients" class="font-weight-bolder mb-0">
                                                    {{stats.total.clients.numberFormat(0)}}
                                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="col-4 text-end">
                                            <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-3">   
                                <div class="card card-body p-3">
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="numbers">
                                                <p class="text-sm mb-0 text-capitalize font-weight-bold">asesores</p>
                                                <h5 class="font-weight-bolder mb-0">
                                                    {{stats.total.sellers.numberFormat(0)}}
                                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="col-4 text-end">
                                            <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-3">   
                                <div class="card card-body p-3">
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="numbers">
                                                <p class="text-sm mb-0 text-capitalize font-weight-bold">Prospectos</p>
                                                <h5 class="font-weight-bolder mb-0">
                                                    {{stats.total.leads.numberFormat(0)}}
                                                    <span class="text-success text-sm font-weight-bolder">+0%</span>
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="col-4 text-end">
                                            <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-12 col-md-6 mt-sm-0 mt-4">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">Últimos clientes</h6>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
                                <small></small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul v-if="stats.lastClients" class="list-group">
                            <li v-for="user in stats.lastClients" class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="bi bi-plus" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">{{user.names}}</h6>
                                            <span class="text-xs">{{user.signup_date.formatFullDate()}}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                        Cliente
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 mt-sm-0 mt-4">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">Últimos prospectos</h6>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
                                <small></small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul v-if="stats.lastLeads" class="list-group">
                            <li v-for="user in stats.lastLeads" class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="bi bi-plus" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">{{user.names}}</h6>
                                            <span class="text-xs">{{user.signup_date.formatFullDate()}}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                        {{user.catalog_user_type}}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdmindashViewer }