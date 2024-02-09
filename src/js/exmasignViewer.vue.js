import { User } from '../../src/js/user.module.js?v=2.3.8'   
import { Translator } from '../../src/js/translator.module.js?v=2.3.8'   

const ExmasignViewer = {
    name : 'exmasign-viewer',
    data() {
        return {
            User: new User,
            Translator: new Translator,
            busy: false,
            firstStepComplete: false,
            filled: false,
            hasAccount: null,
            catalogMamAccounts : null,
            CATALOG_BROKER : {
                BRIDGE : 1,
                EXMA : 2,
            },
            countries : {},
            STATUS: {
                ACTIVED : 1,
                PENDING : 0,
            },
            workatfinancial : [
                {
                    value: 1,
                    text: 'Yes'
                },
                {
                    value: 0,
                    text: 'No'
                }
            ],
            annualincome : [
                {
                    value: '0 - 15k',
                    text: '0 - 15k'
                },
                {
                    value: '15k - 30k',
                    text: '15k - 30k'
                },
                {
                    value: '30k - 50k',
                    text: '30k - 50k'
                },
                {
                    value: '50k - 100k',
                    text: '50k - 100k'
                },
                {
                    value: '100k - 500k',
                    text: '100k - 500k'
                },
                {
                    value: '500k - 1m',
                    text: '500k - 1m'
                },
                {
                    value: '1m - 5m',
                    text: '1m - 5m'
                }
            ],
            networth : [
                {
                    value: '0 - 500k',
                    text: '0 - 500k'
                },
                {
                    value: '50k - 100k',
                    text: '50k - 100k'
                },
                {
                    value: '100k - 150k',
                    text: '100k - 150k'
                },
                {
                    value: '150k - 300k',
                    text: '150k - 300k'
                },
                {
                    value: '300k - 400k',
                    text: '300k - 400k'
                },
                {
                    value: '400k - 500k',
                    text: '400k - 500k'
                },
                {
                    value: '500k - 1m',
                    text: '500k - 1m'
                },
                {
                    value: '1m - 1.25m',
                    text: '1m - 1.25m'
                },
                {
                    value: '1.25m - 1.5m',
                    text: '1.25m - 1.5m'
                },
                {
                    value: '1.5m - 1.75m',
                    text: '1.5m - 1.75m'
                },
                {
                    value: '1.75m - 10m',
                    text: '1.75m - 10m'
                }
            ],
            knowcfd : [
                {
                    value: 1,
                    text: 'Yes'
                },
                {
                    value: 0,
                    text: 'No'
                }
            ],
            financiallevel : [
                {
                    value: 'I Hold A Professional Qualification In Finance/Economics',
                    text: 'I Hold A Professional Qualification In Finance/Economics'
                },
                {
                    value: 'I Received Higher Education In Finance And/Or Financial Services',
                    text: 'I Received Higher Education In Finance And/Or Financial Services'
                },
                {
                    value: 'In The Last 3 Years, Worked In A Role Relevant To Trading Derivatives, For Over 1 Year',
                    text: 'In The Last 3 Years, Worked In A Role Relevant To Trading Derivatives, For Over 1 Year'
                },
                {
                    value: 'None Of The Above',
                    text: 'None Of The Above'
                }
            ],
            politicallyexposed : [
                {
                    value: 'Yes',
                    text: 'Yes'
                },
                {
                    value: 'No',
                    text: 'No'
                }
            ],
            fully_aware_trading_not_sut : [
                {
                    value: 'Yes',
                    text: 'Yes'
                },
                {
                    value: 'No',
                    text: 'No'
                }
            ],
            fully_aware_underlying_assets : [
                {
                    value: 'Yes',
                    text: 'Yes'
                },
                {
                    value: 'No',
                    text: 'No'
                }
            ],
            fully_aware_trading_leveraged : [
                {
                    value: 'Yes',
                    text: 'Yes'
                },
                {
                    value: 'No',
                    text: 'No'
                }
            ],
            account: {
                catalog_mam_account_id : 1,
                first_name: null,
                last_name: null,
                _password: '',
                _email: '',
                address: '',
                postcode: null, // 0,1
                city: '', // 0,1
                country: null,
                phone_number: null,
                annualincome: '0 - 15k',
                networth: '0 - 500k',
                employment: 0,
                businessactivities: 0,
                birthdate: '2000-01-01',
                rent: 0,
                investmentsdeposits: 0,
                pension: 0,
                other: 0,
                // 
                workatfinancial: 0, // 0,1
                knowcfd: 1, // 0,1
                financiallevel: 'I Hold A Professional Qualification In Finance/Economics', // random
                politicallyexposed: 'No', // Yes,No
                fully_aware_trading_not_sut: 'Yes', // Yes
                fully_aware_underlying_assets: 'Yes', // Yes
                fully_aware_trading_leveraged: 'Yes', // Yes
                agreement : false,
                policy : false,
                disclosure : false,
            }
        }
    },
    watch: {
        account: {
            async handler() {
                this.firstStepComplete = this.account.first_name != null && this.account.last_name != null && this.account._password.securePassword() != null && this.account._email.isValidMail() != null && this.account.address.isValidAddress() != null && this.account.country != null && this.account.phone_number != null
                
                this.filled = this.account.first_name != null && this.account.last_name != null && this.account._password.securePassword() != null && this.account._email.isValidMail() != null && this.account.address.isValidAddress() != null && this.account.country != null && this.account.phone_number != null && this.account.postcode && this.account.birthdate && this.account.agreement
            },
            deep: true
        },
        language_code: {
            async handler() {
                if(this.Translator.language != this.language_code)
                {
                    await this.Translator.changeLanguage(this.language_code)

                    location.reload()
                }
            },
            deep: true
        }
    },
    methods : {
        getCountries() {
            this.User.getCountries(this.user,(response)=>{
                if(response.s == 1)
                {
                    this.countries = response.countries
                }
            })
        },
        signExmaAccount() {
            this.busy = true
            this.User.signExmaAccount(this.account,(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: 'Hemos dado de alta tu cuenta... Redirigiremos para que firmes el AOF.. espera',
                        _class:'bg-gradient-success text-white'
                    })

                    setTimeout(()=>{
                        window.location.href = '../../apps/aof/'
                    },3000)
                } else if(response.r == "NOT_PHONE_NUMBER") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa un número de teléfono',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_COUNTRY") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Selecciona un país',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_ADDRESS") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa una dirección',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_EMAIL") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa un correo electrónico',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_PASSWORD") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa una contraseña',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_LAST_NAME") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa tus apellidos',
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == "NOT_FIRST_NAME") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Ingresa tu nombre',
                        _class:'bg-gradient-danger text-white'
                    })
                }
            })
        },
        getBridgeAccount() {
            return new Promise((resolve,reject) => {
                this.User.getBridgeAccount({catalog_broker_id:this.CATALOG_BROKER.EXMA},(response)=>{
                    if(response.s == 1)
                    {
                        this.hasAccount = true
                        resolve(response.account)
                    }
                    
                    reject()
                })
            })
        },
        getProfile() {
            return new Promise((resolve,reject) => {
                this.User.getProfile({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.user)
                    }
                    
                    reject()
                })
            })
        },
        getCatalogMamAccount() {
            this.User.getCatalogMamAccount({},(response)=>{
                if(response.s == 1)
                {
                    this.catalogMamAccounts = response.catalogMamAccounts
                }
            })
        }
    },
    async mounted() 
    {       
        await this.Translator.init()
        
        this.language_code = this.Translator.language
        
        this.getCountries()
        
        this.getBridgeAccount().then((account) =>{
            this.account = account
        }).catch(() => {
            this.getCatalogMamAccount()

            this.getProfile().then((user)=>{
                const { email, names, country } = user

                this.account = {...this.account,...{
                    _email : email,
                    first_name : names,
                    country : country,
                }}
            })
            this.hasAccount = false
        })
    },
    template : `
        <div v-if="hasAccount">
            <div class="row">
                <div class="col-12">
                    <div v-if="account.status == STATUS.PENDING" class="alert alert-info text-center text-white">
                        Cuenta pendiente por dar de alta en <b>Bridge Funds</b>
                        <div>
                            Vuelve pronto estamos dando de alta tu cuenta en <b>Bridge Funds</b>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">Nombre(s)</div>
                            <div class="fw-sembold text-dark">{{account.first_name}}</div>
                        </div>
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">Apellidos</div>
                            <div class="fw-sembold text-dark">{{account.last_name}}</div>
                        </div>
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">Contraseña</div>
                            <div class="fw-sembold text-dark">{{account.password}}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                            <div class="text-secondary">Correo</div>
                            <div class="fw-sembold text-dark">{{account.email}}</div>
                        </div>
                        <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                            <div class="text-secondary">Dirección</div>
                            <div class="fw-sembold text-dark">{{account.address}}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">País</div>
                            <div class="fw-sembold text-dark">{{account.country}}</div>
                        </div>
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">Número de teléfono</div>
                            <div class="fw-sembold text-dark">{{account.phone_number}}</div>
                        </div>
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <div class="text-secondary">Cuenta</div>
                            <div class="fw-sembold text-dark">{{account.account}}</div>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-end d-none">
                        <div class="col-12 col-xl-4 mb-3 mb-xl-0">
                            <a href="https://exma-trading.com/" class="btn btn-primary mb-0 shadow-none" target="_blank">Ir a exma</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="hasAccount == false">
            <div class="mb-3">
                <div class="fs-4 text-primary fw-semibold">Ingresa tus datos para dar de alta tu cuenta en Exma</div>
                <div class="text-xs">* campo requerido</div>
            </div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" ref="firstStep" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><span class="badge bg-primary badge-pill me-2">Paso 1 </span> Información básica</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" ref="secondStep" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><span class="badge bg-primary badge-pill me-2">Paso 2 </span> Aspectos legales</button>
                </li>
            </ul>
            <div class="tab-content py-5" id="myTabContent">
                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <div class="row mb-3">
                        <div class="col-12 col-xl-6 mb-3 mb-xl-0">
                            <div class="form-floating">
                                <input @keypress.enter.exact="$refs.email.focus()" v-model="account.first_name" ref="first_name" :class="account.first_name ? 'is-valid' : 'is-invalid'" type="email" class="form-control" id="first_name" placeholder="">
                                <label for="first_name">Nombre(s)* </label>
                            </div>
                        </div>
                        
                        <div class="col-12 col-xl-6">
                            <div class="form-floating">
                                <input @keypress.enter.exact="$refs.password.focus()" v-model="account.last_name" ref="last_name" :class="account.last_name ? 'is-valid' : 'is-invalid'" type="email" class="form-control" id="last_name" placeholder="">
                                <label for="last_name">Apellido(s)* </label>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-center">
                        <div class="col-12 col-xl">
                            <div class="form-floating mb-3">
                                <input @keypress.enter.exact="$refs.last_name.focus()" v-model="account._email" ref="email" :class="account._email.isValidMail() ? 'is-valid' : 'is-invalid'" type="email" class="form-control" id="email" placeholder="">
                                <label for="email">Correo* </label>
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="form-floating mb-3">
                                <input @keypress.enter.exact="$refs.address.focus()" v-model="account.birthdate" ref="password" :class="account.birthdate ? 'is-valid' : 'is-invalid'" type="date" class="form-control" id="password" placeholder="">
                                <label for="password">Fecha de nacimiento* </label>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-center">
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <input @keypress.enter.exact="$refs.address.focus()" v-model="account._password" ref="password" :class="account._password.securePassword() ? 'is-valid' : 'is-invalid'" type="text" class="form-control" id="password" placeholder="">
                                <label for="password">Contraseña* </label>

                                <div v-if="!account._password.securePassword()" class="alert alert-danger text-center mt-2 p-2 text-xs text-white">
                                    Reglas de contraseña: la longitud mínima debe ser 5, la longitud máxima debe ser 15, debe contener al menos 1 letra mayúscula, debe contener al menos 1 letra minúscula, debe contener al menos 1 número. El ampersand (&) no es compatible
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-xl-4">
                            <div class="form-floating">
                                <input @keypress.enter.exact="$refs.country.focus()" v-model="account.address" ref="address" :class="account.address.isValidAddress() ? 'is-valid' : 'is-invalid'" type="text" class="form-control" id="address" placeholder="">
                                <label for="address">Dirección completa* </label>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="form-floating">
                                <input @keypress.enter.exact="$refs.country.focus()" v-model="account.city" ref="city" :class="account.city ? 'is-valid' : 'is-invalid'" type="text" class="form-control" id="address" placeholder="">
                                <label for="city">Ciudad* </label>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="form-floating">
                                <input @keypress.enter.exact="$refs.country.focus()" v-model="account.postcode" ref="postcode" :class="account.postcode ? 'is-valid' : 'is-invalid'" type="text" class="form-control" id="postcode" placeholder="">
                                <label for="postcode">Código Postal* </label>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-center">
                        <div class="col-12 col-xl-4">
                            <div class=" form-floating mb-3">
                                <select class="form-select" v-model="account.country" id="country_id" aria-label="Selecciona tu país">
                                    <option>{{Translator.words.select_your_country}}</option>
                                    <option v-for="country in countries" v-bind:value="country.nicename">
                                        {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                    </option>
                                </select>
                                <label for="country_id">{{Translator.words.select_your_country}}</label>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="form-floating mb-3">
                                <input @keypress.enter.exact="" v-model="account.phone_number" ref="phone_number" :class="account.phone_number ? 'is-valid' : 'is-invalid'" type="email" class="form-control" id="phone_number" placeholder="">
                                <label for="phone_number">Teléfono* </label>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4">
                            <div class="form-floating mb-3">
                                <input @keypress.enter.exact="" v-model="account.nationality" ref="nationality" :class="account.nationality ? 'is-valid' : 'is-invalid'" type="email" class="form-control" id="phone_number" placeholder="">
                                <label for="phone_number">Nacionalidad* </label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button :disabled="!firstStepComplete" @click="$refs.secondStep.click()" class="btn btn-primary shadow-none mb-0">
                            <span v-else>Siguiente</span>
                        </button>
                    </div>
                </div>
                <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                    <div class="row align-items-center">
                    
                        <div class="col-12">
                            <div class="form-floating mb-3">
                                <select class="form-select" v-model="account.politicallyexposed" id="politicallyexposed" aria-label="Selecciona tu país">
                                    <option v-for="item in politicallyexposed" v-bind:value="item.value">
                                        {{ item.text }}
                                    </option>
                                </select>
                                <label for="politicallyexposed">Eres una "Persona Políticamente Expuesta?" según la definición *</label>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <select class="form-select" v-model="account.annualincome" id="annualincome" aria-label="Selecciona tu país">
                                    <option v-for="item in annualincome" v-bind:value="item.value">
                                        {{ item.text }}
                                    </option>
                                </select>
                                <label for="annualincome">¿Cuáles son tus ingresos anuales? (en €)</label>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <select class="form-select" v-model="account.networth" id="networth" aria-label="Selecciona tu país">
                                    <option v-for="item in networth" v-bind:value="item.value">
                                        {{ item.text }}
                                    </option>
                                </select>
                                <label for="networth">¿Cuáles su patrimonio neto estimado? (en €)</label>
                            </div>
                            
                            <div class="form-floating mb-3">
                                <div>¿Cuál es su(s) fuente(s) de ingresos? (Selección múltiple) *</div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.employment" type="checkbox" value="1" id="employment">
                                    <label class="form-check-label" for="employment">
                                    Empleo
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.businessactivities" type="checkbox" value="1" id="businessactivities">
                                    <label class="form-check-label" for="businessactivities">
                                        Checked checkbox
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.rent" type="checkbox" value="1" id="rent" id="rent">
                                    <label class="form-check-label" for="rent">
                                        Rentas
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.investmentsdeposits" type="checkbox" value="1" id="investmentsdeposits" id="investmentsdeposits">
                                    <label class="form-check-label" for="investmentsdeposits">
                                        Inversiones/Depósitos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.pension" type="checkbox" value="1" id="pension">
                                    <label class="form-check-label" for="pension">
                                        Pensión
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" v-model="account.other" type="checkbox" value="1" id="other">
                                    <label class="form-check-label" for="other">
                                        Otro
                                    </label>
                                </div>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="agreement" v-model="account.agreement"> 
                                <label class="form-check-label" for="agreement">I agree to the <a href="">Client Agreement *</a></label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-floating mb-3">
                        <button :disabled="busy || !filled" @click="signExmaAccount" class="btn btn-primary shadow-none mb-0">
                            <span v-if="busy">...Espere... no cierre esta página</span>
                            <span v-else>Realizar registro</span>
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    `
}

export { ExmasignViewer }