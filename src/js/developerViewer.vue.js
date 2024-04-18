import { UserSupport } from '../../src/js/userSupport.module.js?t=5.1.4'

const DeveloperViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            developers: null,
            developersAux: null,
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
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.developers.sort((a, b) => {
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
        filterData() {
            this.developers = this.developersAux
            this.developers = this.developers.filter((developer) => {
                return developer.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getDevelopers() {
            this.developersAux = null
            this.developers = null
            this.busy = true
            
            this.UserSupport.getDevelopers({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.developersAux = response.developers
                    this.developers = this.developersAux
                } else {
                    this.developersAux = false
                    this.developers = false
                }
            })
        },
        editDeveloper(developer) {
            window.location.href = `../../apps/admin-developer/edit.php?rsdid=${developer.real_state_developer_id}`
        },
        setDeveloperStatus(developer,status) {
            this.UserSupport.setDeveloperStatus({real_state_developer_id:developer.real_state_developer_id,status:status}, (response) => {
                if (response.s == 1) {
                    developer.status = status

                    if (status == 1) {
                        toastInfo({
                            message: 'Desarrolladora habilitada',
                        })
                    } else if (status == 0) {
                        toastInfo({
                            message: 'Desarrolladora deshabilitada',
                        })
                    } else if (status == -1) {
                        this.getDevelopers()
                    }
                }
            })
        },
    },
    mounted() {
        this.getDevelopers()
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="developers" class="badge text-secondary p-0">Total {{developers.length}}</span>
                                <div class="h5">
                                    Desarrolladoras
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-developer/add" class="btn btn-sm px-3 mb-0 shadow-none btn-success">Agregar desarrolladora</a>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>

                        <div v-if="query" class="text-xs">Resultados de la búsqueda <b>{{query}}</b> ({{developers.length}} resultados)</div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div v-if="busy == true" class="d-flex justify-content-center py-3">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-if="developers" class="table-responsive-sm p-0">
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
                                            <u class="text-sm ms-2">Desarrolladora</u>
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
                                    <tr v-for="developer in developers" class="text-center text-sm">
                                        <td>
                                            <span v-if="developer.status == '1'" class="badge bg-success">Activo</span>
                                            <span v-if="developer.status == '0'" class="badge bg-secondary">Inactivo</span>
                                        </td>    
                                        <td class="align-middle fw-bold text-dark">
                                            {{developer.name}} 
                                        </td>
                                        <td class="align-middle">
                                            {{developer.create_date.formatFullDate()}}
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 mb-0 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editDeveloper(developer)">Editar</button>
                                                    </li>
                                                    <li v-if="developer.status == '1'">
                                                        <button class="dropdown-item" @click="setDeveloperStatus(developer,0)">Inhabilitar</button>
                                                    </li>
                                                    <li v-if="developer.status == '0'">
                                                        <button class="dropdown-item" @click="setDeveloperStatus(developer,1)">Habilitar</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" @click="setDeveloperStatus(developer,-1)">Eliminar</button>
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

export { DeveloperViewer }