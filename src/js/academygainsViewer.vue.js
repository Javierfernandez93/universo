import { User } from '../../src/js/user.module.js?v=2.4.6.2'   

const AcademygainsViewer = {
    name : 'academygains-viewer',
    data() {
        return {
            User: new User,
            query: null,
            commissions: null,
            active: null,
            commissionsAux: null,
            STATUS : {
                UNPUBLISHED: 0,
                PUBLISHED: 1
            },
            CATALOG_COMMISSION_TYPE_ID : {
                NETWORK_MARKETING_ACCOUNT : 2,
            },
            STATUS : {
                PENDING: 1,
                DISPERSED: 2,
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
        filterData() {
            this.commissions = this.commissionsAux
            this.commissions = this.commissions.filter((comission) => {
                return comission.names.toLowerCase().includes(this.query.toLowerCase()) 
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
        this.getCommissionPerUserByType(this.CATALOG_COMMISSION_TYPE_ID.NETWORK_MARKETING_ACCOUNT).then((response)=>{
            this.commissions = response.commissions
            this.commissionsAux = response.commissions
            this.active = response.active
        }).catch(() => {
            this.commissions = false
        })
    },
    template : `
        <div v-if="commissions" class="row">
            <div class="card shadow-none bg-transparent mb-3">
                <div class="card-header bg-transparent">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <span class="text-secondary">Total {{commissions.length}}</span>
                            <div class="fs-4 fw-semibold text-primary">Listado de comisiones</div>
                        </div>
                        <div class="col-12 col-xl-4">
                            <input v-model="query" :autofocus="true" type="seach" class="form-control" placeholder="Buscar por usuario o monto"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-none bg-transparent">
                <table class="table table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Monto</th>
                            <th>Moneda</th>
                            <th>Fecha</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="commission in commissions" class="text-center">
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
                <div class="card rounded card-message-main text-center" style="background-image:url(../../src/img/marketing-banner.png)">
                    <div class="card-body card-message d-flex align-items-center rounded text-center">
                        <div class="row w-100 text-center">
                            <div class="col-12">
                                <div class="text-start">
                                    <img src="../../src/img/logo-Site-marketing.png" class="img-fluid mb-3" alt="academy" title="academy"/>
                                    <div class="h4 fw-semibold text-white">
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

export { AcademygainsViewer } 