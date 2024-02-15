import { UserSupport } from '../../src/js/userSupport.module.js?v=2.4.1'   

const LeadlistViewer = {
    name : 'leadlist-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            users: null,
            usersAux: null,
            query: null,
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                active: {
                    name: 'active',
                    desc: false,
                },
                phone: {
                    name: 'phone',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
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
            this.users.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.users = this.usersAux
            this.users = this.users.filter(user =>  user.names.toLowerCase().includes(this.query.toLowerCase()) || user.email.toLowerCase().includes(this.query.toLowerCase()) || user.company_id.toString().includes(this.query.toLowerCase()))
        },
        getInBackoffice(company_id) {
            this.UserSupport.getInBackoffice({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    window.open('../../apps/backoffice')
                }
            })
        },
        deleteUser(company_id) {
            this.UserSupport.deleteUser({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    this.getUsers()
                }
            })
        },
        setAsUserKind(company_id,catalog_user_type_id) {
            this.UserSupport.setAsUserKind({ company_id: company_id, catalog_user_type_id:catalog_user_type_id }, (response) => {
                if (response.s == 1) {
                    this.users = this.users.filter(user => user.user_login_id != company_id)
                    this.usersAux = this.users

                    toastInfo({
                        message: 'Se ha cambiado el tipo de usuario',
                    })
                }
            })
        },
        goToEdit(company_id) {
            window.location.href = '../../apps/admin-lead/edit?ulid=' + company_id
        },
        getLeads() {
            this.users = null
            this.usersAux = null
            this.UserSupport.getLeads({}, (response) => {
                if (response.s == 1) {
                    this.users = response.users
                    this.usersAux = response.users
                } else {
                    this.users = false
                    this.usersAux = false
                }
            })
        },
    },
    mounted() {
        this.getLeads()
    },
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="users" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{users.length}}</span></div>
                        <h6>Prospectos</h6>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-lead/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir prospecto</a></div>
                    </div>
                    <div class="col-auto text-end">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="users" class="table-responsives p-0 overflow-y-scrolls h-100s">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    USUARIO
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    fecha de registro
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Tipo
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <div v-if="user.tags">
                                                <span v-for="tag in user.tags" :style="{'--color':tag.color}" class="tag position-relative me-2 px-3 py-1 rounded-pill text-xs">
                                                    <span class="tag-dot position-absolute start-0" :style="{'background-color':tag.color}"></span>

                                                    <span class="text-dark">
                                                        {{tag.tag}}
                                                    </span>
                                                </span>
                                            </div>
                                            <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                            <p class="text-xs text-secondary mb-0">{{user.email}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <p class="text-xs font-weight-bold mb-0">{{user.signup_date.formatFullDate()}}</p>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span class="badge bg-primary">Prospecto</span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                            
                                            <li><button class="dropdown-item" @click="setAsUserKind(user.user_login_id,3)">Cambiar a cliente</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="card-body">
                    <div class="alert alert-light text-center mb-0">
                        <div>No tenemos prospectos aún</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { LeadlistViewer }