import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.7'   

const AdminbridgeViewer = {
    name : 'adminbridge-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            busy: null,
            buys: null,
            buysAux: null,
            query: null,
            status: 0,
            CATALOG_BRIDGE_BUY_TYPE :{
                FUNDS:1,
                MAM:2,
            },
            columns: { // 0 DESC , 1 ASC 
                buy_per_user_id : {
                    name: 'buy_per_user_id',
                    desc: false,
                },
                buy_per_bridge_id : {
                    name: 'buy_per_bridge_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                },
                account : {
                    name: 'account',
                    desc: false,
                },
                amountReal : {
                    name: 'amountReal',
                    desc: false,
                },
                amount : {
                    name: 'amount',
                    desc: false
                },
                type : {
                    name: 'type',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            },
            STATUS : {
                PENDING: 0,
                PAYED: 1,
                PROCESSING: 2,
                FINISHED: 3,
            },
            filters: [
                {
                    name: 'Pendientes de validación de pago',
                    status: 0
                },
                {
                    name: 'Pagadas',
                    status: 1
                },
                {
                    name: 'Enviando pago a Exma',
                    status: 2
                },
                {
                    name: 'Completadas',
                    status: 3
                },
            ],
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        },
        status: {
            handler() {
                this.getAllBuyPerBridgeMain()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.buys = this.buysAux
            this.buys = this.buys.filter(buy => {
                return true
            })
        },
        setViewFullFaq(state) 
        {
            this.$emit('toogleviewfullfaq',state)
        },
        toggleMakeTicket(faq) 
        {
            faq.viewFaq = false
            this.$emit('toogleviewfullfaq',false)
            this.$emit('togglemaketicket')
        },
        showFaqId(faq_id) {
            this.setViewFullFaq(true)

            this.faqs.map((faq) => {
                if(faq.faq_id == faq_id) 
                {
                    faq.viewFaq = true
                }
            })
        },
        getAllBuyPerBridge() {
            this.busy = true
            
            return new Promise((resolve,reject) => {
                this.UserSupport.getAllBuyPerBridge({status:this.status}, (response) => {
                    this.busy = false

                    if (response.s == 1) {
                        resolve(response.buys)   
                    }

                    reject()
                })
            })
        },
        setAsSendToBridge(buy) {
            this.busy = true

            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro ingresar como dinero enviado a Exma? (No enviaremos dinero)`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.busy = true
                            this.UserSupport.setAsSendToBridge(buy, (response) => {
                                this.busy = false
                                if (response.s == 1) {
                                    this.getAllBuyPerBridgeMain()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                            this.busy = false
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        sendEmailtToBridge(buy) {
            this.busy = true

            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de enviar el correo a Exma?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.busy = true
                            this.UserSupport.sendEmailtToBridge(buy, (response) => {
                                this.busy = false
                                if (response.s == 1) {
                                    this.getAllBuyPerBridgeMain()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {s
                            this.busy = false
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        sendMoneyToBridge(buy) {
            this.busy = true

            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de envíar el dinero de esta cuenta de (${buy.account}) a Exma?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.busy = true

                            this.UserSupport.sendMoneyToBridge(buy, (response) => {
                                this.busy = false
                                if (response.s == 1) {
                                    this.getAllBuyPerBridgeMain()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                            this.busy = false
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        getRealAmount() {
            this.buys.map((buy) =>{
                if(buy.catalog_bridge_buy_type_id == this.CATALOG_BRIDGE_BUY_TYPE.MAM)
                {
                    buy.amountReal = Math.round(buy.amount - ((4 * buy.amount) / 100))
                } else if(buy.catalog_bridge_buy_type_id == this.CATALOG_BRIDGE_BUY_TYPE.FUNDS) {
                    buy.amountReal = buy.amount - ((16 * buy.amount) / 100)
                } else {
                    buy.amountReal = buy.amount
                }

                return buy
            })
        },
        getAllBuyPerBridgeMain() {
            this.buys = null
            this.buysAux = null
            
            this.getAllBuyPerBridge().then((buys) => {
                this.buys = buys
                this.buysAux = buys

                this.getRealAmount()
            }).catch(() => this.buys = false)
        },
    },
    mounted() {
        this.getAllBuyPerBridgeMain()
    },
    template : `
        <div class="card">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <div class="fs-4 fw-sembold text-primary">Pagos de cuentas Exma</div>
                
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div class="row">
                            <div class="col">
                                <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..." />
                            </div>
                            <div class="col-auto">
                                <select class="form-control" v-model="status">
                                    <option v-for="filter in filters" v-bind:value="filter.status">{{filter.name}}</option>
                                </select>
                            </div>
                            <div v-if="busy" class="col-auto">
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="buys" class="table-responsive p-0">
                    <table class="table table-striped table-hover align-items-center mb-0">
                        <thead>
                            <tr class="text-center">
                                <th @click="sortData(columns.buy_per_bridge_id)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.buy_per_bridge_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">#</u>
                                </th>
                                <th @click="sortData(columns.buy_per_user_id)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.buy_per_user_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">#Compra</u>
                                </th>
                                <th @click="sortData(columns.names)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.names.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Nombre</u>
                                </th>
                                <th @click="sortData(columns.account)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.account.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Cuenta</u>
                                </th>
                                <th @click="sortData(columns.amount)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.amount.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Monto</u>
                                </th>
                                <th @click="sortData(columns.amountReal)" class="c-pointer d-none text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.amountReal.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Monto a enviar a Exma</u>
                                </th>
                                <th @click="sortData(columns.type)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.type.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Tipo</u>
                                </th>
                                <th @click="sortData(columns.create_date)" class="c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.create_date.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Fecha de creación</u>
                                </th>
                                <th v-if="status == STATUS.FINISHED">Email</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                            </tr>
                        </thead>
                        <tbody class="text-center align-middle">
                            <tr v-for="buy in buys" class="align-middle text-center text-xs">
                                <td>
                                    {{buy.buy_per_bridge_id}}
                                </td>
                                <td>
                                    {{buy.buy_per_user_id}}
                                </td>
                                <td>
                                    {{buy.names}}
                                </td>
                                <td>
                                    {{buy.account}}
                                </td>
                                <td>
                                    <span v-if="buy.amount">
                                        $ {{buy.amount.numberFormat(2)}}
                                    </span>
                                </td>
                                <td class="d-none">
                                    <span v-if="buy.amountReal">
                                        $ {{buy.amountReal.numberFormat(2)}}
                                    </span>
                                </td>

                                <td>
                                    {{buy.type}}
                                </td>
                                <td>
                                    {{buy.create_date.formatFullDate()}}
                                </td>
                                <td v-if="status == STATUS.FINISHED">
                                    <span v-if="buy.mail_send" class="badge bg-success">
                                        Enviado
                                    </span>
                                    <span v-else class="badge bg-secondary">
                                        No enviado
                                    </span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button class="btn btn-outline-primary mb-0 btn-sm px-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        </button>

                                        <ul class="dropdown-menu shadow">
                                            <li v-if="buy.status == STATUS.PAYED"><button class="dropdown-item" @click="setAsSendToBridge(buy)">Ingresar como enviado a Exma</button></li>
                                            <li v-if="buy.status == STATUS.PAYED"><button class="dropdown-item" @click="sendMoneyToBridge(buy)">Enviar dinero a Exma</button></li>
                                            <li v-if="buy.status == STATUS.FINISHED"><button class="dropdown-item" @click="sendEmailtToBridge(buy)">
                                                <span v-text="buy.mail_send ? 'Reenviar correo': 'Enviar correo'">
                                                </span>
                                            </button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="card-body">
                    <div class="alert alert-light mb-0 fw-semibold text-center">
                        <strong>Aviso</strong>
                        <div>No tenemos cuentas con ese filtro</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminbridgeViewer } 