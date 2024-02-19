import { User } from '../../src/js/user.module.js?v=2.4.2'   

const SellerstatschartwidgetViewer = {
    data() {
        return {
            User: new User,
            stats: null
        }
    },
    methods : {
        getBlog(blog_id)
        {
            this.User.getBlog({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    this.blog = response.blog
                }
            })
        },
        initChart(stats) {
            const ctx = document.getElementById("myChart").getContext("2d");

            let datasets = [];
            let labels = [];
            let profits = [];

            stats.reverse().map((stat)=>{
                labels.push(stat.signup_date.formatDateTextChart())
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
        getSellerStatsForChart()
        {
            this.User.getSellerStatsForChart({},(response)=>{
                if(response.s == 1)
                {
                    this.stats = response.stats
                    
                    this.initChart(response.stats)
                } else {
                    this.stats = false
                }
            })  
        }
    },
    mounted() 
    {       
        this.getSellerStatsForChart()
    },
    template : `
        <div class="card card-body shadow-none border">   
            <canvas v-show="stats" ref="myChart" id="myChart"></canvas>

            <div class="py-5 text-secondary text-center" v-if="stats == false">
                <div>
                    <i class="bi bi-clock fs-1 text-muted"></i>
                </div>
                Aún no tienes estadísticas
            </div>
        </div>
    `
}

export { SellerstatschartwidgetViewer }