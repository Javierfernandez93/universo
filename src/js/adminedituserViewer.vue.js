import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.8'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.1.8'   

const AdminedituserViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            countries: null,
            user: {
                signup_date: null,
                password: null,
                email: null,
                user_data : {
                    names: null,
                },
                user_address: {
                    country_id: 159
                },
                user_account: {
                    landing: null,
                },
                referral: {
                    user_login_id: null
                },
                user_contact : {
                    phone: null,
                }
            },
        }
    },
    watch: {
        user: {
            handler() {
                this.filled = this.user.user_data.names != null && this.user.email != null

            },
            deep: true
        }
    },
    methods: {
        updateUser() {
            this.UserSupport.updateUser({ user: this.user }, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Actualizado"

                    toastInfo({
                        message: 'asesor actualizado. Redireccionando...',
                    })

                    setTimeout(()=>{
                        window.location.href = `../../apps/admin-users/`
                    },3000)
                }
            })
        },
        getReferral(referral_user_login_id,user_login_id) {
            this.UserSupport.getReferral({referral_user_login_id:referral_user_login_id,user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.user.referral.names = response.referral.names
                    this.user.referral.commission = response.commission
                }
            })
        },
        getUser(user_login_id) {
            return new Promise( (resolve) => {
                this.UserSupport.getUser({ user_login_id: user_login_id }, (response) => {
                    if (response.s == 1) {
                        this.user = {...this.user,...response.user}

                        this.user.referral.user_login_id = response.user_referral_id
                        
                        this.user.user_address.country_id = response.user.country_id
                        this.user.user_contact.phone = response.user.phone
                        this.user.user_data.names = response.user.names
                        this.user.user_account.landing = response.user.landing
                    }

                    resolve(response.user_referral_id)
                })
            })
        },
        getAdminReferralProfile: _debounce((self) => {
            self.UserSupport.getAdminReferralProfile({referral_id:self.user.referral.user_login_id}, (response) => {
                if (response.s == 1) {
                    self.user.referral = {...self.user.referral,...response.profile} 
                } else if(response.r == "NOT_PROFILE") {
                    self.user.referral = {
                        user_login_id: null
                    }
                }
            })
        },500),
        getCountries() {
            this.UserSupport.getCountries({  }, (response) => {
                if (response.s == 1) {
                    this.countries = response.countries
                }
            })
        },
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()

        if (getParam('ulid')) {
            this.getUser(getParam('ulid')).then((user_login_id) => {
                
            })
        }
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <backViewer></backViewer>
                    </div>
                    <div class="col-12 col-xl"> 
                        <div class="h5">Editar asesor</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn mb-0 shadow-none btn-success px-3 btn.sm" @click="updateUser">Actualizar</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-6">
                        <label>Nombre completo</label>
                        <input 
                            :autofocus="true"
                            :class="user.user_data.names ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.user_data.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre completo">
                    </div>
                    <div class="col-12 col-xl-6">
                        <label>Correo</label>
                        <input 
                            v-model="user.email"
                            :class="user.email ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.password.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12 col-xl-6">
                        <label>Nombre de usuario</label>      
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.phone.focus()"
                            ref="landing"
                            type="text" class="form-control" placeholder="nombre de usuario">
                    </div>
                    <div class="col-12 col-xl-6">
                        <label>Contraseña</label>      
                        <input 
                            v-model="user.password"
                            :class="user.password ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.phone.focus()"
                            ref="password"
                            type="text" class="form-control" placeholder="Password">
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-xl-6 d-none">
                        <label>Referido por</label>
                        <input 
                            v-model="user.referral.user_login_id"
                            :class="user.referral.user_login_id ? 'is-valid' : ''"
                            @keypress="getAdminReferralProfile(this)"
                            ref="referral_id"
                            type="number" class="form-control" placeholder="Número">
                        
                        <div v-if="user.referral.names" class="alert mb-0 mt-2 alert-info text-center text-white">
                            {{user.referral.names}}
                        </div>
                    </div>
                    <div class="col-12 col-xl-6">
                        <label>Teléfono</label>
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
                                        :class="user.phone ? 'is-valid' : ''"
                                        ref="phone"
                                        type="text" ref="phone" v-model="user.phone" class="form-control" @keydown.enter.exact.prevent="saveUser" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminedituserViewer } 