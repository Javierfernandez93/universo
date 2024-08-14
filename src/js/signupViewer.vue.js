import { User } from '../../src/js/user.module.js?v=1.1.6'   
import { Translator } from '../../src/js/translator.module.js?v=1.1.6'   

const SignupViewer = {
    name: 'signup-viewer',
    data() {
        return {
            User : new User,
            Translator : new Translator,
            user: {
                email: null,
                phone: null,
                names: null,
                country_id: 159, // loads by default México
                passwordAgain: null,
                password: null,
                user_account: {
                    landing: null
                },
                referral: {
                    user_login_id: 0,
                    names: '',
                    image : ''
                },
                utm: false,
            },
            passwordFeedback : null,
            countries : {},
            loading : false,
            feedback : false,
            isValidMail : false,
            passwordsMatch : null,
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
                this.checkEmail()
                this.checkFields()
                this.checkPasswords()
            },
            deep: true
        },
    },
    methods: {
        getReferral(user_login_id) {
            this.feedback = false

            this.User.getReferral({user_login_id:user_login_id,utm:this.user.utm},(response)=>{
                if(response.s == 1)
                {
                   Object.assign(this.user.referral,response.referral)
                } else if(response.r == "NOT_DATA") {
                    this.feedback = "No encontramos información del link de referido proporcionado"
                }
            })
        },
        toggleFieldPasswordType() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        doSignup() {
            this.loading = true
            this.feedback = false
            
            this.User.doSignup(this.user,(response)=>{
                this.loading = false

                if(response.s == 1)
                {
                    window.location.href = `../../apps/backoffice`
                    // alertInfo({
                    //     icon:'<i class="bi bi-ui-checks"></i>',
                    //     message: 'Hemos enviado un correo para que actives tu cuenta',
                    //     _class:'bg-gradient-success text-white'
                    // })
                } else if(response.r == "MAIL_ALREADY_EXISTS") {
                    this.feedback = 'El correo proporcionado ya existe'
                } else if(response.r == "USER_NAME_EXIST") {
                    this.feedback = 'El nombre de usuario ya existe'
                }
            })
        },
        checkUserName: _debounce((self) => {
            self.$refs.landing.classList.remove('is-valid')
            self.$refs.landing.classList.remove('is-invalid')
            self.feedback = null
            self.User.checkUserName({landing:self.user.user_account.landing}, (response) => {
                if (response.s == 1) 
                {
                    self.$refs.landing.classList.add('is-valid')
                } else {
                    self.$refs.landing.classList.add('is-invalid')
                    self.$refs.landing.focus()
                    self.feedback = 'El nombre de usuario ya existe'
                }
            })
        },500),
        getCountries() {
            this.User.getCountries(this.user,(response)=>{
                if(response.s == 1)
                {
                    this.countries = response.countries
                }
            })
        },
        checkEmail() {
            this.isValidMail = isValidMail(this.user.email)
        },
        getUtm() {
            if(window.location.pathname.split('/').inArray('join') != -1) {
                this.user.utm = 'join'
            }
        },
        checkPasswords() {
            if(this.user.password != null && this.user.passwordAgain != null)
            {
                if(this.user.passwordAgain != this.user.password)   
                {
                    this.passwordFeedback = `<span class="text-danger fw-bold"><i class="bi bi-patch-exclamation"></i> Las contraseñas no coinciden</span>`
                } else {
                    this.passwordFeedback = '<span class="text-success fw-bold"><i class="bi bi-patch-check"></i> Las contraseñas coinciden</span>'
                }
            }
        },
        checkFields() {
            this.userComplete = this.isValidMail && this.user.password && this.user.phone && this.user.names
        }
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language

        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()

        this.getUtm() 

        if(getParam('uid'))
        {
            this.user.referral.user_login_id = getParam('uid')
            this.getReferral(getParam('uid'))
        }
    },
    template: `
        <div class="card bg-transparent text-start shadow-none animation-fall-down" style="--delay:0.6s">
            <div class="card-header pb-0 bg-transparent">
                <div class="row justify-content-center">
                    <div class="col-3 col-xl-3">
                        <img src="../../src/img/logo.svg" title="logo" alt="logo" class="w-100"/>
                    </div>
                </div>
            </div>
            <div class="card-header pb-0 text-left bg-transparent">
                <p class="lead fs-3 text-dark text-center sans"><span v-html="Translator.words.welcome_Site"></span></p>
                <div
                    v-if="user.referral.user_login_id" class="fs-4 fw-sembold">
                    <div class="text-secondary">Referido por <span class="fw-semibold text-primary">{{user.referral.names}}</span></div>
                </div>
            </div>
            <div v-if="user.referral.user_login_id" class="card-body">
                <div class="form-floating mb-3">
                    <input 
                        :class="user.names ? 'is-valid' : ''"
                        :autofocus="true" id="names" type="text" ref="names" v-model="user.names" class="form-control" @keydown.enter.exact.prevent="$refs.phone.focus()" :placeholder="Translator.words.name" :aria-label="Translator.words.name" aria-describedby="basic-addon1">
                        
                    <label for="names">{{Translator.words.name}}</label>
                </div>
                
                <div class="form-floating mb-3">
                    <input 
                        :class="user.names ? 'is-valid' : ''"
                        @keypress="checkUserName(this)"
                        :autofocus="true" id="landing" @keydown.space.prevent type="text" ref="landing" v-model="user.user_account.landing" class="form-control" @keydown.enter.exact.prevent="$refs.phone.focus()" :placeholder="Translator.words.name" :aria-label="Translator.words.name" aria-describedby="basic-addon1">
                        
                    <label for="landing">{{Translator.words.user_name}}</label>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <div class="form-floating">
                            <select class="form-select" v-model="user.country_id" id="country_id" aria-label="Selecciona tu país">
                                <option>{{Translator.words.select_your_country}}</option>
                                <option v-for="country in countries" v-bind:value="country.country_id">
                                    {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                </option>
                            </select>
                            <label for="country_id">{{Translator.words.select_your_country}}</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating">
                            <input 
                                :class="user.phone ? 'is-valid' : ''"
                                id="phone"
                                type="text" ref="phone" v-model="user.phone" class="form-control" @keydown.enter.exact.prevent="$refs.email.focus()" :placeholder="Translator.words.phone" :aria-label="Translator.words.phone" aria-describedby="basic-addon1">
                                
                            <label for="phone">{{Translator.words.phone}}</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-floating mb-3">
                    <input 
                        :class="isValidMail ? 'is-valid' : ''"
                        type="email" ref="email" id="email" v-model="user.email" class="form-control" @keydown.enter.exact.prevent="$refs.password.focus()" :placeholder="Translator.words.email" :aria-label="Translator.words.email" aria-describedby="basic-addon1">
                    <label for="email">{{Translator.words.email}}</label>
                </div>

                <div class="form-floating mb-3 position-relative">
                    <input 
                        :class="user.password ? 'is-valid' : ''"
                        :type="fieldPasswordType" 
                        ref="password" 
                        id="password"
                        @keydown.enter.exact.prevent="$refs.passwordAgain.focus()" 
                        v-model="user.password" 
                        class="form-control" :placeholder="Translator.words.password" :aria-label="Translator.words.password" aria-describedby="basic-addon1">

                    <label for="password">{{Translator.words.password}}</label>

                    <div class="position-absolute end-0 top-0">
                        <button class="btn btn-primary mb-0 mt-2 me-2 shadow-none" type="button" id="button-addon2" @click="toggleFieldPasswordType">
                            <span v-if="fieldPasswordType == 'password'">{{Translator.words.show}}</span>
                            <span v-else>{{Translator.words.hide}}</span>
                        </button>
                    </div>
                </div>
                
                <div class="form-floating mb-3 position-relative">
                    <input 
                        :class="user.password != null && user.password == user.passwordAgain ? 'is-valid' : 'is-invalid'"
                        :type="fieldPasswordType" 
                        ref="passwordAgain" 
                        id="passwordAgain"
                        @keydown.enter.exact.prevent="doSignup" 
                        v-model="user.passwordAgain" 
                        class="form-control" :placeholder="Translator.words.password" :aria-label="Translator.words.password" aria-describedby="basic-addon1">
                    
                    <label for="passwordAgain">{{Translator.words.password}} {{Translator.words.again}}</label>
                    
                    <div class="position-absolute end-0 top-0">
                        <button class="btn btn-primary mb-0 mt-2 me-2 shadow-none" type="button" id="button-addon2" @click="toggleFieldPasswordType">
                            <span v-if="fieldPasswordType == 'password'">{{Translator.words.show}}</span>
                            <span v-else>{{Translator.words.hide}}</span>
                        </button>
                    </div>
                </div>
                
                <small v-if="passwordFeedback != null" class="form-text mt-3 text-muted" v-html="passwordFeedback">
                </small>

                <div v-show="feedback" class="alert alert-light shadow fw-semibold alert-dismissible fade show" role="alert">
                    <div><strong>Aviso</strong></div>
                    {{ feedback }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <button :disabled="!userComplete || loading" class="btn btn-primary shadow-none btn-lg w-100 mt-4 mb-0" @click="doSignup" id="button">
                    <span v-if="!loading" class="text-center">
                        {{Translator.words.join_now}}
                    </span>
                    <span v-else>
                        <div class="spinner-border" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </span>
                </button>
            </div>    
            <div v-else class="text-center fs-4 mb-5">
                <strong>Aviso</strong>    
                <div>
                    Necesitas un enlace de invitación para poder ser parte de nuestra comunidad
                </div>
            </div>    
            <div class="card-footer text-center pt-0 px-lg-2 px-1">
                <p class="mb-4 text-sm mx-auto">
                    {{Translator.words.already_acocunt}}
                    <a href="../../apps/login" class="text-primary font-weight-bold">{{Translator.words.login}}</a>
                </p>
            </div>
        </div>    
    `
}

export { SignupViewer }