import { User } from '../../src/js/user.module.js?v=2.3.4'   

const GainsViewer = {
    name : 'gains-viewer',
    data() {
        return {
            User: new User,
            commissionsAux: null,
            commissions: null,
            catalog_commission_type_id: null,
            catalog_commission_types: null,
            totals: {
                amount: 0
            },
            columns: { // 0 DESC , 1 ASC 
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                title: {
                    name: 'title',
                    desc: false,
                    alphabetically: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: false,
                },
                amount: {
                    name: 'amount',
                    desc: true,
                },
                week: {
                    name: 'week',
                    desc: true,
                    alphabetically: false,
                },
            },
            STATUS: {
                PENDING: 0,
                DEPOSITED: 1,
            },
        }
    },
    watch: {
        catalog_commission_type_id : {
            handler() {
                this.getCommissionsPerUserMaster()
            },
            deep : true
        }
    },
    methods: {
        sortData(column) {
            this.commissions.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            });

            column.desc = !column.desc
        },
        calculateTotals() {
            if(this.commissions.length > 0)
            {
                this.commissions.map((commission) => {
                    this.totals.amount += commission.amount ? parseFloat(commission.amount) : 0;
                })
            }
        },
        getCommissionsPerUserMaster() {
            this.commissions = null
            this.totals = {
                amount: 0
            }
            this.commissionsAux = null
            this.getCommissionsPerUser().then((commissions) => {
                this.commissions = commissions
                this.commissionsAux = commissions
                
                this.calculateTotals()
            }).catch(() => this.commissions = false)
        },
        getCommissionsPerUser() {
            return new Promise((resolve,reject) => {
                this.User.getCommissionsPerUser({catalog_commission_type_id:this.catalog_commission_type_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.commissions)   
                    }
                    reject()
                })
            })
        },
        getCatalogCommissionTypes() {
            return new Promise((resolve,reject) => {
                this.User.getCatalogCommissionTypes({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.catalog_commission_types)   
                    }
                    reject()
                })
            })
        },
    },
    mounted() {
        this.catalog_commission_type_id = 1

        this.getCatalogCommissionTypes().then((catalog_commission_types) => {
            this.catalog_commission_types = catalog_commission_types
        })
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row mb-3 align-items-center">
                            <div class="col">
                                <div class="col-auto"><span class="badge bg-primary">Total {{commissions.length}}</span></div>
                                <h4>Ganancias</h4>
                            </div>
                            <div class="col">
                                <div class="form-floating">
                                    <select class="form-select" v-model="catalog_commission_type_id" id="catalog_commission_type_id" aria-label="Comisión">
                                        <option>Tipo de comisión</option>
                                        <option v-for="catalog_commission_type in catalog_commission_types" v-bind:value="catalog_commission_type.catalog_commission_type_id">
                                            {{ catalog_commission_type.title }}
                                        </option>
                                    </select>
                                    <label for="country_id">Tipo de comisión</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="commissions" class="card mb-4 overflow-hidden border-radius-xl">
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="text-center">
                                        <th @click="sortData(columns.title)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Tipo de ganancia</u>
                                        </th>
                                        <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Por</u>
                                        </th>
                                        <th @click="sortData(columns.create_date)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha</u>
                                        </th>
                                        <th @click="sortData(columns.amount)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.amount.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Monto</u>
                                        </th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="commission in commissions" class="text-center">
                                        <td>
                                            <p class="text-secondary mb-0">{{commission.title}}</p>
                                        </td>
                                        <td>
                                            <p class="text-secondary mb-0">{{commission.names}}</p>
                                        </td>
                                        <td>
                                            <p class="text-secondary mb-0">{{commission.create_date.formatDate()}}</p>
                                        </td>
                                        <td>
                                            <p class="fw-semibold">
                                                $ {{commission.amount.numberFormat(2)}} {{commission.currency}}
                                            </p>
                                        </td>
                                        <td>
                                            <span v-if="commission.status == STATUS.PENDING" class="badge bg-warning">
                                                Pendiente de dispersar
                                            </span>
                                            <span v-if="commission.status == STATUS.DEPOSITED" class="badge bg-success">
                                                Enviada a cartera electrónica 
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="text-center">
                                        <td></td>
                                        <td></td>
                                        <td>Total</td>
                                        <td><p class="fw-semibold">$ {{totals.amount.numberFormat(2)}}</p></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div v-else-if="gains == false">
                    <div class="alert alert-light text-center">
                        <div>No tenemos información sobre tus ganancias.</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { GainsViewer } 