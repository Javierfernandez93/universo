import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'

const AdmindashViewer = {
    name : 'admindash-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            myChart : null,
            lastInvoices : null,
            stats : {
                incoming: 0,
                outcoming: 0,
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

            let datasets = [];
            let labels = [];
            let profits = [];

            stats.reverse().map((stat)=>{
                labels.push(stat.create_date.formatDateTextChart())

                profits.push(stat.amount)
            })
            
            datasets.push({
                label: "Incoming",
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
        getAdminUserApiStats() {
            return new Promise((resolve,reject)=> {
                this.UserSupport.getAdminUserApiStats({user_api_id:this.user_api_id}, (response) => {
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
        this.getAdminUserApiStats().then((stats) => {
            this.stats = stats
            this.initChart(this.stats.chart)

            this.getAdminLastInvoices()
        }).catch(() => {
            this.stats = false 
        })
    },
    template : `
        <div class="row">
           <div class="col-12">
                <div class="card">
                    <div class="card-header pb-3 mb-3 border-bottom">   
                        <div v-if="stats" class="row">   
                            <div class="col-12 px-5 col-xl">   
                                <div class="lead">Incoming</div>
                                <h3 class="text-primary">$ {{stats.incoming.numberFormat(2)}} USD </h2>
                            </div>
                            <div class="col-12 border-start px-5 col-xl">   
                                <div class="lead">Outcoming</div>
                                <h3 class="text-primary">$ {{stats.outcoming.numberFormat(2)}} USD </h3>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <canvas v-show="stats" ref="myChart" id="myChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-sm-6">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">Last Invoices</h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul v-if="lastInvoices" class="list-group">
                            <li v-for="invoice in lastInvoices" class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0  btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">{{invoice.name}}</h6>
                                            <span class="text-xs">
                                                {{invoice.create_date.formatFullDate()}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-auto text-end">
                                        <div class="text-success text-gradient text-sm font-weight-bold ms-aut">+ $ {{invoice.amount.numberFormat(2)}}</div>

                                        <div>
                                            <span v-if="invoice.status == STATUS.EXPIRED.code" class="badge bg-danger">
                                                Expired
                                            </span>
                                            <span v-else-if="invoice.status == STATUS.PENDING.code" class="badge bg-warning">
                                                Pending
                                            </span>
                                            <span v-else-if="invoice.status == STATUS.PAID.code" class="badge bg-success">
                                                Paid
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 mt-sm-0 mt-4">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">Revenue</h6>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
                                <small>01 - 07 June 2021</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up" aria-hidden="true"></i></button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">via PayPal</h6>
                                            <span class="text-xs">07 June 2021, at 09:00 AM</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                        + $ 4,999
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2">
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-up" aria-hidden="true"></i></button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Partner #90211</h6>
                                            <span class="text-xs">07 June 2021, at 05:50 AM</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                        + $ 700
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2">
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 mb-2 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-down" aria-hidden="true"></i></button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Services</h6>
                                            <span class="text-xs">07 June 2021, at 07:10 PM</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold ms-auto">
                                        - $ 1,800
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdmindashViewer }