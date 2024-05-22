import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.8'   

const ClientlistViewer = {
    name : 'clientlist-viewer',
    props : ['compact'],
    data() {
        return {
            UserSupport: new UserSupport,
            users: null,
            busy: false,
            usersAux: null,
            query: null,
            user_login_id: null,
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
        getClients() {
            return new Promise((resolve, reject) => {
                this.busy = true
                this.UserSupport.getClients({user_login_id:this.user_login_id}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        this.users = response.users
                        this.usersAux = response.users
                        resolve()
                    } else {
                        this.users = false
                        this.usersAux = false
                        reject()
                    }
                })
            })
        },
        findUser(user) {
            return new Promise((resolve) => {
                this.busy = true
                this.UserSupport.findUser({email:user.email,user_login_id:user.user_login_id}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        user.on_manivela = true
                        toastInfo({
                            message: `✅ Usuario encontrado ${response.user.Cliente}`
                        })
                    }
                    
                    resolve()
                })
            })
        },
        async validateIfExistBeforeSend(user) {
            return new Promise(async (resolve) => {
                await this.findUser(user)
    
                if(user.on_manivela)
                {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        },
        requiredGeneral(user) {
            this.validateIfExistBeforeSend(user).then((exist) => {
                if(!exist)
                {
                    this.busy = true
                    this.UserSupport.requiredGeneral({user_login_id:user.user_login_id}, (response) => {
                        this.busy = false
                        if (response.s == 1) {
                            toastInfo({
                                message: `✅ Usuario registrado en manivela`
                            })
                        }
                    })
                }
            })
        },
    },
    async mounted() {
        if(getParam("ulid"))
        {
            this.user_login_id = getParam("ulid")
        }

        await this.getClients();


        if(getParam("query"))
        {
            this.query = getParam("query")
        }
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
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div class="col-auto text-end">
                        <button @click="getClients" type="button" class="btn shadow-none mb-0 btn-dark px-3 btn-sm">
                            <i class="fa fa-sync"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div v-if="busy == true" class="d-flex justify-content-center py-3">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div v-if="users" class="table-responsive-sm">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="header-sticky text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width:4rem">
                                    Manivela
                                </th>
                                <th class="header-sticky text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    USUARIO
                                </th>
                                <th class="header-sticky text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    fecha de registro
                                </th>
                                <th class="header-sticky text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Tipo de usuario
                                </th>
                                <th class="header-sticky text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td class="align-middle text-center">
                                    <span v-if="user.on_manivela" class="text-success">
                                        <i class="bi bi-check-square-fill"></i>
                                    </span>
                                </td>
                                <td class="align-middle cursor-pointer" @click="viewDetail(user.user_login_id)">
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
                                            
                                            <li v-if="!user.on_manivela"><button class="dropdown-item" @click="findUser(user)">Verificar existencia manivela</button></li>
                                            <li v-if="!user.on_manivela"><button class="dropdown-item" @click="requiredGeneral(user)">Mandar registro manivela</button></li>
                                            
                                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="alert border border-light text-center mb-0">
                    <strong>Importante</strong>
                    <div>No hay información de clientes todavía refresca la página o vuelve más tarde</div>
                </div>
            </div>
        </div>
    `
}

export { ClientlistViewer }