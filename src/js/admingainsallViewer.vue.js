import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.5'

const AdmingainsallViewer = {
    name : 'admingainsall-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            busy: false,
            commissions: null,
            commissionsAux: null,
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
            STATUS : {
                PENDING: 1,
                DISPERSED: 2,
            },
            columns: { // 0 DESC , 1 ASC 
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                currency: {
                    name: 'currency',
                    desc: false,
                    alphabetically: true,
                },
                title: {
                    name: 'title',
                    desc: false,
                    alphabetically: true,
                },
                amount: {
                    name: 'amount',
                    desc: false,
                },
                status: {
                    name: 'status',
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
            this.commissions.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.commissions = this.commissionsAux
            this.commissions = this.commissions.filter((commission) => {
                return commission.names.toLowerCase().includes(this.query.toLowerCase()) 
                    || commission.amount.toString().includes(this.query) 
                    || commission.currency.toLowerCase().includes(this.query.toLowerCase()) 
                    || commission.title.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        getAdminAllUserGains() {
            this.busy = true

            return new Promise((resolve,reject) => {
                this.UserSupport.getAdminAllUserGains(this.filter, (response) => {
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

            this.commissions.map((user) => {
                this.total.balance += parseFloat(user.balance)

                if(user.profits)
                {
                    this.total.profits += parseFloat(user.profits)
                }
            })
        },
        getAdminAllUserGainsMain() {
            this.getAdminAllUserGains().then((response) => {
                this.commissions = response.commissions
                this.commissionsAux = response.commissions
                this.gainsAux = response.gains

                this.filter.start = response.start
                this.filter.end = response.end

                this.getTotals()
            }).catch(() => this.commissions = false)
        },
    },
    mounted() {
        this.getAdminAllUserGainsMain()
    },
    template : `
        <div class="card mb-3">
            <div class="card-header">  
                <div class="row align-items-center">  
                    <div class="col-12 col-xl fs-4 text-primary fw-sembold">
                        Ganancias generales
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
                    </div>
                </div>
            </div>
        
            <div v-if="commissions" class="">
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
                                    @click="sortData(columns.amount)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.amount.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Monto</u>
                                </th>
                                <th 
                                    @click="sortData(columns.currency)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.currency.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Moneda</u>
                                </th>
                                <th 
                                    @click="sortData(columns.title)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.title.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Motivo</u>
                                </th>
                                <th 
                                    @click="sortData(columns.amount)"
                                    class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                    <span v-if="columns.amount.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Estatus</u>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(commission,index) in commissions" class="align-middle text-center">
                                <td class="">
                                    {{commission.commission_per_user_id}}
                                </td>
                                <td class="text-xs">
                                    {{commission.names}}
                                </td>
                                <td class="text-xs">
                                    $ {{commission.amount.numberFormat(2)}}
                                </td>
                                <td class="text-xs">
                                    {{commission.currency}}
                                </td>
                                <td class="text-xs">
                                    {{commission.title}}
                                </td>
                                <td class="text-xs">
                                    <span v-if="commission.status == STATUS.PENDING" class="text-primary text-xs">
                                        <i class="bi bi-clock-fill"></i> Pendiente de dispersión a ewallet
                                    </span>
                                    <span v-else-if="commission.status == STATUS.DISPERSED" class="text-success text-xs fw-semibold">
                                        <a href="../../apps/ewallet/" class="text-success">
                                            Dispersado a ewallet
                                        </a>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr class="text-center">
                                <td></td>
                                <td>Total</td>
                                <td class="align-middle text-dark">
                                    $ {{total.balance.numberFormat(2)}} 
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div v-else-if="users == false" class="card-body">    
                <div class="alert alert-light fw-sembold text-center mb-0">    
                    No tenemos información con ese filtro
                </div>
            </div>
        </div>
    `,
}

export { AdmingainsallViewer } 