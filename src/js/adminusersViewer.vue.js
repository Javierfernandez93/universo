import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.4'

const AdminusersViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            busy: false,
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
            this.users = this.users.filter(user => {
                return user.names.toLowerCase().includes(this.query.toLowerCase()) || 
                user.email.toLowerCase().includes(this.query.toLowerCase()) || 
                user.company_id.toString().includes(this.query.toLowerCase()) ||
                user.sponsor_name.toLowerCase().includes(this.query.toLowerCase()) ||
                user.affiliation.toLowerCase().includes(this.query.toLowerCase()) 
        })
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
        goToEdit(company_id) {
            window.location.href = '../../apps/admin-users/edit?ulid=' + company_id
        },
        viewClients(company_id) {
            window.location.href = '../../apps/admin-users/clients?ulid=' + company_id
        },
        viewFollowPages(company_id) {
            window.location.href = '../../apps/admin-users/followPages?ulid=' + company_id
        },
        getUsers() {
            this.busy = true
            this.users = null
            this.usersAux = null
            this.UserSupport.getUsers({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.users = response.users
                    this.usersAux = response.users
                }
            })
        },
    },
    mounted() {
        this.getUsers()
    },
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="users" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{users.length}}</span></div>
                        <h6>Asesores</h6>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-users/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir asesor</a></div>
                    </div>
                    <div class="col-auto text-end">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="busy == true" class="d-flex justify-content-center py-3">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div v-if="users" class="table-responsive-sm p-0 h-100">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="text-secondary text-xxs font-weight-bolder opacity-7">
                                <th class="text-uppercase">
                                    USUARIO
                                </th>
                                <th class="text-center text-uppercase">Tipo de usuario</th>
                                <th class="text-center text-uppercase">Líder</th>
                                <th class="text-center text-uppercase">Afiliación</th>
                                <th class="text-center text-uppercase">INGRESO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" class="text-center text-sm fw-bold text-dark text-uppercase">
                                <td class="text-start">
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                            <p class="text-xs text-secondary mb-0">{{user.email}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-sm">
                                    <span class="badge bg-primary">asesor</span>
                                </td>
                                <td class="align-middle cursor-pointer text-decoration-underline" @click="query = user.sponsor_name">
                                    {{user.sponsor_name}}
                                </td>
                                <td class="align-middle cursor-pointer text-decoration-underline" @click="query = user.affiliation">
                                    {{user.affiliation}}
                                </td>
                                <td class="align-middle">
                                    {{user.signup_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                            <li><button class="dropdown-item" @click="getInBackoffice(user.user_login_id)">Acceder a backoffice</button></li>
                                            <li><button class="dropdown-item" @click="viewClients(user.user_login_id)">Ver clientes</button></li>
                                            <li><button class="dropdown-item" @click="viewFollowPages(user.user_login_id)">Páginas visitadas</button></li>
                                            
                                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="card-body">
                    <div class="alert alert-warning text-white text-center">
                        <div>No tenemos asesores aún</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminusersViewer } 