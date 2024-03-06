import { User } from '../../src/js/user.module.js?v=2.4.8'   

const SellerclientsViewer = {
    emits : ['add','edit'],
    data() {
        return {
            User: new User,
            users: null,
            usersAux: null,
            query: null,
            busy: false,
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
        deleteUserBySeller(company_id) {
            this.User.deleteUserBySeller({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    this.getSellerClients()

                    toastInfo({
                        message: 'Cliente eliminado',
                    })
                }
            })
        },
        edit(company_id) {
            this.$emit('edit',company_id)
        },
        addClient() {
            this.$emit('add')
        },
        viewDetail(company_id) {
            window.location.href = `../../apps/clients/view.php?ulid=${company_id}`
        },
        getSellerClients() {
            this.busy = true
            this.users = null
            this.usersAux = null

            this.User.getSellerClients({catalog_user_type_id:3}, (response) => {
                this.busy = false
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
        this.getSellerClients()
    },
    template : `
        <div v-if="busy" class="d-flex justify-content-center align-items-center py-5">
            <div class="spinner-border " role="status">
            </div>
        </div>

        <div class="card shadow-none card-body bg-transparent mb-3">
            <div class="row align-items-center">
                <div class="col">
                    <div v-if="users"><span class="text-secondary text-xxs">Total {{users.length}}</span></div>
                    <h3 class="text-dark">Clientes</h3>
                </div>
                <div class="col-auto text-end">
                    <button @click="addClient" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">
                        <i class="bi bi-plus button-icon"></i>
                        Añadir cliente
                    </button>
                </div>
            </div>
        </div>
        
        <div class="card card-body mb-3"> 
            <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
        </div>

        <div class="card">
            <div v-if="users" class="table-responsive-sm">
                <table class="table table-borderless align-items-center mb-0">
                    <thead>
                        <tr class="align-items-center">
                            <th class="text-dark font-weight-bolder">
                                USUARIO
                            </th>
                            <th class="text-dark text-center font-weight-bolder">
                                STATUS
                            </th>
                            <th class="text-dark text-center font-weight-bolder">
                                SIGNUP DATE
                            </th>
                            <th class="text-dark text-center font-weight-bolder"></th>
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
                                        <h6 class="mb-0 text-sm ">{{user.names}}</h6>
                                        <p class="text-xs mb-0">{{user.email}}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge bg-primary-light text-primary">Cliente</span>
                            </td>
                            <td class="align-middle text-center  text-sm">
                                {{user.signup_date.formatFullDate()}}
                            </td>
                            <td class="align-middle text-center text-sm">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-light shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                    </button>
                                    <ul class="dropdown-menu shadow">
                                        <li><button class="dropdown-item" @click="edit(user.user_login_id)">Editar</button></li>
                                        <li><button class="dropdown-item" @click="viewDetail(user.user_login_id)">Ver expediente</button></li>
                                        <li><button class="dropdown-item" @click="deleteUserBySeller(user.user_login_id)">Eliminar</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="users == false" class="alert alert-light text-center mb-0">
                <div>No tienes clientes aún. Añade uno dando clic en "Añadir cliente"</div>
            </div>
        </div>
    `
}

export { SellerclientsViewer }