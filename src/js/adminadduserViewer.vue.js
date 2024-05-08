import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.6'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.6'   

const AdminadduserViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            feedback: null,
            sponsors: null,
            countries: {},
            user: {
                user_login: {
                    password: null,
                    email: '',
                    catalog_user_type_id: 1, // sellter
                },
                user_data : {
                    names: null,
                },
                user_contact : {
                    phone: null,
                },
                user_address : {
                    country_id: 159,
                },
                user_account: {
                    landing: null,
                },
                user_referral: {
                    user_login_id: null,
                    user_support_id: null
                }
            },
        }
    },
    watch: {
        user: {
            handler() {
                this.filled = this.user.user_data.names != null && this.user.user_login.email.isValidMail() && this.user.user_contact.phone
            },
            deep: true
        }
    },
    methods: {
        saveUser() {
            this.feedback = null

            this.UserSupport.saveUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                    
                    toastInfo({
                        message: 'asesor guardado correctamente. Redireccionando...',
                    })

                    setTimeout(()=>{
                        window.history.back()
                    },3000)

                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    toastInfo({
                        message: 'El correo proporcionado ya está registrado',
                    })
                } else if (response.r == 'USER_NAME_EXIST') {

                    toastInfo({
                        message: 'El nombre de usuario ya está registrado',
                    })
                }
            })
        },
        getAdminReferralProfile: _debounce((self) => {
            self.UserSupport.getAdminReferralProfile({referral_id:self.user.user_referral.user_login_id}, (response) => {
                if (response.s == 1) {
                    self.user.user_referral = {...self.user.user_referral,...response.profile} 
                }
            })
        },500),
        getCountries() {
            this.busy = true
            this.UserSupport.getCountries({  }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.countries = {...this.countries, ...response.countries}
                }
            })
        },
        getAdministrators() {
            this.busy = true
            this.UserSupport.getAdministrators({ catalog_support_type_id: 2 }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.sponsors = response.administrators

                    this.user.user_referral.user_support_id = this.sponsors[0].user_support_id

                    setTimeout(()=>{
                        $('.selectpicker').selectpicker();
                        $('.selectpicker').change(() =>{
                            this.user.user_referral.user_support_id = $('.selectpicker').val();
                        });
                    },100)
                }
            })
        },
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()
        this.getAdministrators()
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <backViewer></backViewer>
                    </div>
                    <div class="col-12 col-xl"> 
                        <div class="h5">Añadir asesor</div>
                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveUser">Guardar usuario</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-4 mb-3">
                        <label>Usuario *</label>
                        <input 
                            :autofocus="true"
                            :class="user.user_data.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.user_data.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 col-xl-4 mb-3">
                        <label>Correo *</label>
                        <input 
                            v-model="user.user_login.email"
                            :class="user.user_login.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.password.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    
                    <div class="col-12 col-xl-4">
                        <label>Contraseña</label>
                        <input 
                            v-model="user.user_login.password"
                            :class="user.user_login.password ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.user_referral.focus()"
                            ref="password"
                            type="text" class="form-control" placeholder="Password">
                    </div>
                    <div class="col-12 col-xl-3 mb-3">
                        <label>Nombre de usuario</label>
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.space.prevent
                            ref="landing"
                            type="text" class="form-control" placeholder="Nombre de usuario">
                    </div>
                    <div class="col-12 col-xl-3 mb-3">
                        <div v-if="sponsors" class="col-12 col-md">
                            <label>Asignar a líder</label>
                            <select class="selectpicker form-control" data-live-search="true" data-style="border shadow-none">
                                <option v-for="sponsor in sponsors" :data-tokens="sponsor.names" :data-content="sponsor.names">{{ sponsor.user_support_id }}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-12 col-xl-6 d-none mb-3">
                        <label>Referido por</label>
                        <input 
                            v-model="user.user_referral.user_login_id"
                            :class="user.user_referral.user_login_id ? 'is-valid' : ''"
                            @keypress="getAdminReferralProfile(this)"
                            ref="number"
                            type="text" class="form-control" placeholder="Enter para buscar">

                        <div v-if="user.user_referral.names" class="alert mb-0 mt-2 alert-info text-center text-white">
                            {{user.user_referral.names}}
                        </div>
                    </div>

                    <div class="col-12 col-xl-6 mb-3">
                        <label>Teléfono * </label>
                        <div class="row">
                            <div class="col-auto">
                                <select class="form-select" v-model="user.user_address.country_id" aria-label="Selecciona tu país">
                                    <option>Selecciona tu país</option>
                                    <option v-for="country in countries" v-bind:value="country.country_id">
                                        {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                    </option>
                                </select>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <input 
                                        :class="user.user_contact.phone ? 'is-valid' : 'is-invalid'"
                                        ref="phone"
                                        type="text" ref="phone" v-model="user.user_contact.phone" class="form-control" @keydown.enter.exact.prevent="saveUser" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { AdminadduserViewer } 