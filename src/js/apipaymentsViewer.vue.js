import { User } from '../../src/js/user.module.js?v=2.2.1'   

const ApipaymentsViewer = {
    name : 'apipayments-viewer',
    data() {
        return {
            User: new User,
            user_api_id: null,
            customer: null,
            payments: false,
            paymentsAux: false,
            status: null,
            query: null,
            STATUS: {
                DELETED: {
                    code: -1,
                    text: 'Eliminadas'
                },
                UNAVIABLE: {
                    code: 0,
                    text: 'No disponibes'
                },
                PENDING: {
                    code: 1,
                    text: 'Pendiente'
                },
                PAYED: {
                    code: 2,
                    text: 'Pagada'
                },
                EXPIRED: {
                    code: 3,
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
            this.payments = this.paymentsAux
            this.payments = this.payments.filter((licence) => {
                return licence.code.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        goToPaymentLink(payment) {
            if(payment.short)
            {
                window.location.href = payment.short.url
            } else {
                window.location.href = payment.checkout_url
            }
        },
        cancelInvoice(payment) {
            const alert = alertCtrl.create({
                title: "Alert",
                subTitle: `<p>Are you sure to cancel <strong>${payment.invoice_id}</strong></p>?`,
                buttons: [
                    {
                        text: "Yes, cancel",
                        role: "cancel",
                        class: 'btn-success',
                        handler: (data) => {
                            this.User.cancelInvoice({ user_api_id: this.user_api_id, invoice_id: payment.invoice_id }, (response) => {
                                if(response.s == 1)
                                {
                                    payment.status = response.status
                                }
                            })
                        },
                    },
                    {
                        text: "No",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        aceptPartialFounds(payment) {
            const alert = alertCtrl.create({
                title: "Alert",
                subTitle: `<p>Are you sure to acept partial founds from <strong>${payment.invoice_id}</strong></p>?`,
                buttons: [
                    {
                        text: "Yes, accept",
                        role: "cancel",
                        class: 'btn-success',
                        handler: (data) => {
                            this.User.aceptPartialFounds({ user_api_id: this.user_api_id, invoice_id: payment.invoice_id }, (response) => {
                                if(response.s == 1)
                                {
                                    payment.status = response.status
                                }
                            })
                        },
                    },
                    {
                        text: "No",
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
                                <a href="${payment.checkout_url.getQrCode()}" download="factura-${payment.invoice_tx}" class="btn shadow-none mb-0 btn-light">Descargar QR</a>
                            </div>
                        </div>
                    </div>
                `,
                bgColor: 'bg-dark text-white',
                size: `model-md`,
            })

            alertCtrl.present(alert.modal); 
        },
        resendPaymentGatewayWhatsApp(payment) {
            const url = payment.short != undefined ? payment.short.url : payment.checkout_url

            this.User.resendPaymentGatewayWhatsApp({ name: payment.customer.name, whatsApp: payment.customer.whatsapp, amount: payment.amount, invoice_id: payment.invoice_id, url:url }, (response) => {
                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: `Hemos envíado un WhatAapp, a <strong>${payment.customer.whatsapp}</strong> con el requerimiento de pago`,
                        _class:'bg-gradient-success text-white'
                    })
                } else {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: `Error al procesar la petición`,
                        _class:'bg-gradient-danger text-white'
                    })
                }
            })
        },
        createInvoice() {
            const alert = alertCtrl.create({
                title: "New Invoice",
                subTitle: `<div class="mb-3 text-center">Fill all fields</div>`,
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
                        id : 'invoice_id',
                        name : 'invoice_id',
                        label : 'Invoice ID',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'whatsapp',
                        name : 'whatsapp',
                        label : "Customer's WhatsApp (full)",
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'email',
                        name : 'email',
                        label : 'E-mail',
                        placeholder : 'Write...',
                    },
                    {
                        type : 'text',
                        id : 'name',
                        name : 'name',
                        label : "Customer's name",
                        placeholder : 'Write...',
                    }
                ],
                buttons: [
                    {
                        text: "Add invoice",
                        class: 'btn-primary',
                        role: "cancel",
                        handler: (data) => {
                            this.User.createInvoice({ email: data.email, amount: data.amount, invoice_id: data.invoice_id, user_api_id : this.user_api_id, whatsapp : data.whatsapp, name : data.name }, (response) => {
                                if(response.s == 1)
                                {
                                    this._getUserApiPayments()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        _getUserApiPayments() {
            const customer_id = this.customer != null ? this.customer.customer_id : null
            
            this.getUserApiPayments({user_api_id:this.user_api_id,customer_id:customer_id}).then((payments)=>{
                this.payments = payments
                this.paymentsAux = payments
            }).catch(() => this.payments = false)
        },
        getUserApiPayments(data) {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiPayments(data, (response) => {
                    if (response.s == 1) {
                        resolve(response.payments)
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
                
                this._getUserApiPayments()
            })
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="payments" class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12 col-md col-xl fs-4 fw-sembold text-primary">
                            Payments list
                            <span v-if="customer">from {{customer.name}}</span>
                        </div>
                        <div class="col-12 col-md-auto col-xl-auto">
                            <button @click="createInvoice" class="btn btn-primary mb-0 shadow-none"> 
                                <i class="bi bi-plus-circle me-1"></i>
                                Add invoice
                            </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsives">
                    <table class="table align-middle text-center">
                        <thead>
                            <th scope="col">Amount</th>
                            <th scope="col">Paid</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Invoice</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Created</th>
                            <th scope="col">Wallet</th>
                            <th scope="col"></th>
                        </thead>
                        <tbody>
                            <tr v-for="payment in payments">
                                <td class="text-dark fw-sembold">
                                    $ {{payment.amount.numberFormat(2)}}
                                </td>
                                <td class="text-dark fw-sembold">
                                    $ {{payment.amount_paid.numberFormat(2)}}
                                </td>
                                <td class="text-xs text-secondary">
                                    <div>USDT</div>
                                    <div>TRC20</div>
                                </td>
                                <td>
                                    <span v-if="payment.status == STATUS.PENDING.code" class="badge bg-secondary">Pending</span>
                                    <span v-else-if="payment.status == STATUS.PAYED.code" class="badge bg-success">Paid</span>
                                    <span v-else-if="payment.status == STATUS.DELETED.code" class="badge bg-danger">Expired</span>
                                </td>
                                <td class="text-xs">
                                    <span class="text-truncate">
                                        {{payment.invoice_id}}
                                    </span>
                                    <div>
                                        <span class="text-break">
                                            {{payment.invoice_tx}}
                                        </span>
                                    </div>
                                </td>
                                <td class="text-xs">
                                    <div v-if="payment.customer">
                                        <span class="text-break">
                                            {{payment.customer.name}}
                                        </span>
                                        <div>{{payment.customer.whatsapp}}</div>
                                    </div>
                                    <div v-else>
                                        No customer data
                                    </div>
                                </td>
                                <td class="text-sm">{{payment.create_date.formatFullDate()}}</td>
                                <td class="text-xs">
                                    <span class="text-break">
                                        {{payment.address}}
                                    </span>
                                </td>
                                <td>
                                    <div class="dropdown dropstart">
                                        <button type="button" class="btn mb-0 btn-outline-primary px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <div v-if="payment.status == STATUS.PENDING.code">
                                                <div v-if="payment.customer">
                                                    <li v-if="payment.customer.whatsapp"><button class="dropdown-item" @click="resendPaymentGatewayWhatsApp(payment)">Resend WhatsApp</button></li>
                                                </div>
                                                
                                                <li v-if="payment.short"><button class="dropdown-item" @click="copy(payment.short.url)">Copy invoice's link</button></li>
                                                <li v-else><button class="dropdown-item" @click="copy(payment.checkout_url)">Copy invoice's link</button></li>

                                                <li><button class="dropdown-item" @click="goToPaymentLink(payment)">Open invoice's link</button></li>
                                                <li><button class="dropdown-item" @click="viewPaymentQr(payment)">Open invoice's qr</button></li>
                                                <li><button class="dropdown-item" @click="cancelInvoice(payment)">Cancel</button></li>
                                                <li v-if="payment.amount_paid > 0"><button class="dropdown-item" @click="aceptPartialFounds(payment)">Acept partial founds</button></li>
                                            </div>
                                            <div v-if="payment.status == STATUS.PAYED.code">
                                                <li v-if="payment.scanUrl"><a :href="payment.scanUrl" class="dropdown-item">Scan</a></li>
                                            </div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else-if="payments == false" class="card">
                <div class="card-body d-flex justify-content-center py-5">
                    <button @click="createInvoice" class="btn btn-primary mb-0 shadow-none btn"> 
                        <i class="bi bi-plus-circle me-1"></i>
                        Add invoice
                    </button>
                </div>
            </div>
        </div>
    `,
}

export { ApipaymentsViewer } 