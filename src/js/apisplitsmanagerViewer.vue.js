import { User } from '../../src/js/user.module.js?v=2.4.9'   

const ApisplitsmanagerViewer = {
    name : 'apisplitsmanager-viewer',
    data() {
        return {
            User: new User,
            referral_customer_id: null,
            user_api_id: null,
            items: null,
            MAX_SPLITS: 3,
            resellers: null,
            resellersAux: null,
        }
    },
    methods: {
        addSplit(item) {
            item.splits.push({
                referral_customer_id: this.referral_customer_id,
                item_id: item.item_id,
                name: null,
                email: null,
                query: null,
                whatsapp: null,
                showResellers: true,
                recurring: false,
                editing: true,
                amount: null,
            })
        },
        selectReseller(split,reseller) {
            split.customer_id = reseller.customer_id
            split.name = reseller.name
            split.email = reseller.email
            split.address = reseller.address
            split.showResellers = false
            split.query = reseller.name
        },
        filterResellers(resellers,query) {
            return resellers.filter((reseller)=>{
                return reseller.name.toLowerCase().includes(query.toLowerCase())
            })
        },
        updateSplit(split) {
            this.User.updateSplit({...split,...{user_api_id:this.user_api_id}},(response)=>{
                if(response.s == 1)
                {
                    split.editing = false
                }
            })
        },
        updateSplitAmount(split) {
            this.User.updateSplitAmount({split_id:split.split_id,amount:split.amount,user_api_id:this.user_api_id},(response)=>{
                if(response.s == 1)
                {
                    split.editing = false
                }
            })
        },
        deleteSplit(split_id) {
            this.User.deleteSplit({split_id:split_id,user_api_id:this.user_api_id},(response)=>{
                if(response.s == 1)
                {
                    this._getSplitsByCustomer()
                }
            })
        },
        getResellers() {
            return new Promise((resolve, reject) => {
                this.User.getResellers({user_api_id:this.user_api_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.resellers)
                    }

                    reject()
                })
            })
        },
        getSplitsByCustomer() {
            return new Promise((resolve, reject) => {
                this.User.getSplitsByCustomer({referral_customer_id:this.referral_customer_id,user_api_id:this.user_api_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.items)
                    }

                    reject()
                })
            })
        },
        _getSplitsByCustomer() {
            this.getSplitsByCustomer().then((items)=> {
                this.items = items
            })
        }
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')
            this.referral_customer_id = getParam('rcid')

            this.getResellers().then((resellers)=>{
                this.resellersAux = resellers
                this.resellers = resellers
            })

            this._getSplitsByCustomer()
        }
    },
    template : `
        <div v-if="items">
            <div v-for="item in items" class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl">
                            <div class="text-xs text-secondary">Item</div>
                            <div class="fw-sembold fs-4 text-primary">{{item.title}}</div>
                        </div>
                        <div class="col-12 col-xl-auto text-end">
                            <div class="text-xs text-secondary">Item's price</div>
                            $ {{item.price.numberFormat()}} USDT
                        </div>
                        <div class="col-12 col-xl-auto text-end" v-if="item.splits.length < MAX_SPLITS">
                            <button @click="addSplit(item)" class="btn btn-primary shadow-none mb-0"><i class="bi bi-plus-circle me-1"></i> Add split</button>
                        </div>
                    </div>
                </div>
                
                <ul class="list-group list-group-flush">
                    <li v-for="split in item.splits" class="list-group-item list-group-item-action px-5 py-3">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div v-if="!split.editing" class="col-12 col-xl">
                                    <div class="text-secondary text-xs">Name</div>
                                    <div class="text-dark fw-sembold">
                                        {{split.name}}
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="input-group position-relative">
                                        <input type="text" v-model="split.query" class="form-control text-center" placeholder="Customer name" aria-label="Customer name" aria-describedby="basic-addon1">
                                        
                                        <div v-if="split.query && split.showResellers" class="position-absolute top-0 mt-5 z-index-2 w-100">
                                            <ul class="list-group">
                                                <li v-for="reseller in filterResellers(resellers,split.query)" class="list-group-item">
                                                    <div class="row align-items-center">
                                                        <div class="col-12 col-xl">
                                                            {{reseller.name}}
                                                        </div>
                                                        <div class="col-12 col-xl-auto">
                                                            <button type="button" @click="selectReseller(split,reseller)" class="btn btn-primary mb-0 shadow-none">Select</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto text-end">
                                <div v-if="!split.editing">
                                    <div class="text-xs text-secondary">Split amount</div>
                                    <div class="text-dark fw-sembold text-decoration-underline cursor-pointer">$ {{split.amount.numberFormat(2)}} USDT</div>
                                </div>
                                <div v-else>
                                    <div class="input-group">
                                        <span class="input-group-text text-secondary" id="basic-addon1">USDT</span>
                                        <input type="number" @keypress.enter.exact="updateSplitAmount(split)" :class="split.amount > item.price ? 'is-invalid' : 'is-valid'" v-model="split.amount" class="form-control text-center" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto text-end">
                                <button v-if="split.editing" @click="updateSplit(split)" class="btn btn-primary shadow-none mb-0">Save</button>
                                <div v-else>
                                    <button @click="split.editing = true" class="btn btn-primary btn-sm me-1 shadow-none mb-0">Edit</button>
                                    <button @click="deleteSplit(split.split_id)" class="btn btn-danger btn-sm shadow-none mb-0">Delete</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
}

export { ApisplitsmanagerViewer } 