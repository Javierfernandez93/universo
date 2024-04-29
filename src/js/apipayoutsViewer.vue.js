import { User } from '../../src/js/user.module.js?v=1.0.3'   

const ApipayoutsViewer = {
    name : 'apipayouts-viewer',
    data() {
        return {
            User: new User,
            user_api_id: null,
            customer: null,
            payouts: null,
            payoutsAux: null,
            status: null,
            query: null,
            STATUS: {
                DELETED: {
                    code: -1,
                    text: 'Eliminadas'
                },
                PENDING: {
                    code: 0,
                    text: 'Pendiente'
                },
                PAYED: {
                    code: 1,
                    text: 'Pagada'
                },
                EXPIRED: {
                    code: 2,
                    text: 'Expirada'
                },
            }
        }
    },
    watch: {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        },
        status: {
            handler() {
                this.filterDataByStatus()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.payouts = this.payoutsAux
            this.payouts = this.payouts.filter((licence) => {
                return licence.code.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        goToPaymentLink(payment) {
            window.location.href = payment.checkout_url
        },
        cancelPayout(payment) {
            const alert = alertCtrl.create({
                title: "Payout",
                subTitle: `<p>Are you sure to delete <strong>${payment.payout_id}</strong> payout?</p>`,
                buttons: [
                    {
                        text: "Yes, delete",
                        role: "cancel",
                        class: 'btn-success',
                        handler: (data) => {
                            this.User.cancelPayout({ user_api_id: this.user_api_id, payout_id: payment.payout_id }, (response) => {
                                if(response.s == 1)
                                {
                                    payment.status = response.status
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        viewPaymentQr(payment) {
            const alert = alertCtrl.create({
                title: "Qr de pago",
                modalTitleClass: "text-white",
                html: `
                    <div class="card">
                        <div class="card-body">
                            <img src="${payment.checkout_url.getQrCode()}" class="w-100" title="payment-link" alt="payment-link"/>
                        </div>
                        <div class="card-footer">
                            <div class="d-grid">
                                <a href="${payment.checkout_url.getQrCode()}" download="pago-${payment.unique_id}" class="btn shadow-none mb-0 btn-light">Descargar QR</a>
                            </div>
                        </div>
                    </div>
                `,
                bgColor: 'bg-dark text-white',
                size: `model-md`,
            })

            alertCtrl.present(alert.modal); 
        },
        createPayout() {
            const alert = alertCtrl.create({
                title: "Add payout",
                subTitle: `<div class="mb-3 text-center"></div>`,
                size: `model-md`,
                inputs: [
                    {
                        type : 'number',
                        id : 'amount',
                        name : 'amount',
                        label : 'USDT',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'payout_id',
                        name : 'payout_id',
                        label : 'Payout ID',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'whatsapp',
                        name : 'whatsapp',
                        label : "Customer's WhatsApp (full)",
                        label : "Customer's WhatsApp (full)",
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'email',
                        name : 'email',
                        label : 'E-mail',
                        label : 'E-mail',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'name',
                        name : 'name',
                        label : "Customer's name",
                        label : "Customer's name",
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'address',
                        name : 'address',
                        label : 'USDT TRC.20 address',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'comment',
                        name : 'comment',
                        label : 'Additional comment',
                        placeholder : 'Write...',
                    }
                ],
                buttons: [
                    {
                        text: "Add Payout",
                        class: 'btn-primary',
                        role: "cancel",
                        handler: (data) => {
                            this.User.createPayout({ email: data.email, whatsapp : data.whatsapp, name : data.name, amount: data.amount, payout_id: data.payout_id, user_api_id : this.user_api_id, address : data.address, comment:data.comment }, (response) => {
                                if(response.s == 1)
                                {
                                    this._getUserApiPayouts()
                                } else if(response.r = 'INVALID_WALLET_ADDRESS') {
                                    alertInfo({
                                        icon:'<i class="bi bi-x fs-3"></i>',
                                        message: `<div class="text-white">Invalid wallet address <strong>${data.address}</strong></div>`,
                                        _class:'bg-gradient-warning text-white'
                                    })
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        _getUserApiPayouts() {
            this.getUserApiPayouts().then((payouts)=>{
                this.payouts = payouts
                this.payoutsAux = payouts
            }).catch(() => this.payouts = false)
        },
        getUserApiPayouts() {
            return new Promise((resolve,reject)=> {
                const customer_id = this.customer != null ? this.customer.customer_id : null

                this.User.getUserApiPayouts({user_api_id:this.user_api_id,customer_id:customer_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.payouts)
                    }

                    reject()
                })

            })
        },
        getCustomer(user_api_id) {
            return new Promise((resolve,reject)=> {
                if(getParam('cid'))
                {
                    this.User.getCustomer({user_api_id:user_api_id,customer_id:getParam('cid')}, (response) => {
                        
                        if (response.s == 1) {
                            resolve(response.customer)
                        }
                    })
                } else {
                    resolve(null)
                }
            })
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this.getCustomer(this.user_api_id).then((customer) => {
                this.customer = customer
                
                this._getUserApiPayouts()
            })
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="payouts" class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12 col-md col-xl text-primary fs-4">
                            <div class="text-xs">total {{payouts.length}}</div>
                            <div class="fw-sembold">
                                Payouts list
                                <span v-if="customer">from {{customer.name}}</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-auto col-xl-auto">
                            <button @click="createPayout" class="btn btn-primary mb-0 shadow-none"> 
                                <i class="bi bi-plus-circle me-1"></i>
                                Add payout
                            </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsives">
                    <table class="table align-middle text-center">
                        <thead>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">PayoutId</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Created</th>
                            <th scope="col">Wallet</th>
                            <th scope="col">Scan</th>
                            <th scope="col"></th>
                        </thead>
                        <tbody>
                            <tr v-for="payment in payouts">
                                <td class="text-dark fw-sembold">$ {{payment.amount.numberFormat(2)}}</td>
                                <td class="text-xs text-secondary">USDT.TRC20</td>
                                <td>
                                    <span v-if="payment.status == STATUS.PENDING.code" class="badge bg-secondary">Pending</span>
                                    <span v-else-if="payment.status == STATUS.PAYED.code" class="badge bg-success">Paid</span>
                                    <span v-else-if="payment.status == STATUS.DELETED.code" class="badge bg-danger">Cancelled</span>
                                </td>
                                <td class="text-xs">
                                    <span class="text-break">
                                        {{payment.unique_id}}
                                    </span>
                                </td>
                                <td class="text-xs">
                                    <div v-if="payment.customer">
                                        <div class="text-break">{{payment.customer.name}}</div>
                                        <div>{{payment.customer.whatsapp}}</div>
                                    </div>
                                    <div v-else>
                                        No customer data
                                    </div>
                                </td>
                                <td class="text-xs">
                                    <span class="text-break">
                                        {{payment.create_date.formatFullDate()}}
                                    </span>
                                </td>
                                <td class="text-xs">
                                    <span class="text-break">
                                        {{payment.address}}
                                    </span>
                                </td>
                                <td class="text-xs">
                                    <div v-if="payment.scanUrl">
                                        <a :href="payment.scanUrl" class="btn btn-primary btn-sm px-3 mb-0 shadow-none" target="_blank">Open</a>
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </td>
                                <td>
                                    <div class="dropdown dropstart">
                                        <button type="button" class="btn mb-0 btn-outline-primary px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <div v-if="payment.status == STATUS.PENDING.code">
                                                <li><button class="dropdown-item d-none" @click="resendEmail(payment)">Reenviar correo</button></li>
                                                <li><button class="dropdown-item" @click="cancelPayout(payment)">Cancel</button></li>
                                            </div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else-if="payouts == false" class="card">
                <div class="card-body d-flex justify-content-center py-5">
                    <button @click="createPayout" class="btn btn-primary mb-0 shadow-none btn"> 
                        <i class="bi bi-plus-circle me-1"></i>
                        Add payout
                    </button>
                </div>
            </div>
        </div>
    `,
}

export { ApipayoutsViewer } 