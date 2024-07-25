import { UserSupport } from './userSupport.module.js?v=1.0.8'   
import LoaderViewer from './loaderViewer.vue.js?v=1.0.8'   
import HighLigth from './components/HighLigth.vue.js?v=1.0.8'
import PlaceHolder from './components/PlaceHolder.vue.js?v=1.0.8'
import Badge from './components/Badge.vue.js?v=1.0.8'

const LoggsViewer = {
    components : {
        LoaderViewer,
        HighLigth,
        PlaceHolder,
        Badge
    },
    data() {
        return {
            UserSupport : new UserSupport,
            busy: false,
            query: null,
            loggs: [],
            loggsAux: [],
        }
    },
    watch : {
        query() {
            this.loggs = this.loggsAux.filter(logg => logg.names.toLowerCase().includes(this.query.toLowerCase()) 
            || logg.data.table.toLowerCase().includes(this.query.toLowerCase()) 
            || logg.data.field.toLowerCase().includes(this.query.toLowerCase()) 
            || logg.data.action.toLowerCase().includes(this.query.toLowerCase()) 
            || logg.data.value.toLowerCase().includes(this.query.toLowerCase()))
        },
    },
    methods: {
        viewLogData(logg) 
        {
            alertAdvise({
                html: `<div class="lead">json data</div>
                <div class="text-break">${logg.data.value}</div>`,
                size: 'modal-fullscreen',
            })
        },
        setLoggerStatus(logger,status) 
        { 
            this.UserSupport.setLoggerStatus({logger_id:logger.logger_id,status:status},(response)=>{
                if(response.s == 1)
                {
                    logger.status = status

                    this.getLoggs()
                }
            })
        },
        getLoggs() 
        { 
            this.busy = true
            this.loggs = []
            this.loggsAux = []
            this.UserSupport.getLoggs({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.loggs = response.loggs
                    this.loggsAux = response.loggs
                }
            })
        },
    },
    mounted() 
    {   
        this.getLoggs()
    },
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{loggs ? loggs.length : 0}}</span></div>
                        <h6>Logs</h6>
                    </div>
                    <div class="col-auto text-end">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div class="col-auto text-end">
                        <button @click="getLoggs" :disabled="busy" class="btn btn-dark shadow-none mb-0 px-3 btn-sm">
                            <i class="fas fa-sync"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <LoaderViewer v-if="busy" />

                <HighLigth :busy="busy" :dataLength="loggs.length" :query="query"/>

                <div class="table-responsive-sm p-0">
                    <table v-if="loggs.length > 0" class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="text-center border-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Usuario
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Método
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Tabla
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Campo
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Acción
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Valor
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Fecha
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="logg in loggs" class="text-center">
                                <td class="border-end text-dark">
                                    {{logg.names}}
                                </td>
                                <td class="text-xs">
                                    <div>
                                        <Badge :value="logg.data.type" :myClass="logg.data.type == 'success' ? 'bg-success' : 'bg-danger'" @click="query = logg.data.method" />
                                    </div>
                                    <PlaceHolder :value="logg.data.method" empty="true" type="text" myClass="text-decoration-underline cursor-pointer fw-bold" @click="query = logg.data.method" />
                                </td>
                                <td class="text-xs">
                                    <PlaceHolder :value="logg.data.table" empty="true" type="text" myClass="text-decoration-underline cursor-pointer fw-bold" @click="query = logg.data.table" />
                                </td>
                                <td class="text-xs">
                                    <PlaceHolder :value="logg.data.field" empty="true" type="text" myClass="text-decoration-underline cursor-pointer fw-bold" @click="query = logg.data.field" />
                                </td>
                                <td class="text-xs">
                                    <span class="badge bg-primary">
                                        {{logg.data.action}}
                                    </span>
                                </td>
                                <td class="text-xs">
                                    {{logg.data.value ? logg.data.value.length : 0}} / size
                                </td>
                                <td class="text-xs">
                                    {{logg.create_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-outline-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="viewLogData(logg)">Ver información</button></li>
                                            <li><button class="dropdown-item" @click="setLoggerStatus(logg,-1)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
}

export { LoggsViewer } 