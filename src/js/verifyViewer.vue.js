import { User } from './user.module.js?t=4'
import { Translator } from '../../src/js/translator.module.js?v=2.4.2'   

const VerifyViewer = {
    name: 'verify-viewer',
    data() {
        return {
            User : new User,
            Translator: new Translator,
            busy: false,
            user: {
                email: null,
                password: '',
                secret: '',
                validSecret: false,
            },
            redirection: {
                page: null,
                route_name: null
            },
            feedback : false,
            fieldPasswordType : 'password',
            filled : false,
            language_code: null,
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
        }
    },
    watch : {
        user : {
            handler() {
                this.filled = this.user.password && this.user.password.securePassword()
            },
            deep: true
        },
    },
    methods: {
        toggleFieldPasswordType() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        verifyAccount() {
            return new Promise((resolve, reject) => {
                this.busy = true
                
                this.User.verifyAccount(this.user,(response)=>{
                    this.busy = false
    
                    if(response.s == 1)
                    {
                        resolve(true)
                    }

                    reject(true)
                })
            })
        },
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language

        this.user.secret = getParam('secret')
        this.user.email = getParam('email')

        this.verifyAccount().then((validToken)=>{
            this.user.validToken = validToken
            setTimeout(()=>{
                window.location.href = '../../apps/backoffice'
            },3000)
        })
    },
    template: `
        <div class="p-3 bg-transparent text-start cards-plain bg-white animation-fall-down" style="--delay: 0.8s">
            <div v-if="busy" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">busy...</span>
                </div>
            </div>
            <div v-else>
                <div v-if="!user.validToken" class="alert alert-danger text-center text-white">
                    <i class="bi bi-x"></i> El token no es valido
                </div>

                <div v-if="user.validToken">
                    <div class="card bg-transparent shadow-none">
                        <div class="card-header pb-0 bg-transparent">
                            <img src="../../src/img/logo.svg" title="logo" alt="logo" class="w-50"/>
                        </div>

                        <div class="card-header text-center bg-transparent">
                            <h5 class="font-weight-bolder text-dark text-gradient">Validando token de activación</h5>
                        </div>
                    </div>

                    
                    <div class="alert alert-success text-center text-white">
                        <i class="bi bi-check-circle"></i> Token valido... redireccionando a tu cuenta en 3 segundos
                    </div>
                </div>
            </div>
        </div>
    `
}

export { VerifyViewer }