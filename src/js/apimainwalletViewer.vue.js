import { User } from '../../src/js/user.module.js?v=2.3.6'   

const ApimainwalletViewer = {
    name : 'apimainwallet-viewer',
    data() {
        return {
            User: new User,
            wallet: null
        }
    },
    methods: {
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        _getMainWallet(user_api_id) {
            this.getMainWallet(user_api_id).then((wallet)=>{
                this.wallet = wallet
            }).catch(() => this.wallet = false)
        },
        getMainWallet(user_api_id) {
            return new Promise((resolve,reject)=> {
                this.User.getMainWallet({user_api_id:user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.wallet)
                    }

                    reject()
                })
            })
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this._getMainWallet(getParam('uaid'))
        }
    },
    template : `
    
        <div v-if="wallet" class="card">
            <div class="card-body">
                <div class="mb-3">
                    <div><span class="badge p-0 text-secondary">Qr</span></div>
                    <img :src="wallet.public_key.getQrCode()" class="img-fluid" title="qr" alt="qr"/>
                </div>

                <div class="mb-3">
                    <div><span class="badge p-0 text-secondary">Address</span></div>
                    <div>{{wallet.address}} <button @click="copy(wallet.address,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">Copy</button></div>
                </div>

                <div class="mb-3">
                    <div><span class="badge p-0 text-secondary">Public Key</span></div>
                    <div style="font-size:0.9rem">{{wallet.public_key}} <button @click="copy(wallet.public_key,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">Copy</button></div>
                </div>
                
                <div class="mb-3 d-none">
                    <div><span class="badge p-0 text-secondary">Private Key</span></div>
                    <div>{{wallet.private_key}} <button @click="copy(wallet.private_key,$event.target)" class="btn ms-2 btn-light btn-sm px-3 shadow-none mb-0">Copy</button> </div>
                </div>
            </div>
        </div>
    `,
}

export { ApimainwalletViewer } 