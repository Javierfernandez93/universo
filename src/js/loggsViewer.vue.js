import { UserSupport } from './userSupport.module.js?v=2.4.7'   

const LoggsViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            loggs: null,
            loggsAux: null,
        }
    },
    watch : {
        query : {
            handler() {
              this.filled = this.user.title != null && this.user.names != null && this.user.investor.number != null 
            },
            deep: true
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
            this.loggs = null
            this.loggsAux = null

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
            this.UserSupport.getLoggs({},(response)=>{
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
                        <div v-if="loggs" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{loggs.length}}</span></div>
                        <h6>Logs</h6>
                    </div>
                    <div class="col-auto text-end">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="loggs" class="table-responsive-sm p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Usuario
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
                                <td>
                                    {{logg.names}}
                                </td>
                                <td>
                                    {{logg.data.table}}
                                </td>
                                <td>
                                    {{logg.data.field}}
                                </td>
                                <td>
                                    {{logg.data.action}}
                                </td>
                                <td>
                                    {{logg.data.value.length}} / size
                                </td>
                                <td>
                                    {{logg.create_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

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
                <div v-else-if="users == false" class="card-body">
                    <div class="alert alert-warning text-white text-center">
                        <div>No tenemos vendedores aún</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { LoggsViewer } 