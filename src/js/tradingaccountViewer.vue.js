import { User } from '../../src/js/user.module.js?v=2.3.8'   

const TradingaccountViewer = {
    name : 'tradingaccount-viewer',
    data() {
        return {
            User : new User,
            profile: null,
            user: null
        }
    },
    methods: {
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Done'
            })
        },
        open(link) {
            window.location.href = link
        },
        openLink(conference) {
            conference.loading = true

            window.location.href = conference.link
        },
        getTradingAccount() {
            return new Promise((resolve,reject) => {
                this.User.getTradingAccount({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.user)
                    }

                    reject()
                })
            })
        },
        getProfileShort() {
            return new Promise((resolve,reject) => {
                this.User.getProfileShort({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.profile)
                    }

                    reject()
                })
            })
        },
    },
    mounted() 
    {   
        this.getProfileShort().then((profile)=>{
            this.profile = profile
        })
        this.getTradingAccount().then((user)=>{
            this.user = user
        }).catch(()=> this.user = false)
    },
    template : `
        <div v-if="user" class="card overflow-hidden mt-3">
            <div class="card-header h4">
                Cuenta de trading
            </div>
            <div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div><span class="badge p-0 text-secondary">Nombre de usuario</span></div>
                                {{user.user_name}}
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="copy(user.url,$event.target)" class="btn btn-success mb-0 shadow-none btn-sm px-3">Copy</button>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div><span class="badge p-0 text-secondary">Contraseña</span></div>
                                {{user.password}}
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="copy(user.url,$event.target)" class="btn btn-success mb-0 shadow-none btn-sm px-3">Copy</button>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl cursor-pointer" @click="user.viewFull = !user.viewFull" :class="!user.viewFull ? 'text-truncate' : ''">
                                <div><span class="badge p-0 text-secondary">Acceso</span></div>
                                {{user.url}}
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="copy(user.url,$event.target)" class="btn btn-success mb-0 shadow-none btn-sm px-3 me-1">Copy</button>
                                <button @click="open(user.url)" class="btn btn-success mb-0 shadow-none btn-sm px-3">Abrir</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else-if="user == false" class="card mt-3">
            <div v-if="profile" class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
                <span class="mask bg-gradient-dark"></span>
                <div class="card-body position-relative z-index-1 h-100 p-3">
                    <h6 class="text-white font-weight-bolder mb-3">¡Hola {{profile.names}}!</h6>
                    <p class="text-white mb-3">No tienes una cuenta de trading, comienza hoy. Configura tu paquete.</p>
                    <a class="btn btn-round btn-outline-white mb-0" href="../../apps/store/package">
                        Configura tu paquete
                        <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    `,
}

export { TradingaccountViewer } 