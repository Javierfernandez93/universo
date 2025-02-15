import { User } from '../../src/js/user.module.js?v=1.1.8'   

const DailyViewer = {
    name : 'daily-viewer',
    data() {
        return {
            User: new User,
            myChartDaily : null,
            range : null
        }
    },
    methods: {
        getIncome() {
            this.User.getIncome({},(response)=>{
                if(response.s == 1)
                {
                    this.initChart(response.income)
                    // this.initChart([{
                    //     month_name: 'Enero',
                    //     total: '123',
                    // }])
                }
            })
        },
        initChart(months) {
            const ctx = document.getElementById("myChartDaily").getContext("2d");

            let datasets = [];
            let labels = [];
            let profits = [];

            months.reverse().map((month)=>{
                labels.push(month.month_name)
                profits.push(month.total)
            })
            months.reverse()
            
            datasets.push({
                label: "Profits $",
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
                    tension: 0.5,
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

            this.myChartDaily = new Chart(ctx, config);
        },
    },
    mounted() 
    {   
        this.getIncome()
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header h4">
                Daily
            </div>
            <div class="card-body">
                <canvas ref="myChartDaily" id="myChartDaily"></canvas>
            </div>
        </div>

    `,
}

export { DailyViewer } 