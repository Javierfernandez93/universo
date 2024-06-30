import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.3'
import { FollowpagesViewer } from '../../src/js/followpagesViewer.vue.js?v=1.0.3'  

import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.0.3'
import PlaceHolder from '../../src/js/components/PlaceHolder.vue.js?v=1.0.3' 
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.0.3' 
import IconHolder from '../../src/js/components/IconHolder.vue.js?v=1.0.3'
import ModalViewer from '../../src/js/modalViewer.vue.js?v=1.0.3'

const AdminusersViewer = {
    components: {
        LoaderViewer,
        PlaceHolder,
        HighLigth,
        IconHolder,
        FollowpagesViewer,
        ModalViewer
    },  
    data() {
        return {
            UserSupport: new UserSupport,
            busy: null,
            affiliations: [],
            users: [],
            usersAux: [],
            query: null,
            checkAll: false,
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
        checkAll() {
            this.users.forEach(element => {
                element.checked = this.checkAll
            });
        },
        query() {
            this.users = this.usersAux.filter(user => {
                return user.names?.toLowerCase().includes(this.query.toLowerCase()) 
                || user.email?.toLowerCase().includes(this.query.toLowerCase())  
                || user.company_id?.toString().includes(this.query.toLowerCase()) 
                || user.sponsor_name?.toLowerCase().includes(this.query.toLowerCase()) 
                || user.affiliation?.toLowerCase().includes(this.query.toLowerCase())  
            })
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
        setAcademyAs(user,status) {
            this.busy = true
            this.UserSupport.setAcademyAs({user_login_id:user.user_login_id,status:status},(response) =>{ 
                this.busy = false

                if(response.s == 1)
                {
                    user.has_academy = status == 1 ? true : false
    
                    toastInfo({
                        message: `✅ Cambio de ${status ? '' : 'no'} Academia`
                    })
                }
            })
        },
        deleteUsers() {
            this.busy = true

            const user_login_ids = this.users.filter(user => user.checked).map(user => user.user_login_id)

            this.UserSupport.deleteUsers({ user_login_ids: user_login_ids }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.getUsers()

                    toastInfo({
                        message: `Se han eliminado ${user_login_ids.length} usuarios`,
                    })
                }
            })
        },
        deleteUser(company_id) {
            this.busy = true
            this.UserSupport.deleteUser({ company_id: company_id }, (response) => {
                this.busy = false
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
            this.$refs.pages.getFollowPages(company_id)
            this.$refs.myModal.show(company_id)
        },
        getUsers() {
            this.busy = true
            this.users = []
            this.usersAux = []
            this.UserSupport.getUsers({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.users = response.users
                    this.usersAux = response.users
                }
            })
        },
        getAffiliations() {
            this.busy = true
            this.UserSupport.getAffiliations({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.affiliations = response.affiliations
                }
            })
        }
    },
    mounted() {
        this.getUsers()
        this.getAffiliations()
    },
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col col-xl-auto">
                        <LoaderViewer :busy="busy"/>
                    </div>
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="users" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{users.length}}</span></div>
                        <h6>Asesores</h6>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-users/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir asesor</a></div>
                    </div>
                    <div class="col-auto text-end">
                        <button @click="getUsers" class="btn shadow-none mb-0 btn-success px-3 btn-sm">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                    <div v-if="query" class="col-auto text-end">
                        <button @click="query = ''" class="btn btn-light shadow-none mb-0 px-3 btn-sm">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div v-if="affiliations" class="col-auto text-end">
                        <div class="form-floating">
                            <select class="form-select" v-model="query" aria-label="Selecciona tu tipo de usuario">
                                <option v-for="affiliation in affiliations" v-bind:value="affiliation.name">
                                    {{ affiliation.name }}
                                </option>
                            </select>
                            <label for="floatingInput">Afiliación</label>
                        </div>
                    </div>
                    <div class="col-auto text-end">
                        <div class="form-floating">
                            <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            <label for="floatingInput">Buscar</label>
                        </div>
                    </div>
                    <div v-if="users?.some(user => user.checked)" class="col-auto text-end">
                        <div class="dropdown">
                            <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                            </button>
                            <ul class="dropdown-menu shadow">
                                <li><button class="dropdown-item" @click="deleteUsers">Eliminar todos</button></li>
                            </ul>
                        </div>  
                    </div>
                </div>
            </div>
            
            <div class="card-body">
                <HighLigth :busy="busy" :dataLength="users.length" :query="query"/>

                <div v-if="users.length > 0" class="table-responsive-sm p-0 h-100 border border-light rounded">
                    <table class="table align-items-center table-borderless table-hover table-striped mb-0">
                        <thead>
                            <tr class="text-secondary text-xxs font-weight-bolder opacity-7">
                                <th class="text-uppercase border-end">
                                    <div class="form-check d-flex justify-content-center">
                                        <input v-model="checkAll" class="form-check-input" type="checkbox" id="checkAll">
                                    </div>
                                </th>
                                <th class="text-uppercase">
                                    USUARIO
                                </th>
                                <th class="text-center text-uppercase">Líder</th>
                                <th class="text-center text-uppercase">Afiliación</th>
                                <th class="text-center text-uppercase">Características</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,index) in users" class="text-center text-sm fw-bold text-dark text-uppercase">
                                <td class="border-end">
                                    <div class="form-check d-flex justify-content-center">
                                        <input v-model="user.checked" class="form-check-input" type="checkbox" :id="'user'+index">
                                    </div> 
                                </td>
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
                                <td class="align-middle cursor-pointer text-decoration-underline" @click="query = user.sponsor_name">
                                    <PlaceHolder placeholder="-" :value="user.sponsor_name" type="text" />
                                </td>
                                <td class="align-middle cursor-pointer text-decoration-underline" @click="query = user.affiliation">
                                    <PlaceHolder placeholder="-" :value="user.affiliation" type="text" />
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <IconHolder :value="user.has_academy" icon="bi-laptop" :tooltip="user.has_academy ? 'Tiene la Academia' : 'No tiene la Academia'" />
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
                                            
                                            <li v-if="user.has_academy"><button class="dropdown-item" @click="setAcademyAs(user,0)">Quitar Academia</button></li>
                                            <li v-else><button class="dropdown-item" @click="setAcademyAs(user,1)">Habilitar en Academia</button></li>

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

        <ModalViewer ref="myModal" title="Páginas visitadas" size="modal-fullscreen">
            <FollowpagesViewer ref="pages"/>
        </ModalViewer>
    `,
}

export { AdminusersViewer } 