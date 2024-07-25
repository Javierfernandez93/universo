import { User } from '../../src/js/user.module.js?v=1.0.7'   

const ApilistViewer = {
    name : 'apilist-viewer',
    data() {
        return {
            User: new User,
            apis: null,
            apisAux: null,
            isTesting: false,
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
                AVIABLE: {
                    code: 1,
                    text: 'Disponibles'
                },
                USED: {
                    code: 2,
                    text: 'Usadas'
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
            this.apis = this.apisAux
            this.apis = this.apis.filter((api) => {
                return api.api_name.toLowerCase().includes(this.query.toLowerCase()) || api.api_secret.toLowerCase().includes(this.query.toLowerCase()) || api.api_key.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        testHookUrl(api) {
            if(!this.isTesting)
            {
                this.isTesting = true
                
                this.User.testHookUrl({user_api_id:api.user_api_id,hook_url:api.hook_url}, (response) => {
                    this.isTesting = false

                    if (response.s == 1) {
                        alertInfo({
                            size: 'modal-lg',
                            icon:'<i class="bi bi-card-checklist"></i>',
                            message: `Exito al conectar con <div><span class="fw-semibold">${api.hook_url}</span></div>`,
                            _class:'bg-gradient-success text-white'
                        })
                    } else {
                        alertInfo({
                            size: 'modal-lg',
                            icon:'<i class="bi bi-x"></i>',
                            message: `Error al conectar con <div><span class="fw-semibold">${api.hook_url}</span></div>`,
                            _class:'bg-gradient-danger text-white'
                        })
                    }
                })
            }
        },
        setHookUrl(api) {
            this.User.setHookUrl({user_api_id:api.user_api_id,hook_url:api.hook_url}, (response) => {
                if (response.s == 1) {
                    api.editingHook = false

                    this.testHookUrl(api)
                }
            })
        },
        copyHtmlPlugin(api,target) {
            navigator.clipboard.writeText(this.getHtmlPlugin(api)).then(() => {
               target.innerText = 'Done'
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        createApi() {
            const alert = alertCtrl.create({
                title: "Make new api",
                subTitle: ``,
                inputs: [
                    {
                        type : 'text',
                        id : 'api_name',
                        name : 'api_name',
                        label : `API'name (sin espacios)`,
                        placeholder : 'api_name',
                    },
                    {
                        type : 'text',
                        id : 'name',
                        name : 'name',
                        label : `Company name`,
                        placeholder : 'name',
                    },
                    {
                        type : 'checkbox',
                        id : 'sandbox',
                        name : 'sandbox',
                        text : 'Sandbox mode',
                        label : 'sandbox',
                        placeholder : 'sandbox',
                    }
                ],
                buttons: [
                    {
                        text: "New api",
                        role: "cancel",
                        class: 'btn-primary',
                        handler: (data) => {
                            this.User.createApi({ name: data.name, api_name: data.api_name, sandbox: document.getElementById('sandbox').checked }, (response) => {
                                if(response.s == 1)
                                {
                                    this._getUserApiList()
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
        deleteApi(user_api_id) {
            // @todo
        },
        goToStats(user_api_id) {
            window.location.href = `../../apps/api/stats?uaid=${user_api_id}`
        },
        goToPayments(user_api_id) {
            window.location.href = `../../apps/api/payments?uaid=${user_api_id}`
        },
        goToPayouts(user_api_id) {
            window.location.href = `../../apps/api/payouts?uaid=${user_api_id}`
        },
        goToItems(user_api_id) {
            window.location.href = `../../apps/api/items?uaid=${user_api_id}`
        },
        goToHosts(user_api_id) {
            window.location.href = `../../apps/api/hosts?uaid=${user_api_id}`
        },
        goToWallet(user_api_id) {
            window.location.href = `../../apps/api/wallet?uaid=${user_api_id}`
        },
        goToCustomers(user_api_id) {
            window.location.href = `../../apps/api/customers?uaid=${user_api_id}`
        },
        setDepositWallet(user_api) {
            const alert = alertCtrl.create({
                title: "Add deposit wallet",
                subTitle: ``,
                size: 'modal-fullscreen',
                html: `
                    <div class="row justify-content-center">
                       <div class="col-12">
                            <div class="alert alert-info text-white text-center">
                                <div class="lead fw-semibold">Add your wallet to you account</div>
                                <div>We will send founds to your account, please provide a valid USDT.TRC20 Wallet</div>
                            </div>

                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1">USDT.TRC20 Wallet address</span>
                                <input type="text" id="address" class="form-control px-3" placeholder="Write here..." aria-label="Write here..." aria-describedby="basic-addon1">
                            </div>
                        </div>
                    </div>
                `,
                buttons: [
                    {
                        text: "Add",
                        role: "cancel",
                        class: 'btn-primary',
                        handler: (data) => {
                            const address = $("#address").val()
                            this.User.setDepositWallet({ address: $("#address").val(), user_api_id: user_api.user_api_id }, (response) => {
                                if(response.s == 1)
                                {
                                    user_api.address = address
                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: `Wallet <b>${address}</b> added successfully`,
                                        _class:'bg-gradient-success text-white'
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
        getHtmlPlugin(api) {
            return `
                <script crossorigin="anonymus" src="https://www.universodejade.com/sdk/sdk.js?api_key=${api.api_key}&merchant_id=${api.merchant_id}"></script>
                <div class="Site"></div>
            `
        },
        _getUserApiList() {
            this.getUserApiList().then((apis)=>{
                this.apis = apis
                this.apisAux = apis
            }).catch(() => this.apis = false)
        },
        getUserApiList() {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiList({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.apis)
                    }

                    reject()
                })
            })
        },
    },
    mounted() 
    {       
        this._getUserApiList()
    },
    template : `
        <div v-if="apis">
            <div class="card mb-3 animation-fall-down" style="--delay:0.5s">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                            <div> </div>
                            <div>Api's list </div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button @click="createApi" class="btn btn-primary mb-0 shadow-none"> 
                                <i class="bi bi-plus-circle me-1"></i>
                                New api
                            </button>
                        </div>
                    </div>
                    <div class="mt-3">
                        <input type="text" name="query" class="form-control" v-model="query" placeholder="Buscar api por nombre, public key o secret key"/>
                    </div>
                </div>
            </div>
        
            <div v-for="(api,index) in apis" class="card mb-5 animation-fall-down" :style="{'--delay':''+(0.3*(index+1))+'s'}">
                <div class="card-header">    
                    <div class="row justify-content-end align-items-center">
                        <div class="col">
                            <div>
                                <span v-if="api.sandbox" class="badge text-xxs bg-secondary">Sandbox</span>
                                <span v-else class="badge text-xxs bg-success">Live</span>
                            </div>
                            <div class="fw-semibold h3 text-dark mb-3">{{api.api_name}}</div>
                        </div>
                        <div class="col-auto">
                            <div class="dropdown dropstart">
                                <button type="button" class="btn btn-primary shadow-none px-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li><button @click="goToWallet(api.user_api_id)"  class="dropdown-item">Wallet</button></li>
                                    <li><button @click="goToStats(api.user_api_id)" class="dropdown-item">Stats</button></li>
                                    <li><button @click="goToPayments(api.user_api_id)" class="dropdown-item">Invoices</button></li>
                                    <li><button @click="goToPayouts(api.user_api_id)" class="dropdown-item">Payouts</button></li>
                                    <li><button @click="goToCustomers(api.user_api_id)"  class="dropdown-item">Customers</button></li>
                                    <li><button @click="goToItems(api.user_api_id)" class="dropdown-item">Items</button></li>
                                    <li><button @click="goToHosts(api.user_api_id)" class="dropdown-item">Hosts</button></li>
                                    <li><button @click="setDepositWallet(api)" class="dropdown-item">Add wallet</button></li>
                                    <li><button @click="deleteApi(api.user_api_id)" class="dropdown-item">Delete</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">   
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="row mb-3">
                                <div class="col-12 col-xl">
                                    <div class="text-secondary">
                                        <span class="badge bg-success">api key</span>
                                    </div>
                                    {{api.api_key}} 
                                    <button @click="copy(api.api_key,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                </div>
                                <div class="col-12 col-xl">
                                        <div class="text-secondary">
                                        <span class="badge bg-success">Ipn secret</span>
                                    </div>
                                    {{api.ipn_secret}} 
                                    <button @click="copy(api.ipn_secret,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                </div>
                            </div>
                                
                            <div class="row mb-3">
                                <div class="text-secondary">
                                    <span class="badge bg-success">api secret</span>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-xl-10">
                                        <div class="text-sxs" style="font-size:0.9rem">
                                            <span v-if="api.show">
                                                {{api.api_secret}} 
                                            </span>
                                            <span v-else>
                                                {{api.api_secret.hideText(44)}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-2 text-end">
                                        <button @click="api.show = !api.show" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">
                                            <span v-if="api.show">
                                                <i class="bi fs-6 bi-eye-slash-fill"></i>
                                            </span>
                                            <span v-else>
                                                <i class="bi fs-6 bi-eye-fill"></i>
                                            </span>
                                        </button>
                                        <button @click="copy(api.api_secret,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="text-secondary">
                                    <span class="badge bg-success">Basic Auth TOKEN</span>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-xl-10">
                                        <div class="text-sxs" style="font-size:0.9rem">
                                            <span v-if="api.showBasicAuthToken">
                                                {{api.basicAuthToken}} 
                                            </span>
                                            <span v-else>
                                                {{api.basicAuthToken.hideText(55)}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-2 text-end">
                                        <button @click="api.showBasicAuthToken = !api.showBasicAuthToken" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">
                                            <span v-if="api.showBasicAuthToken">
                                                <i class="bi fs-6 bi-eye-slash-fill"></i>
                                            </span>
                                            <span v-else>
                                                <i class="bi fs-6 bi-eye-fill"></i>
                                            </span>
                                        </button>
                                        <button @click="copy(api.basicAuthToken,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="api.address" class="row mb-3">
                                <div class="text-secondary">
                                    <span class="badge bg-success">Address</span>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-xl-10">
                                        <div class="text-sxs" style="font-size:0.9rem">
                                            <span v-if="api.showAddress">
                                                {{api.address}} 
                                            </span>
                                            <span v-else>
                                                {{api.address.hideText(12)}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-2 text-end">
                                        <button @click="api.showAddress = !api.showAddress" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">
                                            <span v-if="api.showAddress">
                                                <i class="bi fs-6 bi-eye-slash-fill"></i>
                                            </span>
                                            <span v-else>
                                                <i class="bi fs-6 bi-eye-fill"></i>
                                            </span>
                                        </button>
                                        <button @click="copy(api.address,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-12">
                            <div class="my-3 py-3">
                                <span class="badge bg-success"> Copy the following code and past into body tag to add plugin</span>

                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-10">
                                        <code class="">
                                            {{getHtmlPlugin(api)}}
                                        </code>
                                    </div>
                                    <div class="col-12 col-xl-2">
                                        <button @click="copyHtmlPlugin(api,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <div class="row">
                        <div class="col-12">
                            <div v-if="api.hook_url || api.editingHook" class="row bg-light align-items-center">
                                <div class="col-12 col-xl">
                                    <div>
                                        <span class="badge p-0 text-secondary">Enter the hook url</span>
                                    </div>
                                    <div>
                                        <div v-if="api.editingHook">
                                            <div class="form-floating">
                                                <input type="url" @keypress.enter.exact="setHookUrl(api)" v-model="api.hook_url" class="form-control" id="hook_url" placeholder="">
                                                <label for="hook_url">Hook's URL</label>
                                            </div>
                                        </div>
                                        <div v-else class="row align-items-center">
                                            <div class="col-12 col-xl">
                                                {{api.hook_url}} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-xl-auto" v-if="!api.editingHook">
                                    <button @click="api.editingHook = !api.editingHook" class="btn btn-dark btn-sm px-3 mb-0 shadow-none">Edit</button>
                                    <button :disabled="isTesting" @click="testHookUrl(api)" class="btn btn-dark ms-1 btn-sm px-3 mb-0 shadow-none">Test hook</button>
                                </div>
                            </div>
                            <div v-else class="row justify-content-center">
                                <div class="col-auto">
                                    <button class="btn btn-primary shadow-none mb-0" @click="api.editingHook = true">Configure hook</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-else-if="apis == false" class="card">
            <div class="card-body d-flex justify-content-center py-5">
                <button @click="createApi" class="btn btn-primary mb-0 shadow-none btn"> 
                    <i class="bi bi-plus-circle me-1"></i>
                    New api
                </button>
            </div>
        </div>
        
    `,
}

export { ApilistViewer } 