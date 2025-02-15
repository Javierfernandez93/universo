import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.8'   
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.8'
import PlaceHolder from '../../src/js/components/PlaceHolder.vue.js?v=1.1.8' 
import IconHolder from '../../src/js/components/IconHolder.vue.js?v=1.1.8' 
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.1.8' 

const ClientlistViewer = {
    props : ['compact'],
    components: {
        LoaderViewer,
        PlaceHolder,
        IconHolder,
        HighLigth
    },
    data() {
        return {
            UserSupport: new UserSupport,
            usersAux: [],
            users: [],
            busy: false,
            query: null,
            user_login_id: null,
            user_type_id: null,
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
        query: {
            handler() {
                this.users = this.usersAux.filter(user => user.names.toLowerCase().includes(this.query.toLowerCase()) 
                || user.email.toLowerCase().includes(this.query.toLowerCase()) 
                || user.referral_name?.toLowerCase().includes(this.query.toLowerCase()) 
                || user.company_id.toString().includes(this.query.toLowerCase()))
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
            return new Promise((resolve) => {
                this.busy = true
                this.users = []
                this.usersAux = []
                this.UserSupport.getClients({user_login_id:this.user_login_id}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        this.users = response.users
                        this.usersAux = response.users
                    } 

                    resolve()
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
                    } else {
                        toastInfo({
                            message: `❌ Usuario no encontrado`
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
                if(exist)
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
                } else {
                    toastInfo({
                        message: `❌ Usuario no es un cliente`
                    })
                }
            })
        },
        getUserTypeId() {
            return new Promise((resolve) => {
                this.busy = true
                this.UserSupport.getUserTypeId({},(response)=>{
                    this.busy = false
                    if(response.s == 1)
                    {
                        this.user_type_id = response.user_type_id
                    }

                    resolve()
                })
            })
        },
    },
    async mounted() {
        await this.getUserTypeId()

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
    /* html */
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
                        <button @click="getClients" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">
                            <i class="fa fa-sync"></i>
                        </button>
                    </div>
                    <div class="col-auto text-end">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body">
                <HighLigth :busy="busy" :dataLength="users.length" :query="query"/>

                <div v-if="users.length > 0" class="table-responsive-sm border border-light rounded">
                    <table class="table align-items-center table-borderless table-hover table-striped mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="header-sticky text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style="width:4rem">
                                    Manivela
                                </th>
                                <th class="header-sticky text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    USUARIO
                                </th>
                                <th class="header-sticky text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Asesor
                                </th>
                                <th class="header-sticky text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    registro
                                </th>
                                <th class="header-sticky text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td class="align-middle text-center">
                                    <IconHolder :value="user.on_manivela" icon="bi-check" :tooltip="user.on_manivela ? 'En manivela' : 'No esta en manivela'" />
                                </td>
                                <td class="align-middle cursor-pointer" @click="viewDetail(user.user_login_id)">
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="user1">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                            <p class="text-xs text-secondary text-lowercase mb-0">{{user.email}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <PlaceHolder placeholder="-" :value="user.referral_name" type="text" myClass="text-decoration-underline cursor-pointer fw-bold" @click="query = user.referral_name" />
                                </td>
                                <td class="align-middle text-center text-sm">
                                    {{user.signup_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn shadow-none btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                            <li><button class="dropdown-item" @click="viewDetail(user.user_login_id)">Ver expediente</button></li>
                                            
                                            <div v-if="user_type_id == 1">
                                                <li v-if="!user.on_manivela"><button class="dropdown-item" @click="findUser(user)">Verificar existencia manivela</button></li>
                                                <li v-else><button class="dropdown-item" @click="requiredGeneral(user)">Actualizar info en manivela</button></li>
                                            </div>
                                            
                                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
}

export { ClientlistViewer }