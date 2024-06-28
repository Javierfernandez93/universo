import { User } from '../../src/js/user.module.js?v=1.0.1'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.1' 
import ModalViewer from '../../src/js/modalViewer.vue.js?v=1.0.1'
 
const SellerclientsaddViewer = {
    components : {
        BackViewer,
        ModalViewer
    },
    emits: ['update'],
    data() {
        return {
            User: new User,
            filled: false,
            feedback: null,
            countries: {},
            user: {
                user_login: {
                    user_login_id: null,
                    password: null,
                    email: '',
                    nationality: 'Méxicano',
                    catalog_user_type_id: 3, // client
                },
                user_contact : {
                    phone: null,
                },
                user_address : {
                    country_id: 159,
                    address: null,
                    zip_code: null,
                    external_number: null,
                    colony: null,
                    city: null,
                    state: null,
                },
                user_data: {
                    names: null,
                    last_name: null,
                    sur_name: null,
                    marital_status: 'single',
                    nationality: 'Méxicano',
                    fiscal_status: 'business_activity',
                    rfc: '',
                    curp: '',
                    birthdate: null,
                    employment_status: 'employed',
                    gender: 'male',
                },
                user_reference : [
                    {
                        name: null,
                        last_name: null, 
                        sur_name : null,
                        phone: null,
                        email: '',
                    },
                    {
                        name: null,
                        last_name: null,
                        sur_name : null,
                        phone: null,
                        email: '',
                    }
                ],
                user_account: {
                    landing: null,
                },
                user_referral: {
                    referral_id: null
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

            this.User.saveUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                    
                    toastInfo({
                        message: 'Cliente guardado correctamente. Redireccionando...',
                    })

                    this.$refs.modal.hide()
                    this.$emit('update')

                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    toastInfo({
                        message: 'El correo proporcionado ya está registrado',
                    })

                    this.feedback = 'El correo proporcionado ya está registrado'
                } else if (response.r == 'USER_NAME_EXIST') {

                    toastInfo({
                        message: 'El nombre de usuario ya está registrado',
                    })

                    this.feedback = 'El nombre de usuario ya está registrado'
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
            this.User.getCountries({  }, (response) => {
                if (response.s == 1) {
                    this.countries = {...this.countries, ...response.countries}
                }
            })
        },
        showRFCInfo() {
            alertMessage('Clave del RFC a 13 posiciones si es persona física o 12 posiciones si es persona moral, si se trata de contribuyentes.')
        },
        showCurpInfo() {
            alertMessage('La CURP se integra por 18 caracteres.')
        },
        getSellers() {
            this.User.getUsers({  }, (response) => {
                if (response.s == 1) {
                    this.sellers = response.users
                    this.sellersAux = response.users

                    setTimeout(()=>{
                        $('.selectpicker').selectpicker();
                        
                        $('.selectpicker').change(() =>{
                            this.user.user_referral.user_login_id = $('.selectpicker').val();
                        });
                    },100)
                }
            })
        },
        getUserToEdit() {
            this.User.getUserToEdit({ user_login_id: this.user.user_login.user_login_id }, async (response) => {
                if (response.s == 1) {
                    this.user = {...this.user, ...response.user}

                    await sleep(1000)

                    console.log(this.user.user_referral.user_login_id)

                    $(".selectpicker").val(this.user.user_referral.referral_id)
                    $(".selectpicker").selectpicker("refresh")
                }
            })
        },
        add(user_login_id)
        {
            if(user_login_id)
            {
                this.user.user_login.user_login_id = user_login_id

                this.getUserToEdit()
            }

            this.$refs.modal.show()
        },
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()
        
        if(getParam('ulid'))
        {
            this.user.user_login.user_login_id = getParam('ulid')

            this.getUserToEdit()
        }
    },
    template : `
        <ModalViewer title="Añadir cliente" ref="modal" size="modal-fullscreen">
            <div class="card">
                <div class="card-header"> 
                    <div class="row justify-content-center align-items-center"> 
                        <div class="col-12 col-xl-auto"> 
                            <BackViewer/>
                        </div>
                        <div class="col-12 col-xl"> 
                            <div class="h5">
                                <span v-text="user.user_login.user_login_id  ? 'Editar' : 'Añadir'"></span>
                                cliente
                            </div>


                            <div class="text-xs text-secondary">(* Campos requeridos)</div>
                        </div>
                        <div class="col-12 col-md-auto"> 
                            <button :disabled="!filled" ref="button" type="submit" class="btn shadow-none mb-0 btn-primary px-3 btn-sm" @click="saveUser">Guardar</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="text-xs text-secondary mb-3">- Información básica</div>

                    <div class="row">
                        <div class="col-12 col-md-4 mb-3">
                            <label>Nombre *</label>
                            <input 
                                :autofocus="true"
                                :class="user.user_data.names ? 'is-valid' : 'is-invalid'"
                                @keydown.enter.exact.prevent="$refs.email.focus()"
                                v-model="user.user_data.names"
                                ref="names"
                                type="text" class="form-control" placeholder="Nombre">
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Apellido paterno *</label>
                            <input
                                :autofocus="true"
                                :class="user.user_data.last_name ? 'is-valid' : 'is-invalid'"
                                @keydown.enter.exact.prevent="$refs.sur_name.focus()"
                                v-model="user.user_data.last_name"
                                ref="last_name"
                                type="text" class="form-control" placeholder="Apellido paterno">  
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Apellido materno *</label>
                            <input
                                :autofocus="true"
                                :class="user.user_data.sur_name ? 'is-valid' : 'is-invalid'"
                                @keydown.enter.exact.prevent="$refs.email.focus()"
                                v-model="user.user_data.sur_name"
                                ref="sur_name"
                                type="text" class="form-control" placeholder="Apellido materno">  
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Correo *</label>
                            <input 
                                v-model="user.user_login.email"
                                :class="user.user_login.email.isValidMail() ? 'is-valid' : 'is-invalid'"
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
                            <label>Genero</label>
                            <select v-model="user.user_data.gender" class="form-control">
                                <option value="male">Masculino</option>
                                <option value="female">Femenino</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Estado civil</label>
                            <select v-model="user.user_data.marital_status" class="form-control">
                                <option value="single">Soltero</option>
                                <option value="married">Casado</option>
                                <option value="divorced">Divorciado</option>
                                <option value="widower">Viudo</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Estado civil</label>
                            <select v-model="user.user_data.fiscal_status" class="form-control">
                                <option value="business_activity">Actividad Empresarial</option>
                                <option value="leasing">Arrendamiento</option>
                                <option value="salaried">Asalariado</option>
                                <option value="interests">Intereses</option>
                                <option value="professional_services">Servicios profesionales</option>
                                <option value="fiscal_incorporation">Incorporación Fiscal</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-4 mb-3">
                            <label>Estado de trabajo</label>
                            <select v-model="user.user_data.employment_status" class="form-control">
                                <option value="employed">Empleado</option>
                                <option value="unemployed">Desempleado</option>
                                <option value="retired">Jubilado</option>
                                <option value="student">Estudiante</option>
                            </select>
                        </div>
                        
                        <div class="col-12 col-md-4 mb-3 d-none">
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
                                v-model="user.user_address.zip_code"
                                :class="user.user_address.zip_code ? 'is-valid' : ''"
                                @keydown.enter.exact.prevent="$refs.external_number.focus()"
                                ref="zip_code"
                                type="text" class="form-control" placeholder="Código postal">
                        </div>
                        <div class="col-12 col-md-2 mb-3">
                            <label>Número exterior</label>
                            <input 
                                v-model="user.user_address.external_number"
                                :class="user.user_address.external_number ? 'is-valid' : ''"
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
                        <div class="col-12 col-md-3 mb-3">
                            <label>Estado</label>
                            <input 
                                v-model="user.user_address.state"
                                :class="user.user_address.state ? 'is-valid' : ''"
                                @keydown.enter.exact.prevent="$refs.colony.focus()"
                                ref="state"
                                type="text" class="form-control" placeholder="Estado">
                        </div>
                        <div class="col-12 col-md-3 mb-3">
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
                            <label>Fecha de nacimiento</label>
                            <input 
                                v-model="user.user_data.birthdate"
                                :class="user.user_data.birthdate ? 'is-valid' : 'is-invalid'"
                                @keydown.enter.exact.prevent="$refs.rfc.focus()"
                                ref="birthdate"
                                type="date" class="form-control" placeholder="Fecha de nacimiento">
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
                        <div v-for="(user_reference,index) in user.user_reference" class="col-12 mb-5">
                            <div class="text-xs text-secondary mb-3">Referencia {{index+1}}</div>

                            <div class="row">
                                <div class="col-12 mb-3 col-md-4">
                                    <label>Nombre completo</label>
                                    <input 
                                        v-model="user_reference.names"
                                        :class="user_reference.names ? 'is-valid' : ''"
                                        type="text" class="form-control" placeholder="Nombre completo">
                                </div>
                                <div class="col-12 mb-3 col-md-4">
                                    <label>Apellido paterno</label>
                                    <input 
                                        v-model="user_reference.last_name"
                                        :class="user_reference.last_name ? 'is-valid' : ''"
                                        type="text" class="form-control" placeholder="Apellido">
                                </div>
                                <div class="col-12 mb-3 col-md-4">
                                    <label>Apellido materno</label>
                                    <input 
                                        v-model="user_reference.sur_name"
                                        :class="user_reference.sur_name ? 'is-valid' : ''"
                                        type="text" class="form-control" placeholder="Apellido">
                                </div>
                                <div class="col-12 mb-3 col-md-6">
                                    <label>Teléfono</label>
                                    <input 
                                        v-model="user_reference.phone"
                                        :class="user_reference.phone ? 'is-valid' : ''"
                                        type="text" class="form-control" placeholder="Teléfono">
                                </div>
                                <div class="col-12 mb-3 col-md-6">
                                    <label>Correo</label>
                                    <input 
                                        v-model="user_reference.email"
                                        :class="user_reference.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                                        type="text" class="form-control" placeholder="Correo">
                                </div>
                            </div>
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
        </ModalViewer>
    `,
}

export { SellerclientsaddViewer } 