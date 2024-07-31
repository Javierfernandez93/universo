import { Guest } from '../../src/js/guest.module.js?v=1.0.9'   
import { Translator } from '../../src/js/translator.module.js?v=1.0.9'   

const PaymentgatewayViewer = {
    name : 'paymentgateway-viewer',
    data() {
        return {
            Translator: new Translator,
            Guest: new Guest,
            ewallet: null,
            language_code: null,
            loading: false,
            interval: null,
            invoice: null,
            countries : [
                {
                    'country_id': 226,
                    'code': 'es',
                    'name': 'Español',
                },
                {
                    'country_id': 279,
                    'code': 'en',
                    'name': 'Inglés',
                }
            ],
            STATUS: {
                DELETED: -1,
                EXPIRED: 0,
                PENDING: 1,
                PAYED: 2,
            },
            words : {
                address : 'address',
                time_lef : 'time left'
            }
        }
    },
    watch: {
        language_code: {
            async handler() {
                if(this.Translator.language != this.language_code)
                {
                    await this.Translator.changeLanguage(this.language_code)
                }
            },
            deep: true
        }
    },
    methods: {
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = this.Translator.words.done
            })
        },
        runInterval() {
            this.interval = setInterval(()=>{
                this.invoice.timeLeft = this.invoice.expiration_date.getTimeLeft()
            },1000)
        },
        getInvoiceByTx(invoice_tx) {
            return new Promise((resolve,reject)=> {
                this.Guest.getInvoiceByTx({invoice_tx:invoice_tx}, (response) => {
                    if (response.s == 1) {
                        resolve(response.invoice)
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


        if(getParam('invoiceTx'))
        {
            this.getInvoiceByTx(getParam('invoiceTx')).then((invoice)=>{
                this.invoice = invoice

                this.runInterval()
            }).catch(() => this.invoice = false)
        }
    },
    template : `
        <div v-if="invoice" class="row justify-content-center">
            <div class="col-10 col-xl-7">
                <div v-if="invoice.status == STATUS.PENDING" class="card overflow-hidden">
                    <div class="card-body p-5">
                        <div class="row justify-content-end">
                            <div class="col-auto">
                                <select class="form-select pe-5" v-model="language_code" :aria-label="Translator.words.select_your_language">
                                    <option>{{Translator.words.select_your_language}}</option>
                                    <option v-for="country in countries" @click="a()" v-bind:value="country.code">
                                        {{ country.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3 justify-content-center">
                            <div class="col-12 col-xl-6 text-center">
                                <img :src="invoice.address.getQrCode()" class="w-100" :alt="invoice.address" :title="invoice.address"/>
                                <div class="text-primary lead fw-semibold">{{invoice.name}}</div>
                            </div>
                        </div>
                        <div class="row mb-3 border rounded py-2 text-center">
                            <div class="text-xs">{{Translator.words.address}}</div>
                            <div class="">
                                {{invoice.address}}
                                <button @click="copy(invoice.address,$event.target)" class="btn ms-2 btn-primary mb-0 btn-sm px-3">{{Translator.words.copy}}</button>
                            </div>
                        </div>
                        <div class="row rounded align-items-center bg-light p-3 justify-content-center">
                            <div class="col-12 col-xl">
                                <div class="text-xs">{{Translator.words.amount_left}}</div>
                                
                                <div class="fs-5 fw-sembold">
                                    <span v-if="invoice.amount_left > 0">
                                        {{invoice.amount_left.numberFormat(2)}} 
                                    </span>
                                    <span v-else>
                                        {{invoice.amount.numberFormat(2)}} 
                                    </span>
                                USDT.TRC20</div>

                                <div class="text-primary fw-sembold">{{Translator.words.invoice}}: {{invoice.invoice_id}}</div>
                            </div>
                            <div v-if="invoice.timeLeft" class="col-12 col-xl text-end">
                                <div class="text-xs">{{Translator.words.time_left}}</div>
                                {{invoice.timeLeft}}
                            </div>
                        </div>

                        <div class="py-3">
                            <span v-html="Translator.words.sent_all_amount"></span>
                            <div>
                                <b>{{invoice.invoice_tx}}</b>
                            </div>
                        </div>
                    </div>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h5 class="accordion-header bg-light" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    {{Translator.words.how_make_payment_title}}
                                </button>
                            </h5>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <span v-html="Translator.words.how_make_payment"></span>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h5 class="accordion-header bg-light" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    {{Translator.words.not_enough_money_title}}
                                </button>
                            </h5>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <span v-html="Translator.words.not_enough_money"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="invoice.status == STATUS.PAYED" class="card bg-gradient-success">
                    <div class="card-body text-center">
                        <h1 class="text-white">{{Translator.words.paid}}</h1>
                        <div class="">
                            <div class="text-white mb-3">
                                <div class="mb-n2">{{Translator.words.invoice}}</div>
                                <div class="fs-5"><strong>{{invoice.invoice_id}}</strong></div>
                            </div>
                            <div class="text-white">
                                <div class="mb-n2">{{Translator.words.invoice_tx}}</div>
                                <div class="fs-5"><strong>{{invoice.invoice_tx}}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="invoice.status == STATUS.DELETED" class="card bg-gradient-danger">
                    <div class="card-body text-center">
                        <h1 class="text-white">{{Translator.words.deleted}}</h1>
                        <div class="">
                            <div class="text-white mb-3">
                                <div class="mb-n2">{{Translator.words.invoice}}</div>
                                <div class="fs-5"><strong>{{invoice.invoice_id}}</strong></div>
                            </div>
                            <div class="text-white">
                                <div class="mb-n2">{{Translator.words.invoice_tx}}</div>
                                <div class="fs-5"><strong>{{invoice.invoice_tx}}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { PaymentgatewayViewer } 