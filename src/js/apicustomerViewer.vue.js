import { User } from '../../src/js/user.module.js?v=2.4.2'   
import { Translator } from '../../src/js/translator.module.js?v=2.4.2'   

const ApicustomerViewer = {
    name : 'apicustomer-viewer',
    data() {
        return {
            Translator: new Translator,
            User: new User,
            user_api_id: null,
            customer: {
                customer_id: null
            },
        }
    },
    methods: {
        _getUserApiCustomer() {
            this.getUserApiCustomer(this.user_api_id).then((customer)=>{
                this.customer = customer
            }).catch(() => this.customer = false)
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        getUserApiCustomer(user_api_id) {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiCustomer({user_api_id:user_api_id,customer_id:this.customer.customer_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.customer)
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
            this.customer.customer_id = getParam('cid')

            this._getUserApiCustomer()
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="customer">
                <div class="card overflow-hidden mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                                <div class="">Customer {{customer.name}}</div>
                            </div>
                            <div class="text-secondary">{{customer.email}}</div>
                        </div>
                    </div>
                    <div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        Nombre
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        {{customer.name}}
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        <button @click="copy(customer.name,$event.target)" class="btn btn-light px-3 btn-sm shadow-none mb-0">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        Correo
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        {{customer.email}}
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        <button @click="copy(customer.email,$event.target)" class="btn btn-light px-3 btn-sm shadow-none mb-0">Copy</button>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        WhatsApp
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        {{customer.whatsapp}}
                                    </div>
                                    <div class="col-12 col-xl-auto fw-sembold text-dark">
                                        <button @click="copy(customer.whatsapp,$event.target)" class="btn btn-light px-3 btn-sm shadow-none mb-0">Copy</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="customer.fields"  class="card overflow-hidden">
                <div class="card-header">
                    Extra information
                </div>
                <div>
                    <ul class="list-group list-group-flush">
                        <li v-for="field in customer.fields" class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl">
                                    {{field.field}}
                                </div>
                                <div class="col-12 col-xl-auto fw-sembold text-dark">
                                    {{field.value}}
                                </div>
                                <div class="col-12 col-xl-auto fw-sembold text-dark">
                                    <button @click="copy(field.value,$event.target)" class="btn btn-light px-3 btn-sm shadow-none mb-0">Copy</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
}

export { ApicustomerViewer } 