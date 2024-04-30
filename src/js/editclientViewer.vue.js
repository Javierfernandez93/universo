import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.5'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.5'   

const EditclientViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            countries: null,
            user: {
                password: null,
                email: '',
                catalog_user_type_id: 3, // client
                user_data : {
                    names: null,
                },
                user_contact : {
                    phone: null,
                },
                user_address : {
                    country_id: 159,
                    zip_code: null,
                    external_number: null,
                    address: null,
                    colony: null,
                    city: null,
                    state: null,
                },
                user_data: {
                    nationality: 'Méxicano',
                    rfc: '',
                    curp: '',
                    reference_1: null,
                    reference_2: null,
                },
                user_account: {
                    landing: null,
                },
                referral: {
                    user_login_id: null
                }
            },
        }
    },
    watch: {
        user: {
            handler() {
                this.filled = this.user.names != null && this.user.email != null

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
                        message: 'Cliente actualizado',
                    })
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
                        
                        this.user.user_contact.phone = response.user.phone

                        this.user.user_data.names = response.user.names
                        this.user.user_data.nationality = response.user.nationality
                        this.user.user_data.rfc = response.user.rfc
                        this.user.user_data.curp = response.user.curp
                        this.user.user_data.reference_1 = response.user.reference_1
                        this.user.user_data.reference_2 = response.user.reference_2
                        
                        this.user.user_account.landing = response.user.landing

                        this.user.user_address.country_id = response.user.country_id
                        this.user.user_address.address = response.user.address
                        this.user.user_address.colony = response.user.colony
                        this.user.user_address.zip_code = response.user.zip_code
                        this.user.user_address.external_number = response.user.external_number
                        this.user.user_address.city = response.user.city
                        this.user.user_address.state = response.user.state
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
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-xl"> 
                        <div class="h5">Editar cliente</div>
                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-md-auto"> 
                        <button  :disabled="!filled" ref="button" type="submit" class="btn shadow-none mb-0 btn-primary px-3 btn-sm" @click="updateUser">Guardar</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="text-xs text-secondary mb-3">- Información básica</div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <label>Nombre completo *</label>
                        <input 
                            :autofocus="true"
                            :class="user.user_data.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.user_data.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre completo">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label>Correo *</label>
                        <input 
                            v-model="user.email"
                            :class="user.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.nationality.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label>Nacionalidad *</label>
                        <input 
                            v-model="user.user_data.nationality"
                            :class="user.user_data.nationality ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.landing.focus()"
                            ref="nationality"
                            type="text" class="form-control" placeholder="Nacionalidad">
                    </div>
                    
                    <div class="col-12 col-md-4 mb-3">
                        <label>Nombre de usuario</label>
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.space.prevent
                            @keydown.enter.exact.prevent="$refs.address.focus()"
                            ref="landing"
                            type="text" class="form-control" placeholder="Nombre de usuario">
                    </div>
                    
                    <div class="col-12 col-md-4 mb-3">
                        <label>Calle</label>
                        <input 
                            v-model="user.user_address.address"
                            :class="user.user_address.address ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.zip_code.focus()"
                            ref="address"
                            type="text" class="form-control" placeholder="Calle">
                    </div>
                    <div class="col-12 col-md-2 mb-3">
                        <label>Código postal</label>
                        <input 
                            v-model="user.address.zip_code"
                            :class="user.address.zip_code ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.external_number.focus()"
                            ref="zip_code"
                            type="text" class="form-control" placeholder="Código postal">
                    </div>
                    <div class="col-12 col-md-2 mb-3">
                        <label>Número exterior</label>
                        <input 
                            v-model="user.address.external_number"
                            :class="user.address.external_number ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.city.focus()"
                            ref="external_number"
                            type="text" class="form-control" placeholder="Número exterior">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label>Ciudad</label>
                        <input 
                            v-model="user.user_address.city"
                            :class="user.user_address.city ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.state.focus()"
                            ref="city"
                            type="text" class="form-control" placeholder="Ciudad">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label>Estado</label>
                        <input 
                            v-model="user.user_address.state"
                            :class="user.user_address.state ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="state"
                            type="text" class="form-control" placeholder="Estado">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                        <label>Colonia</label>
                        <input 
                            v-model="user.user_address.colony"
                            :class="user.user_address.colony ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="colony"
                            type="text" class="form-control" placeholder="Colonia">
                    </div>


                    <div class="col-12 col-md-3 mb-3">
                        <label>Curp <span class="text-decoration-underline text-primary cursor-pointer" @click="showCurpInfo">(Info)</span></label>
                        <input 
                            v-model="user.user_data.curp"
                            :class="user.user_data.curp.isValidCurp() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.curp.focus()"
                            ref="curp"
                            type="text" class="form-control" placeholder="CURP">
                    </div>
                    <div class="col-12 col-md-3 mb-3">
                        <label>RFC <span class="text-decoration-underline text-primary cursor-pointer" @click="showRFCInfo">(Info)</span></label>
                        <input 
                            v-model="user.user_data.rfc"
                            :class="user.user_data.rfc.isValidRfc() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.phone.focus()"
                            ref="rfc"
                            type="text" class="form-control" placeholder="RFC">
                    </div>
                    

                    <div class="col-12 col-md-6 mb-3">
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

                <div class="text-xs text-secondary mb-3">- Referencias personales</div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-3">
                        <label>Referencia 1</label>
                        <input 
                            v-model="user.user_data.reference_1"
                            :class="user.user_data.reference_1 ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.reference_2.focus()"
                            ref="reference_1"
                            type="text" class="form-control" placeholder="Nombre completo">
                    </div>
                    <div class="col-12 col-md-6 mb-3">
                        <label>Referencia 2</label>
                        <input 
                            v-model="user.user_data.reference_2"
                            :class="user.user_data.reference_2 ? 'is-valid' : ''"
                            ref="reference_2"
                            type="text" class="form-control" placeholder="Nombre completo">
                    </div>
                </div>
                <div v-if="sellers" class="row">
                    <div class="col-12 col-md-6 mb-3">
                        <label>Asignar a asesor</label>
                        <select class="selectpicker form-control" data-live-search="true" data-style="border shadow-none">
                            <option v-for="seller in sellers" :data-tokens="sellers.names" :data-content="seller.names">{{ seller.user_login_id }}</option>
                        </select>
                    </div>
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { EditclientViewer } 