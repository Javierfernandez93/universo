import { User } from '../../src/js/user.module.js?v=1.1.3'   

const ApistatsViewer = {
    name : 'apistats-viewer',
    data() {
        return {
            User: new User,
            myChart : null,
            stats : {
                incoming: 0,
                outcoming: 0,
                stats: {},
            },
            user_api_id: null,
            stats: null,
        }
    },
    methods: {
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
        getUserApiStats() {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiStats({user_api_id:this.user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.stats)
                    }

                    reject()
                })

            })
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this.getUserApiStats().then((stats)=>{
                this.stats = stats
                this.initChart(this.stats.chart)
            }).catch(() => {
                this.stats = false 
            })
        }
    },
    template : `
        <div class="row animation-fall-down" style="--delay:1.5s">
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
            <div v-if="stats" class="col-12 col-xl-4">

                <div v-for="balance in stats.wallet.balances" class="row mb-3">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">   
                                <div class="lead">Balance</h3>
                                <h3 class="text-primary">$ {{balance.balance.numberFormat(2)}} {{balance.name}} </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { ApistatsViewer } 