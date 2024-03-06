import { User } from './user.module.js?t=4'
import { Translator } from '../../src/js/translator.module.js?v=2.4.8'   

const UpdatepasswordViewer = {
    name: 'updatepassword-viewer',
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
        validateSecret() {
            return new Promise((resolve, reject) => {
                this.busy = true
                
                this.User.validateSecret(this.user,(response)=>{
                    this.busy = false
    
                    if(response.s == 1)
                    {
                        resolve(true)
                    }

                    reject(true)
                })
            })
        },
        updatePasswordAndLogin() {
            this.busy = true

            this.User.updatePasswordAndLogin(this.user,(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    window.location.href = '../../apps/backoffice'   
                } 
            })
        },
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language

        this.user.secret = getParam('secret')
        this.user.email = getParam('email')

        this.validateSecret().then((validToken)=>{
            this.user.validToken = validToken
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
                            <h5 class="font-weight-bolder text-dark text-gradient">Actualiza tu contraseña para acceder</h5>
                        </div>
                    </div>

                    
                    <div class="alert alert-success text-center text-white">
                        <i class="bi bi-check-circle"></i> Token valido
                    </div>

                    <div class="card rounded">
                        <div class="card-body">
                            <form role="form">
                                <div class="form-floating mb-3 position-relative">
                                    <input 
                                        :type="fieldPasswordType"
                                        :class="user.password ? 'is-valid' : ''"
                                        @keydown.enter.exact.prevent="doLogin"
                                        type="password" ref="password" id="password" v-model="user.password" class="form-control" :placeholder="Translator.words.password" :aria-label="Translator.words.password" aria-describedby="password-addon">
                                    
                                    <label class="text-sm" for="password">{{Translator.words.password}}</label>
                                    
                                    <div class="position-absolute end-0 top-0">
                                        <button class="btn btn-primary mb-0 mt-2 me-2 shadow-none" :class="user.password.securePassword() ? 'is-valid' : 'is-invalid'" type="button" id="password" @click="toggleFieldPasswordType">
                                            <i v-if="fieldPasswordType == 'password'" class="bi bi-eye"></i>
                                            <i v-else class="bi bi-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div v-if="!user.password.securePassword()" class="alert alert-danger text-center mt-2 p-2 text-xs text-white">
                                    Ingresa una contraseña que contenga 6 o más caracteres, 1 letra al menos, 1 número al menos y un símbolo
                                </div>

                                <div v-show="feedback" class="alert alert-light shadow fw-semibold border-0 alert-dismissible fade show" role="alert">
                                    <strong>Aviso</strong>
                                    {{ feedback }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                                <div class="mt-3 d-grid">
                                    <button
                                        :disabled="!filled"
                                        @click="updatePasswordAndLogin"
                                        type="button" class="btn btn-primary shadow-none btn-lg">Actualizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card-footer pt-0 px-lg-2 px-1 mt-3">
                        <p class="mb-4 text-sm mx-auto">
                            {{Translator.words.dont_have_account_yet}}
                            <a href="../../apps/signup" class="text-info text-primary font-weight-bold">{{Translator.words.signup_here}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { UpdatepasswordViewer }