import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.3'

const AdmingainsViewer = {
    name : 'admingains-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            busy: false,
            users: null,
            usersAux: null,
            currentUser: null,
            query: null,
            status : null,
            filter: { 
                start: null,
                end: null,
            },
            total: { 
                balance : 0,
                profits : 0 
            },
            columns: { // 0 DESC , 1 ASC 
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                email: {
                    name: 'email',
                    desc: false,
                    alphabetically: true,
                },
                balance: {
                    name: 'balance',
                    desc: false,
                },
                account: {
                    name: 'account',
                    desc: false,
                },
                profits: {
                    name: 'profits',
                    desc: false,
                },
            },
        }
    },
    watch : {
        query : {
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
            this.users = this.users.filter((user) => {
                return user.names.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        getAdminUserGains() {
            this.busy = true

            return new Promise((resolve,reject) => {
                this.UserSupport.getAdminUserGains(this.filter, (response) => {
                    this.busy = false

                    if (response.s == 1) {
                        resolve(response)
                    }

                    reject()
                })
            })
        },
        getTotals() {
            this.total.profits = 0
            this.total.balance = 0

            this.users.map((user) => {
                this.total.balance += parseFloat(user.balance)

                if(user.profits)
                {
                    this.total.profits += parseFloat(user.profits)
                }
            })
        },
        getAdminUserGainsMain() {
            this.getAdminUserGains().then((response) => {
                this.users = response.users
                this.usersAux = response.users
                this.gainsAux = response.gains

                this.filter.start = response.start
                this.filter.end = response.end

                this.getTotals()
            }).catch(() => this.users = false)
        },
    },
    mounted() {
        this.getAdminUserGainsMain()
    },
    template : `
        <div class="card mb-3">
            <div class="card-header">  
                <div class="row align-items-center">  
                    <div class="col-12 col-xl fs-4 text-primary fw-sembold">
                        Ganancias MAM
                    </div>
                    <div v-if="filter" class="col-12 col-xl text-end">
                        <div class="text-xs text-secondary">Mostrando resultados de</div>
                        <div v-if="filter.start && filter.end">
                            {{filter.start}} - {{filter.end}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <div class="input-group input-group-lg input-group-merge">
                            <input
                                v-model="query"
                                :autofocus="true"
                                @keydown.enter.exact.prevent="search"
                                type="text" class="form-control" placeholder="Buscar usuario por nombre o correo..."/>
                        </div>
                    </div>
                    <div class="col-12 col-xl">
                        <div class="form-floating">
                            <input v-model="filter.start" type="date" class="form-control" id="start" placeholder="name@example.com">
                            <label for="start">Fecha inicio</label>
                        </div>
                    </div>
                    <div class="col-12 col-xl">
                        <div class="form-floating">
                            <input v-model="filter.end" type="date" class="form-control" id="end" placeholder="name@example.com">
                            <label for="end">Fecha fin</label>
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button :disabled="busy" @click="getAdminUserGainsMain" class="btn me-3 shadow-none btn-primary mb-0">
                            <span v-if="busy">
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            </span>
                            <span v-else>
                                Buscar
                            </span>
                        </button>
                    
                        <a href="../../apps/admin-gains/add" class="btn shadow-none btn-success mb-0">Añadir dispersiones</a>
                    </div>
                </div>
            </div>
        
            <div v-if="users" class="">
                <div class="table-responsive">
                    <table class="table align-items-center table-striped table-hover mb-0">
                        <thead>
                            <tr class="text-center text-uppercase">
                                <th>#</th>
                                <th 
                                    @click="sortData(columns.names)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.names.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Usuario</u>
                                </th>
                                <th 
                                    @click="sortData(columns.account)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.account.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Cuenta</u>
                                </th>
                                <th 
                                    @click="sortData(columns.balance)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.balance.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Volumen</u>
                                </th>
                                <th 
                                    @click="sortData(columns.email)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.email.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Correo</u>
                                </th>
                                <th 
                                    @click="sortData(columns.profits)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.profits.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Ganancia</u>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,index) in users" class="align-middle text-center">
                                <td class="">
                                    {{index+1}}
                                </td>
                                <td class="text-xs">
                                    {{user.names}}
                                </td>
                                <td class="text-xs">
                                    {{user.account}}
                                </td>
                                <td class="text-xs">
                                    <span v-if="user.amount">
                                        $ {{user.amount.numberFormat(2)}}
                                    </span>
                                </td>
                                <td class="text-xs">
                                    {{user.email}}
                                </td>
                                <td class="text-dark">
                                    <span v-if="user.profits">
                                        {{user.profits.numberFormat(2)}}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="text-center">
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td class="align-middle text-dark">
                                    $ {{total.balance.numberFormat(2)}} 
                                </td>
                                <td></td>
                                <td class="align-middle text-dark">
                                    $ {{total.profits.numberFormat(2)}} 
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div v-else-if="users == false" class="card-body">    
                <div class="alert alert-light mb-0 fw-sembold text-center">    
                    No tenemos información con ese filtro
                </div>
            </div>
        </div>
    `,
}

export { AdmingainsViewer } 