import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.7'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.0.7'

const LeadershipStatsViewer = {
    components : {
        LoaderViewer,
    },
    data() {
        return {
            UserSupport: new UserSupport,
            leadersStats: false,
            show: false,
            busy: false
        }
    },
    methods : {
        getLeadershipStats() {
            this.busy = true
            this.UserSupport.getLeadershipStats({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.leadersStats = response.leadersStats
                }
            })
        },
    },
    mounted() 
    {     
        this.getLeadershipStats()
    },
    template : `
        <LoaderViewer :busy="busy"/>

        <div v-if="leadersStats" class="mb-3">
            <div class="card overflow-hidden">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12 col-md">
                            <div class="text-xs">total {{ leadersStats ? leadersStats.length : 0 }}</div>
                            <div class="h4">
                                Resultados de afiliación
                            </div>
                        </div>
                        
                        <div class="col-12 col-md-auto">
                            <button @click="show = !show" class="btn shadow-none mb-0 btn-outline-dark px-3 btn-sm" v-text="show ? 'Cerrar' : 'Mostrar resultados'"></button>
                        </div>
                    </div>
                </div>
                <ul v-if="show" class="list-group list-group-flush">
                    <li v-for="(leader,index) in leadersStats" class="list-group-item p-3 list-group-item-action">
                        <div class="row align-items-center">
                            <div class="col-12 col-md-auto">
                                <div class="avatar avatar-md">
                                    <span class="avatar avatar-md bg-dark">
                                        {{index+1}}
                                    </span>
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="text-sm mb-0 text-capitalize font-weight-bold">Afiliación</div>
                                <h5 class="font-weight-bolder mb-0">
                                    {{leader.name}} por {{leader.names}}
                                </h5>
                            </div>
                            <div class="col-12 col-md-auto text-end">
                                <div class="text-sm mb-0 text-capitalize font-weight-bold">Leads</div>
                                <h5 class="font-weight-bolder mb-0">
                                    {{leader.count_leads}}
                                </h5>
                            </div>
                            <div class="col-12 col-md-auto text-end">
                                <div class="text-sm mb-0 text-capitalize font-weight-bold">Clientes</div>
                                <h5 class="font-weight-bolder mb-0">
                                    {{leader.count_clients}}
                                </h5>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
}

export { LeadershipStatsViewer }