import { User } from '../../src/js/user.module.js?v=2.5.0'   

const BridgefundsgainsViewer = {
    name : 'bridgefundsgains-viewer',
    data() {
        return {
            User: new User,
            query: null,
            active: null,
            commissions: null,
            commissionsAux: null,
            STATUS : {
                UNPUBLISHED: 0,
                PUBLISHED: 1
            },
            CATALOG_COMMISSION_TYPE_ID : {
                NETWORK_FUND_ACCOUNT : 1,
                NETWORK_MARKETING_ACCOUNT : 2,
            },
            STATUS : {
                PENDING: 1,
                DISPERSED: 2,
            },
            columns: { // 0 DESC , 1 ASC 
                user_login_id_from: {
                    name: 'user_login_id_from',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                currency: {
                    name: 'currency',
                    desc: false,
                },
                amount: {
                    name: 'amount',
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
            this.commissions = this.commissions.filter((comission) => {
                return comission.names.toLowerCase().includes(this.query.toLowerCase()) 
                    || comission.user_login_id_from.toString().includes(this.query) 
                    || comission.amount.toString().includes(this.query) 
            })
        },
        getCommissionPerUserByType(catalog_commission_type_id) {
            return new Promise((resolve, reject) => {
                this.User.getCommissionPerUserByType({catalog_commission_type_id:catalog_commission_type_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response)
                    }

                    reject()
                })
            })
        },
    },
    mounted() {
        this.getCommissionPerUserByType(this.CATALOG_COMMISSION_TYPE_ID.NETWORK_FUND_ACCOUNT).then((response)=>{
            this.commissions = response.commissions
            this.commissionsAux = response.commissions
            this.active = response.active
        }).catch(() => {
            this.commissions = false
        })
    },
    template : `
        <div v-if="commissions" class="row">
            <div class="card bg-transparent shadow-none mb-3">
                <div class="card-header bg-transparent">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <span class="text-secondary">Total {{commissions.length}}</span>
                            <div class="fs-4 fw-semibold text-primary">Listado de comisiones</div>
                        </div>
                        <div class="col-12 col-xl-6">
                            <input v-model="query" :autofocus="true" type="seach" class="form-control" placeholder="Buscar comisión por nombre, id o monto"/>
                        </div>
                    </div>
                </div>
                
                <table class="table table-borderless table-hover">
                    <thead>
                        <tr class="text-center">
                            <th 
                                @click="sortData(columns.user_login_id_from)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.user_login_id_from.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">ID</u>
                            </th>
                            <th 
                                @click="sortData(columns.names)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.names.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Nombre</u>
                            </th>
                            <th 
                                @click="sortData(columns.amount)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
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
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.currency.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Moneda</u>
                            </th>
                            <th 
                                @click="sortData(columns.create_date)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.create_date.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Fecha</u>
                            </th>
                            <th>Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="commission in commissions" class="text-center text-xs">
                            <td>{{commission.user_login_id_from}}</td>
                            <td>{{commission.names}}</td>
                            <td class="fw-semibold text-dark">$ {{commission.amount.numberFormat(2)}}</td>
                            <td>{{commission.currency}}</td>
                            <td>{{commission.create_date.formatFullDate()}}</td>
                            <td>
                                <span v-if="commission.status == STATUS.PENDING" class="text-primary text-xs">
                                    <span v-if="active == true">
                                        <i class="bi bi-clock-fill"></i> Pendiente de dispersión a ewallet
                                    </span>
                                    <span v-else-if="active == false">
                                        <i class="bi bi-info-circle-fill"></i> Activate para ganar esta comisión
                                    </span>
                                </span>
                                <span v-else-if="commission.status == STATUS.DISPERSED" class="text-success text-xs fw-semibold">
                                    <a href="../../apps/ewallet/" class="text-success">
                                        Dispersado a ewallet
                                    </a>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="commissions == false" class="row justify-content-center">
            <div class="col-11 col-xl-4">
                <div class="card rounded card-message-main text-center" style="background-image:url(../../src/img/bf-banner.png)">
                    <div class="card-body card-message d-flex align-items-center rounded text-center">
                        <div class="row w-100 text-center">
                            <div class="col-12">
                                <div class="text-start">
                                    <img src="../../src/img/brigde-funds.png" class="img-fluid mb-3" alt="bridge-funds" title="bridge-funds"/>
                                    <div class="h4 fw-semibold text-dark">
                                        Genera comisiones hoy mismo
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { BridgefundsgainsViewer } 