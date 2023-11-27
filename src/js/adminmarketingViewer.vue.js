import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.4'

const AdminmarketingViewer = {
    name : 'adminmarketing-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            users: null,
            usersAux: null,
            query: null,
            UserType: {
                FREE : {
                    text : 'Free',
                    status : 0,
                    _class : 'bg-secondary'
                },
                DEMO : {
                    text : 'Demo',
                    status : 1,
                    _class : 'bg-primary'
                },
                TRADER : {
                    text : 'Trader',
                    status : 2,
                    _class : 'bg-success'
                }
            },
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                licences: {
                    name: 'licences',
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
        goToViewMarketingData(company_id) {
            window.location.href = `../../apps/admin-marketing/view.php?cid=${company_id}`
        },
        filterData() {
            this.users = this.usersAux
            this.users = this.users.filter(user =>  user.names.toLowerCase().includes(this.query.toLowerCase()) || user.email.toLowerCase().includes(this.query.toLowerCase()) || user.company_id.toString().includes(this.query.toLowerCase()))
        },
        getAllAdminMarketing() {
            return new Promise((resolve,reject) => {
                this.UserSupport.getAllAdminMarketing({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.users)
                    }

                    reject()
                })
            })
        },
    },
    mounted() {
        this.getAllAdminMarketing().then((users) => {
            this.usersAux = users
            this.users = users
        }).catch((err) => {
            this.users = false
            this.usersAux = false
        })
    },
    template : `
        <div class="card border-radius-2xl mb-4">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="users"><span class="badge p-0 text-secondary text-xxs">Total {{users.length}}</span></div>
                        <div>Usuarios</div>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-users/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir usuario</a></div>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
            </div>
            <div
                v-if="users" 
                class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th @click="sortData(columns.company_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.company_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">ID</u>
                                </th>
                                <th 
                                    @click="sortData(columns.names)"
                                    class="text-start c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.names.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Usuario</u>
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td class="align-middle text-center text-sm">
                                    {{user.company_id}}
                                </td>
                                <td class="">
                                    <div class="fw-semibold text-dark">
                                        {{user.names}}
                                    </div>
                                    <div class="text-xs">{{user.email}}</div>
                                </td>
                                <td class="text-center">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-outline-primary px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToViewMarketingData(user.company_id)">Ver diseños</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else-if="users == false"
                class="card-body">
                <div class="alert alert-secondary text-white text-center">
                    <div>No tenemos usuarios aún</div>
                </div>
            </div>
        </div>
    `,
}

export { AdminmarketingViewer } 