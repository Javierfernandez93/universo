import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.0'
import Status from '../../src/js/components/Status.vue.js?v=1.0.0'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.0.0'
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.0.0'

const AdminrealstateViewer = {
    components : {
        LoaderViewer,
        Status,
        HighLigth
    },
    data() {
        return {
            UserSupport: new UserSupport,
            realStates: [],
            realStatesAux: [],
            busy: false,
            query: null,
            columns: { // 0 DESC , 1 ASC 
                title: {
                    name: 'title',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                link: {
                    name: 'link',
                    desc: false,
                },
            }
        }
    },
    watch: {
        query(){
            this.realStates = this.realStatesAux.filter((payment) => {
                return payment.seller.toLowerCase().includes(this.query.toLowerCase()) || payment.title.toLowerCase().includes(this.query.toLowerCase()) || payment.last_payment_number.toString().includes(this.query.toLowerCase())
            })
        }
    },
    methods: {
        sortData(column) {
            this.realStates.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if (column.alphabetically) {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        getRealStates() {
            this.realStatesAux = []
            this.realStates = []
            this.busy = true
            
            this.UserSupport.getRealStates({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.realStatesAux = response.realStates
                    this.realStates = this.realStatesAux
                } 
            })
        },
        editRealState(realState) {
            window.location.href = `../../apps/admin-realstate/edit.php?rsid=${realState.real_state_id}`
        },
        setRealStatStatus(realState,status) {
            this.UserSupport.setRealStatStatus({real_state_id:realState.real_state_id,status:status}, (response) => {
                if (response.s == 1) {
                    realState.status = status

                    if (status == 1) {
                        toastInfo({
                            message: 'Proyecto habilitado',
                        })
                    } else if (status == 0) {
                        toastInfo({
                            message: 'Proyecto deshabilitado',
                        })
                    } else if (status == -1) {
                        this.getRealStates()
                    }
                }
            })
        },
    },
    mounted() {
        this.getRealStates()
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="realStates" class="badge text-secondary p-0">Total {{realStates.length}}</span>
                                <div class="h5">
                                    Proyectos
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-realstate/add" class="btn btn-sm px-3 mb-0 shadow-none btn-dark">Agregar proyecto</a>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="getRealStates" class="btn btn-sm px-3 mb-0 shadow-none btn-dark">
                                    <i class="bi bi-arrow-clockwise"></i>   
                                </button>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>

                        <div v-if="query" class="text-xs">Resultados de la búsqueda <b>{{query}}</b> ({{realStates.length}} resultados)</div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <HighLigth :busy="busy" :dataLength="realStates.length" :query="query"/>
                        
                        <div v-if="realStates.length > 0" class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th></th>
                                        <th @click="sortData(columns.title)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">proyecto</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.link)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.link.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Estado</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.link)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.link.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Tipo</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Ingreso</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="realState in realStates" class="text-center text-sm">
                                        <td>
                                            <Status :status="realState.status"/>
                                        </td>    
                                        <td class="align-middle fw-bold text-dark">
                                            {{realState.title}} 
                                            <span v-if="realState.link" class="text-secondary">
                                                <a :href="realState.link" target="_blank">
                                                    <i class="bi bi-link-45deg text-secondary"></i>
                                                </a>
                                            </span>
                                        </td>
                                        <td class="align-middle text-decoration-underline">
                                            <span v-if="realState.sold_out" class="badge border border-danger text-danger">
                                                Sold out
                                            </span>
                                            <span v-else class="badge border border-success text-success">  
                                                Unidades disponibles
                                            </span>
                                        </td>
                                        <td class="align-middle">
                                            <span v-if="realState.main == '1'" class="badge border border-primary text-primary">Primer etapa</span>
                                            <span v-else class="badge border border-success text-success">Etapas nuevas</span>
                                        </td>
                                        <td class="align-middle">
                                            {{realState.create_date.formatFullDate()}}
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 mb-0 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editRealState(realState)">Editar</button>
                                                    </li>
                                                    <li v-if="realState.status == '1'">
                                                        <button class="dropdown-item" @click="setRealStatStatus(realState,0)">Inhabilitar</button>
                                                    </li>
                                                    <li v-if="realState.status == '0'">
                                                        <button class="dropdown-item" @click="setRealStatStatus(realState,1)">Habilitar</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" @click="setRealStatStatus(realState,-1)">Eliminar</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdminrealstateViewer }