import { User } from '../../src/js/user.module.js?v=2.4.8'   
import { Translator } from '../../src/js/translator.module.js?v=2.4.8'   

const ApicustomersViewer = {
    name : 'apicustomers-viewer',
    data() {
        return {
            Translator: new Translator,
            User: new User,
            user_api_id: null,
            customers: null,
            customersAux: null,
            status: -1,
            query: null,
            STATUS: {
                ALL: {
                    code: -1,
                    text: 'All'
                },
                CUSTOMER: {
                    code: 0,
                    text: 'Customers'
                },
                RESELLER: {
                    code: 1,
                    text: 'Resellers'
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
        filterDataByStatus() {
            this.customers = this.customersAux
            this.customers = this.customers.filter((customer) => {
                if(this.status == this.STATUS.ALL.code) 
                {
                    return true;
                }
                

                console.log(customer.reseller,this.status)

                return customer.reseller == this.status
            })
        },
        filterData() {
            this.customers = this.customersAux
            this.customers = this.customers.filter((customer) => {
                return customer.name.toLowerCase().includes(this.query.toLowerCase()) || customer.email.toLowerCase().includes(this.query.toLowerCase()) || customer.whatsapp.toString().includes(this.query) || customer.address.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        shareLinkOnWhatsApp(url,title) {
            window.location.href = `${this.Translator.words.buy} *${title}* 👉 ${url}`.getWhatsappLink()
        },
        shareLinkOnTelegram(url,title) {
            window.location.href = url.shareOnTelegram(`${this.Translator.words.buy} ${title}`)
        },
        goToEditItem(item) {
            window.location.href = `../../apps/api/editItem?${httpBuildQuery({
                iid : item.item_id,
                uaid : this.user_api_id,
            })}`
        },
        deleteReseller(customer) {
            this.User.deleteReseller({user_api_id:this.user_api_id,customer_id:customer.customer_id},(response)=>{
                if(response.s == 1)
                {
                    customer.reseller = 0
                }
            })
        },
        makeReseller(customer) {
            this.User.makeReseller({user_api_id:this.user_api_id,customer_id:customer.customer_id},(response)=>{
                if(response.s == 1)
                {
                    customer.reseller = 1
                }
            })
        },
        deleteCustomer(customer) {
            const alert = alertCtrl.create({
                title: "Customer",
                subTitle: `<p>Are you sure to delete <strong>${customer.name}</strong> customer?</p>`,
                buttons: [
                    {
                        text: "Yes, delete",
                        role: "cancel",
                        class: 'btn-success',
                        handler: () => {
                            this.User.deleteCustomer({customer_id:customer.customer_id,user_api_id:this.user_api_id},(response)=> {
                                if(response.s == 1)
                                {
                                    this._getUserApiCustomers()
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
        goToPaymentLink(payment) {
            window.location.href = payment.checkout_url
        },
        goToEditCustomer(customer_id) {
            window.location.href = `../../apps/api/editCustomer?uaid=${this.user_api_id}&cid=${customer_id}`
        },
        goToViewDetail(customer_id) {
            window.location.href = `../../apps/api/customer?uaid=${this.user_api_id}&cid=${customer_id}`
        },
        goToViewInvoices(customer_id) {
            window.location.href = `../../apps/api/payments?uaid=${this.user_api_id}&cid=${customer_id}`
        },
        goToViewPayouts(customer_id) {
            window.location.href = `../../apps/api/payouts?uaid=${this.user_api_id}&cid=${customer_id}`
        },
        createSplit(split,customer) {
            console.log(split)
            const alert = alertCtrl.create({
                title: "New split",
                subTitle: `<div class="mb-3 text-center">Fill all fields</div>`,
                size: `model-fullscreen`,
                inputs: [
                    {
                        type : 'number',
                        id : 'amount',
                        name : 'amount',
                        label : `Split amount (max $ ${split.price.numberFormat(2)} USDT)`,
                        placeholder : 'Write...',
                    },
                    {
                        type : 'checkbox',
                        id : 'recurring',
                        name : 'recurring',
                        label : "Recurring",
                        value : true,
                        placeholder : 'Write...',
                    }
                ],
                buttons: [
                    {
                        text: "Add split",
                        class: 'btn-primary',
                        role: "cancel",
                        handler: (data) => {
                            if(data.amount <= split.price)
                            {
                                data.recurring = $("#recurring").is(":checked")
                                
                                this.User.attachSplitToItem({
                                    user_api_id:this.user_api_id,
                                    item_id:split.item_id,
                                    customer_id:customer.customer_id,
                                    recurring: data.recurring,
                                    amount: data.amount
                                },(response)=>{
                                    if(response.s == 1)
                                    {
                                        split.split = {
                                            split_id : response.split_id,
                                            amount : data.amount,
                                            recurring : data.recurring
                                        }   
                                    }
                                })
                            } else {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: `Cant create spit. Please check your fields`,
                                    _class:'bg-gradient-danger text-white'
                                })
                            }
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                            console.log($("#recurring").is(":checked"))
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
        createCustomer() {
            window.location.href = `../../apps/api/addCustomer?uaid=${this.user_api_id}`
        },
        goToSplitsManager(customer) {
            window.location.href = `../../apps/api/splitsManager?uaid=${this.user_api_id}&rcid=${customer.customer_id}`
        },
        getSplitsByCustomer(customer) {
            this.User.getSplitsByCustomer({user_api_id:this.user_api_id,customer_id:customer.customer_id},(response)=>{
                if(response.s == 1)
                {
                    customer.splits = response.splits
                }
            })
        },
        _getUserApiCustomers() {
            this.getUserApiCustomers(this.user_api_id).then((customers)=>{
                this.customers = customers
                this.customersAux = customers
            }).catch(() => this.customers = false)
        },
        getUserApiCustomers(user_api_id) {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiCustomers({user_api_id:user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.customers)
                    }

                    reject()
                })

            })
        },
    },
    async mounted() 
    {       
        await this.Translator.init()
        
        this.language_code = this.Translator.language

        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this._getUserApiCustomers()
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="customers">
                <div class="card overflow-hidden mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                                <div class="text-xs">Total {{customers.length}}</div>
                                <div class="">Customers list</div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="createCustomer" class="btn btn-primary mb-0 me-2 shadow-none"><i class="bi bi-plus-circle me-1"></i> Add customer </button>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12 col-xl">
                                <input v-model="query" type="text" class="form-control" placeholder="Search customer..."/>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <select class="form-select" v-model="status" aria-label="Filter">
                                    <option v-for="status in STATUS" v-bind:value="status.code">
                                        {{ status.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(customer,index) in customers" class="row mb-3 pb-3 align-items-center">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <div class="avatar avatar-sm me-2 bg-dark">
                                            {{customer.name.getFirstLetter()}}
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div v-if="customer.reseller">
                                            <span class="badge bg-primary">
                                                Reseller
                                            </span>
                                        </div>
                                        <div class="fw-semibold fs-4 text-dark">{{customer.name}}</div>
                                        <div class="text-xs text-secondary" v-text="customer.email ? customer.email : 'no email'"></div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div>
                                            <div>
                                                <span class="badge text-secondary text-xs p-0">WhatsApp</span>
                                            </div>
                                            <div v-if="customer.whatsapp">
                                                <a class="text-primary text-decoration-underline" :href="customer.whatsapp.sendWhatsApp(Translator.words.whatsapp_default_message)" target="_blank">
                                                    {{customer.whatsapp}}
                                                </a>
                                            </div>
                                            <div v-else class="text-secondary">
                                                No whatsapp
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div v-if="customer.address">
                                            <div>
                                                <span class="badge text-secondary text-xs p-0">USDT.TRC20</span>
                                            </div>
                                            <a class="text-primary text-decoration-underline" :href="customer.address.getTronScanAddress('Hi im getting in touch from Site')" target="_blank">
                                                {{customer.address}}
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-outline-primary px-3 mb-0 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <li><button class="dropdown-item" @click="goToEditCustomer(customer.customer_id)">Edit</button></li>

                                                <li><button class="dropdown-item" @click="goToViewDetail(customer.customer_id)">View detail</button></li>
                                                <li><button class="dropdown-item" @click="goToViewInvoices(customer.customer_id)">View invoices</button></li>
                                                <li><button class="dropdown-item" @click="goToViewPayouts(customer.customer_id)">View payouts</button></li>
                                                
                                                <li v-if="customer.reseller">
                                                    <button class="dropdown-item" @click="goToSplitsManager(customer)">View Splits</button>
                                                </li>

                                                <li><button class="dropdown-item" @click="deleteCustomer(customer)">Delete</button></li>
                                                
                                                <li v-if="customer.reseller"><button class="dropdown-item" @click="deleteReseller(customer)">Delete reseller</button></li>
                                                <li v-else><button class="dropdown-item" @click="makeReseller(customer)">Make reseller</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="customer.splits" class="mt-3">
                                    <ul class="list-group">
                                        <li v-for="split in customer.splits" class="list-group-item">
                                            <div class="row align-items-center">
                                                <div class="col-12 col-xl"> 
                                                    <div class="text-xs text-secondary">Item</div>
                                                    {{split.title}}
                                                </div>
                                                <div v-if="split.split" class="col-12 col-xl-auto">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn mb-0 shadow-none btn-sm px-3 me-2 btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Share link
                                                        </button>
                                                        <ul class="dropdown-menu shadow">
                                                            <li><button @click="shareLinkOnWhatsApp(split.split.short_url.url,split.title)" class="dropdown-item" href="#">WhatsApp</button></li>
                                                            <li><button @click="shareLinkOnTelegram(split.split.short_url.url,split.title)" class="dropdown-item" href="#">Telegram</button></li>
                                                        </ul>
                                                    </div>
                                                    <button @click="copy(split.split.short_url.url,$event.target)" class="btn mb-0 shadow-none btn-sm px-3  btn-primary">Copy link</button>
                                                </div>
                                                <div class="col-12 col-xl-auto text-end"> 
                                                    <div v-if="split.split">
                                                        <div class="fw-sembold">
                                                            $ {{split.split.amount.numberFormat(2)}} USDT
                                                        </div>
                                                        <span v-if="split.split.recurring" class="badge bg-primary">
                                                            Recurring
                                                        </span>
                                                    </div>
                                                    <div v-else>
                                                        <button @click="createSplit(split,customer)" class="btn btn-primary mb-0 shadow-none">Create split</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="customers == false" class="card">
                <div class="card-body d-flex justify-content-center py-5">
                    <button @click="createCustomer" class="btn btn-primary mb-0 shadow-none btn"> 
                        <i class="bi bi-plus-circle me-1"></i>
                        Add customer
                    </button>
                </div>
            </div>
        </div>
    `,
}

export { ApicustomersViewer } 