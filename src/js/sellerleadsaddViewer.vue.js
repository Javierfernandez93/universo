import { User } from '../../src/js/user.module.js?v=1.1.8'   

const SellerleadsaddViewer = {
    emits : ['update'],
    data() {
        return {
            User: new User,
            filled: false,
            sellers: null,
            sellersAux: null,
            query: null,
            feedback: null,
            countries: {},
            user: {
                user_login : {
                    email : '',
                    user_login_id : null,
                    password : null,
                    catalog_user_type_id: 2, // lead
                },
                user_data : {
                    names : null,
                    last_name : null,
                    sur_name : null,
                },
                user_address : {
                    address : null,
                    country_id : 159,
                    city : null,
                    state : null,
                    zip_code : null,
                    colony : null,
                },
                user_contact : {
                    phone : null,
                    cellular : null,
                },
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
        add(user_login_id) {

            if(user_login_id)
            {
                this.user.user_login.user_login_id = user_login_id

                this.getUserForEdit()
            }

            $(this.$refs.offcanvasRight).offcanvas('show')
        },
        getUserForEdit() {
            this.User.getUserForEdit({user_login_id:this.user.user_login.user_login_id},(response)=>{
                if (response.s == 1) {
                    this.user = {
                        ...this.user,
                        ...response.user
                    }
                }
            })
        },
        saveUser() {
            this.feedback = null

            this.User.saveUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                    
                    toastInfo({
                        message: 'Prospecto guardado correctamente',
                    })

                    $(this.$refs.offcanvasRight).offcanvas('hide')

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
            self.User.getAdminReferralProfile({referral_id:self.user.referral.user_login_id}, (response) => {
                if (response.s == 1) {
                    self.user.referral = {...self.user.referral,...response.profile} 
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
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        

        this.getCountries()
    },
    /* html */
    template : `
        <div class="offcanvas offcanvas-end" tabindex="-1" ref="offcanvasRight" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Añadir prospecto</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label class="">Nombre de prospecto *</label>
                        <input 
                            :autofocus="true"
                            :class="user.user_data.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.user_data.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="">Correo *</label>
                        <input 
                            v-model="user.user_login.email"
                            :class="user.user_login.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.landing.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    
                    <div class="col-12 mb-3 d-none">
                        <label class="">Nombre de usuario</label>
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.space.prevent
                            @keydown.enter.exact.prevent="$refs.address.focus()"
                            ref="landing"
                            type="text" class="form-control" placeholder="Nombre de usuario">
                    </div>
                    
                    <div class="col-12 mb-3">
                        <label class="">Teléfono * </label>
                        <div class="row">
                            <div class="col">
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
                <div v-if="feedback" class="alert alert-light  text-center"> {{feedback}} </div>

                <button  :disabled="!filled" ref="button" type="submit" class="btn shadow-none mb-0 btn-primary px-3 btn-sm" @click="saveUser">Guardar</button>
            </div>
        </div>

    `
}

export { SellerleadsaddViewer }