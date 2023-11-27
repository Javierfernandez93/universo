import { User } from '../../src/js/user.module.js?v=2.3.5'   

const ApiwalletsViewer = {
    name : 'apiwallets-viewer',
    emits : ['requestAuth'],
    data() {
        return {
            User: new User,
            busy: false,
            wallets: null,
            walletsAux: null,
            balances: {
                'USDT' : 0,
                'TRX' : 0,
            },
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
        getTotals() {
            this.wallets.map((wallet)=>{
                wallet.balances.map((balance)=>{
                    this.balances[balance.name] += parseFloat(balance.balance)
                })
            })
        },
        authSuccess(data) {
            switch (data.requestQuery.v) {
                case 'pk' : //private_keys
                    let wallet = this.getWallet(data.requestQuery.i)

                    this.User.getSafePrivateKeysByWallet({
                        tron_wallet_id: data.requestQuery.i,
                        user_api_id: wallet.user_api_id,
                        key: data.key,
                    },(response) => {
                        if(response.s == 1) 
                        {
                            wallet.private_key = response.private_key
                        }
                    })
                break;
            }
        },
        requestViewPrivateKey(wallet) {
            this.$emit('requestAuth',{i:wallet.tron_wallet_id,v:'pk',m:'v'})
        },
        filterData() {
            this.wallets = this.walletsAux
            this.wallets = this.wallets.filter((wallet) => {
                return wallet.public_key.toLowerCase().includes(this.query.toLowerCase()) || wallet.private_key.toLowerCase().includes(this.query.toLowerCase()) || wallet.address.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        createApi() {
            const alert = alertCtrl.create({
                title: "Crea tu Api",
                subTitle: ``,
                inputs: [
                    {
                        type : 'text',
                        id : 'api_name',
                        name : 'api_name',
                        label : 'Nombre de API',
                        placeholder : 'api_name',
                    }
                ],
                buttons: [
                    {
                        text: "New api",
                        role: "cancel",
                        class: 'btn-primary',
                        handler: (data) => {
                            this.User.createApi({ api_name: data.api_name }, (response) => {
                                if(response.s == 1)
                                {
                                    this._getUserApiWallets()
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
        goToPayments(user_api_id) {
            window.location.href = `../../apps/api/payments?uaid=${user_api_id}`
        },
        _getUserApiWallets() {
            this.getUserApiWallets().then((wallets)=>{
                this.wallets = wallets
                this.walletsAux = wallets

                this.getTotals()
            }).catch(() => this.wallets = false)
        },
        getWallet(tron_wallet_id) {
            let wallet = this.wallets.filter(wallet => wallet.tron_wallet_id == tron_wallet_id)

            return wallet.length > 0 ? wallet[0] : false
        },
        getUserApiWallets() {
            this.busy = true
            return new Promise((resolve,reject)=> {
                this.User.getUserApiWallets({}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        resolve(response.wallets)
                    }

                    reject()
                })

            })
        },
    },
    mounted() 
    {       
        this._getUserApiWallets()
    },
    template : `
        <div v-if="busy" class="d-flex justify-content-center">
            <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-if="wallets" class="animation-fall-down" style="--delay:0.5s">
            <div class="card overflow-hidden mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                            <div class="text-xs">
                                Total {{wallets.length}}
                            </div>
                            Wallets list
 
                        </div>
                        <div class="col-12 col-xl-auto" v-if="balances">
                            <div class="row text-end">
                                <div v-for="(balance,index) in balances" class="col-12 col-xl">
                                    <div class="text-xs">{{index}}</div>
                                    <div class="text-primary fs-5 fw-sembold">
                                        {{balance.numberFormat(2)}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <input type="text" name="query" class="form-control" v-model="query" placeholder="Buscar api por dirección, public key o private key"/>
                    </div>
                </div>
            </div>
        
            <div v-for="wallet in wallets" class="mb-5 pb-5 border-bottom">
                <div class="row">
                    <div class="row mb-3"> 
                        <div v-for="(balance,index) in wallet.balances" class="col"> 
                            <div class="card" :class="index == 0 ? 'bg-primary text-white' : ''"> 
                                <div class="card-body"> 
                                    <div><span :class="index == 0 ? 'text-white' : 'text-secondary'" class="badge p-0">Balance</span></div>   
                                    <div :class="index == 0 ? 'text-white' : 'text-dark'" class="fs-4 fw-semibold">{{balance.balance.numberFormat(2)}} {{balance.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">    
                        <div class="col-12">    
                            <div class="card">    
                                <div class="card-body">    
                                    <div class="row py-3 align-items-center">    
                                        <div class="col-12 col-xl">    
                                            <div class="mb-3">
                                                <div><span class="badge bg-primary">Public key</span></div>
                                                
                                                <div class="row">
                                                    <div class="col-12 col-xl" style="font-size:13px;">
                                                        <span v-if="wallet.showSecret">
                                                            {{wallet.public_key}} 
                                                        </span>
                                                        <span v-else>
                                                            {{wallet.public_key.hideText(55)}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl-auto">
                                                        <button @click="wallet.showSecret = !wallet.showSecret" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">
                                                            <span v-if="wallet.showSecret">
                                                                <i class="bi fs-6 bi-eye-slash-fill"></i>
                                                            </span>
                                                            <span v-else>
                                                                <i class="bi fs-6 bi-eye-fill"></i>
                                                            </span>
                                                        </button>
                                                        <button @click="copy(wallet.public_key,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <div><span class="badge bg-primary">Private key</span></div>
                                                <div class="row">
                                                    <div class="col-12 col-xl" style="font-size:13px;">
                                                        <span v-if="wallet.showPrivate">
                                                            {{wallet.private_key}} 
                                                        </span>
                                                        <span v-else>
                                                            {{wallet.private_key.hideText(35)}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl-auto">
                                                        <button @click="requestViewPrivateKey(wallet)" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">
                                                            <span v-if="wallet.showPrivate">
                                                                <i class="bi fs-6 bi-eye-slash-fill"></i>
                                                            </span>
                                                            <span v-else>
                                                                <i class="bi fs-6 bi-eye-fill"></i>
                                                            </span>
                                                        </button>
                                                        <button @click="copy(wallet.private_key,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row align-items-center justify-content-end">    
                                        <div class="col-12 col-xl">       
                                            <img :src="wallet.address.getQrCode()" class="img-fluid" alt="wallet" title="wallet" />
                                        </div>
                                        <div class="col-12 col-xl-auto">    
                                            <div class="tex-xs text-secondary">
                                                {{wallet.address}}
                                                <button @click="copy(wallet.address,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none fs-6 mb-0">Copy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="wallets == false" class="card">
            <div class="card-body d-flex justify-content-center py-5">
                <button @click="createApi" class="btn btn-primary mb-0 shadow-none btn"> 
                    <i class="bi bi-plus-circle me-1"></i>
                    New api
                </button>
            </div>
        </div>
    `,
}

export { ApiwalletsViewer } 