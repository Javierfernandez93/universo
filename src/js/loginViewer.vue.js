import { User } from './user.module.js?t=4'
import { Translator } from '../../src/js/translator.module.js?v=1.1.5'   

const LoginViewer = {
    name: 'login-viewer',
    data() {
        return {
            User : new User,
            busy: false,
            Translator: new Translator,
            user: {
                email: null,
                rememberMe: true,
                password: null,
            },
            redirection: {
                page: null,
                route_name: null
            },
            feedback : false,
            isValidMail : false,
            fieldPasswordType : 'password',
            userComplete : false,
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
                this.checkFields()
                this.checkEmail()
            },
            deep: true
        },
    },
    methods: {
        toggleFieldPasswordType() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        doLogin() {
            this.busy = true
            this.feedback = false

            this.User.doLogin(this.user,(response)=>{
                this.busy = false
                
                if(response.s == 1)
                {
                    if(this.redirection.page)
                    {
                        window.location.href = this.redirection.page
                    } else {
                        window.location.href = '../../apps/backoffice'
                    }
                } else if(response.r == "INVALID_PASSWORD") {
                    this.feedback = "Las contraseña indicada no es correcta. Intente nuevamente"
                } else if(response.r == "INVALID_CREDENTIALS") {
                    this.feedback = "Las credenciales proporcionadas no son correctas, intente nuevamente"
                } else if(response.r == "NOT_VERIFIED") {
                    alertInfo({
                        icon:'<i class="bi bi-info fs-3"></i>',
                        size: 'modal-md',
                        message: `
                            <div class="text-white">
                                <div class="h3 text-white">
                                    Activa tu cuenta
                                </div>
                                <div class="">
                                    Hemos enviado un correo a <b>${this.user.email}</b> con las instrucciones para que actives tu cuenta
                                </div>
                                <div class="text-xs mt-3">
                                    <stong>Importante</stong>
                                    <div>
                                        Puedes recibar en bandeja de spam o correos no deseados si no encuentras tu correo
                                    </div>
                                </div>
                            </div>
                        `,
                        _class:'bg-gradient-primary text-white'
                    })
                } else if(response.r == "NEED_UPDATE_PASSWORD") {
                    alertInfo({
                        icon:'<i class="bi bi-info fs-3"></i>',
                        size: 'modal-md',
                        message: `
                            <div class="text-white">
                                <div class="h3 text-white">
                                    Hora de actualizarse
                                </div>
                                <div class="">
                                    Hemos enviado un correo a <b>${this.user.email}</b> con las instrucciones para que actualices tu contraseña y puedas acceder a Site
                                </div>
                                <div class="text-xs mt-3">
                                    <stong>Importante</stong>
                                    <div>
                                        Puedes recibar en bandeja de spam o correos no deseados si no encuentras tu correo
                                    </div>
                                </div>
                            </div>
                        `,
                        _class:'bg-gradient-primary text-white'
                    })
                }
            })
        },
        checkEmail() {
            this.isValidMail = isValidMail(this.user.email)
        },
        checkFields() {
            this.userComplete = this.user.email && this.user.password
        }
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language

        if(getParam('page'))
        {
            this.redirection.page = getParam('page')
            this.redirection.route_name = getParam('route_name')
        }
    },
    template: `
        <div v-if="redirection.page" class="card animate__animated animate__bounceInLeft mb-3">
            <div class="card-body">
                Ingresa a tu cuenta para continuar a: 
                <div><b>{{ redirection.route_name }}</b></div>
                <div><b>{{ redirection.page }}</b></div>
            </div>
        </div>

        <div class="p-3 bg-transparent text-start cards-plain bg-white animation-fall-down" style="--delay: 0.8s">
            <div class="card bg-transparent shadow-none">
                <div class="card-header pb-0 bg-transparent text-center">
                    <div class="row justify-content-center">
                        <div class="col-6 col-md-10 col-xl-3">
                            <img src="../../src/img/logo-single-dark.svg" title="logo" alt="logo" class="w-100"/>
                        </div>
                    </div>
                </div>

                <div class="card-header text-center bg-transparent">
                    <h4 class="font-weight-bolder text-dark text-gradient">{{Translator.words.welcome_home}}</h4>
                </div>
            </div>

            <div class="card shadow-none bg-transparent">
                <div class="card-body">
                    <form role="form">
                        <div class="form-floating mb-3">
                            <input 
                                :autofocus="true"
                                :class="isValidMail ? 'is-valid' : ''"
                                @keydown.enter.exact.prevent="$refs.password.focus()"
                                type="email" id="email" ref="email" v-model="user.email" class="form-control" :placeholder="Translator.words.email" :aria-label="Translator.words.email" aria-describedby="email-addon">
                            <label class="text-sm" for="email">{{Translator.words.email}}</label>
                        </div>
                            
                        <div class="form-floating mb-3 position-relative">
                            <input 
                                :type="fieldPasswordType"
                                :class="user.password ? 'is-valid' : ''"
                                @keydown.enter.exact.prevent="doLogin"
                                type="password" ref="password" id="password" v-model="user.password" class="form-control" :placeholder="Translator.words.password" :aria-label="Translator.words.password" aria-describedby="password-addon">
                            
                            <label class="text-sm" for="password">{{Translator.words.password}}</label>
                            
                            <div class="position-absolute end-0 top-0">
                                <button class="btn btn-primary mb-0 mt-2 me-2 shadow-none" type="button" id="button-addon2" @click="toggleFieldPasswordType">
                                    <i v-if="fieldPasswordType == 'password'" class="bi bi-eye"></i>
                                    <i v-else class="bi bi-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" v-model="user.rememberMe" id="rememberMe">
                                    <label class="form-check-label" for="rememberMe">{{Translator.words.remember}}</label>
                                </div>
                            </div>
                            <div class="col-auto text-end">
                                <a class="small" href="../../apps/login/forgotPassword">{{Translator.words.forgot_password}}</a>
                            </div>
                        </div>

                        <div v-show="feedback" class="alert alert-light shadow fw-semibold border-0 alert-dismissible fade show" role="alert">
                            <strong>Aviso</strong>
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <div class="mt-3 d-grid">
                            <button
                                :disabled="!userComplete || busy" 
                                @click="doLogin"
                                type="button" class="btn btn-primary shadow-none btn-lg">
                                <span v-if="busy">
                                    ...
                                </span>
                                <span v-else>
                                    {{Translator.words.login}}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-footer text-center pt-0 px-lg-2 px-1 mt-3">
                <p class="mb-4 text-sm mx-auto">
                    {{Translator.words.dont_have_account_yet}}
                    <a href="../../apps/signup" class="text-info text-primary font-weight-bold">{{Translator.words.signup_here}}</a>
                </p>
            </div>
        </div>
    `
}

export { LoginViewer }