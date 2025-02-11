import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.8'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.1.8' 
import LeadModel from '../../src/js/models/lead.module.js?v=1.1.8'

const AddleadViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            feedback: null,
            countries: {},
            user: LeadModel,
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
                        message: 'Usuario guardado correctamente. Redireccionando...',
                    })

                    setTimeout(()=>{
                        window.location.href = `../../apps/admin-lead/`
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
            this.UserSupport.getCountries({  }, (response) => {
                if (response.s == 1) {
                    this.countries = {...this.countries, ...response.countries}
                }
            })
        },
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-xl"> 
                        <div class="h5">Añadir prospecto</div>
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
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Usuario *</label>
                        <input 
                            :autofocus="true"
                            :class="user.user_data.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.user_data.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Correo *</label>
                        <input 
                            v-model="user.user_login.email"
                            :class="user.user_login.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.password.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    
                    <div class="col-12 col-xl-6 mb-3 d-none">
                        <label>Nombre de usuario</label>
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.space.prevent
                            ref="landing"
                            type="text" class="form-control" placeholder="Nombre de usuario">
                    </div>
                    <div class="col-12 d-none col-xl-6">
                        <label>Contraseña</label>
                        <input 
                            v-model="user.user_login.password"
                            :class="user.user_login.password ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.user_referral.focus()"
                            ref="password"
                            type="text" class="form-control" placeholder="Password">
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

export { AddleadViewer } 