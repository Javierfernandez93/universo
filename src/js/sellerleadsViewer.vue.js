import { User } from '../../src/js/user.module.js?v=1.1.8'   

const SellerleadsViewer = {
    emits : ['add','edit'],
    data() {
        return {
            User: new User,
            users: null,
            usersAux: null,
            catalog_tags: null,
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
            this.busy = true
            this.User.deleteUserBySeller({ company_id: company_id }, (response) => {
                this.busy = false
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
        setAsUserKind(company_id,catalog_user_type_id) {
            this.User.setAsUserKind({ company_id: company_id, catalog_user_type_id:catalog_user_type_id }, (response) => {
                if (response.s == 1) {
                    this.users = this.users.filter(user => user.user_login_id != company_id)
                    this.usersAux = this.users

                    toastInfo({
                        message: 'Se ha cambiado el tipo de usuario',
                    })
                }
            })
        },
        getSellerClients() {
            this.busy = true
            this.users = null
            this.usersAux = null

            this.User.getSellerClients({catalog_user_type_id:2}, (response) => {
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
        getCatalogTags() {
            this.busy = true
            this.User.getCatalogTags({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalog_tags = response.catalog_tags
                }
            })
        },
        addTagToUser(user,catalog_tag) {
            this.User.addTagToUser({user_login_id:user.user_login_id,catalog_tag_id:catalog_tag.catalog_tag_id}, (response) => {
                if (response.s == 1) {

                    toastInfo({
                        message: 'Se ha añadido el tag al prospecto',
                    })

                    this.getSellerClients()
                }
            })
        },
        deleteUserTag(tag) {
            this.User.deleteUserTag({tag_per_user_id:tag.tag_per_user_id}, (response) => {
                if (response.s == 1) {

                    toastInfo({
                        message: 'Se ha eliminado el tag al prospecto',
                    })

                    this.getSellerClients()
                }
            })
        },
    },
    mounted() {
        this.getCatalogTags()
        this.getSellerClients()
    },
    /* html */
    template : `
        <div v-if="busy" class="d-flex justify-content-center align-items-center py-5">
            <div class="spinner-border " role="status">
            </div>
        </div>

        <div class="card shadow-none card-body bg-transparent mb-3">
            <div class="row align-items-center">
                <div class="col">
                    <div v-if="users"><span class="text-secondary text-xxs">Total {{users.length}}</span></div>
                    <h3 class="text-dark">Prospectos</h3>
                </div>
                <div class="col-auto text-end">
                    <button @click="addClient" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">
                        <i class="bi bi-plus button-icon"></i>
                        Añadir prospecto
                    </button>
                </div>
            </div>
        </div>

        <div class="card card-body mb-3"> 
            <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
        </div>

        <div class="card">
            <div v-if="users" class="table-responsive-sm">
                <table class="table table-borderless align-items-center mb-0">
                    <thead>
                        <tr class="align-items-center">
                            <th class="text-dark text-uppercase font-weight-bolder">
                                USUARIO
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Tipo
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Fecha ingreso
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td class="cursor-pointer">
                                <div class="d-flex px-2 py-1">
                                    <div>
                                        <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="user1">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <div v-if="user.tags">
                                            <span v-for="tag in user.tags" :style="{'--color':tag.color}" @click="deleteUserTag(tag)" class="tag position-relative me-2 pe-4 py-1 rounded-pill text-xs">
                                                <span class="tag-dot position-absolute start-0" :style="{'background-color':tag.color}"></span>

                                                <span class="text-dark">
                                                    {{tag.tag}}
                                                </span>

                                                <button class="btn btn-delete btn-danger position-absolute end-0 top-0 mt-1 me-1">x</button>
                                            </span>
                                        </div>
                                        <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                        <p class="text-xs text-secondary mb-0">{{user.email}}</p>

                                        <div v-if="user.view_tags" class="mt-3 pt-3 border-top">
                                            <div class="text-xs mb-2 text-secondary d-none">Añade un tag:</div>
                                            <div v-if="catalog_tags">
                                                <span v-for="catalog_tag in catalog_tags">
                                                    <button class="btn btn-sm btn-light px-2 mb-0 me-2 shadow-none" @click="addTagToUser(user,catalog_tag)">Añadir tag {{catalog_tag.tag}}</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge bg-primary-light text-primary">Prospecto</span>
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
                                        <li><button class="dropdown-item" @click="setAsUserKind(user.user_login_id,3)">Cambiar a cliente</button></li>
                                        <li><button class="dropdown-item" @click="deleteUserBySeller(user.user_login_id)">Eliminar</button></li>
                                        <li v-if="user.view_tags"><button class="dropdown-item" @click="user.view_tags = false">Ocultar tags</button></li>
                                        <li v-else><button class="dropdown-item" @click="user.view_tags = true">Ver tags</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="users == false" class="alert alert-light text-center mb-0">
                <div>No tienes prospectos aún. Añade uno dando clic en "Añadir prospecto"</div>
            </div>
        </div>
    `
}

export { SellerleadsViewer }