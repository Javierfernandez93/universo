import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.9'   

const ClientlistViewer = {
    name : 'clientlist-viewer',
    props : ['compact'],
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
        goToEdit(company_id) {
            window.location.href = `../../apps/admin-client/edit.php?ulid=${company_id}`
        },
        addClient() {
            const param = getParam("ulid") ? `?ulid=${getParam("ulid")}` : ""

            window.location.href = `../../apps/admin-client/add${param}`
        },
        viewDetail(company_id) {
            window.location.href = `../../apps/admin-client/view.php?ulid=${company_id}`
        },
        getClients(user_login_id) {
            this.users = null
            this.usersAux = null

            this.UserSupport.getClients({user_login_id:user_login_id}, (response) => {
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
        this.getClients(getParam("ulid"))
    },
    template : `
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="users" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{users.length}}</span></div>
                        <h6>Clientes</h6>
                    </div>
                    <div class="col-auto text-end">
                        <button @click="addClient" type="button" class="btn me-2 shadow-none mb-0 btn-success px-3 btn-sm">Añadir cliente</button>
                    </div>
                    <div class="col-auto text-end">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div v-if="users" class="table-responsive-sm">
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
                                    Tipo de usuario
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td class="cursor-pointer" @click="viewDetail(user.user_login_id)">
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
                                <td class="align-middle text-center text-sm">
                                    {{user.signup_date.formatFullDate()}}
                                </td>

                                <td class="align-middle text-center text-sm">
                                    <span class="badge bg-primary">Cliente</span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn shadow-none btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                            <li><button class="dropdown-item" @click="viewDetail(user.user_login_id)">Ver expediente</button></li>
                                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="alert alert-light text-center mb-0">
                    <div>No tenemos clientes aún</div>
                </div>
            </div>
        </div>
    `
}

export { ClientlistViewer }