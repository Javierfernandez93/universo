import { User } from '../../src/js/user.module.js?v=1.1.8'   

const SellerclientseditViewer = {
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
                company_id: null,
                names: null,
                password: null,
                email: '',
                address: null,
                colony: null,
                city: null,
                state: null,
                phone: null,
                catalog_user_type_id: 3, // client
                country_id: 159,
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
                this.filled = this.user.names != null && this.user.email.isValidMail() && this.user.phone
            },
            deep: true
        }
    },
    methods: {
        edit(company_id) {
            this.user.user_login_id = company_id
            this.getUserForEdit()
            $(this.$refs.offcanvasRight).offcanvas('show')
        },
        getUserForEdit() {
            this.User.getUserForEdit({company_id:this.user.user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.user = {...this.user,...response.user}
                }
            })
        },
        updateUser() {
            this.feedback = null

            this.User.updateUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                    
                    toastInfo({
                        message: 'Usuario actualizado correctamente',
                    })

                    $(this.$refs.modal).modal('hide')

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
                <h5 id="offcanvasRightLabel">Añadir cliente</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label class="">Usuario *</label>
                        <input 
                            :autofocus="true"
                            :class="user.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="">Correo *</label>
                        <input 
                            v-model="user.email"
                            :class="user.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.landing.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    
                    <div class="col-12 mb-3">
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
                        <label class="">Dirección</label>
                        <input 
                            v-model="user.address"
                            :class="user.address ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.city.focus()"
                            ref="address"
                            type="text" class="form-control" placeholder="Dirección">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="">Ciudad</label>
                        <input 
                            v-model="user.city"
                            :class="user.city ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.state.focus()"
                            ref="city"
                            type="text" class="form-control" placeholder="Ciudad">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="">Estado</label>
                        <input 
                            v-model="user.state"
                            :class="user.state ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="state"
                            type="text" class="form-control" placeholder="Estado">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="">Colonia</label>
                        <input 
                            v-model="user.colony"
                            :class="user.colony ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="colony"
                            type="text" class="form-control" placeholder="Colonia">
                    </div>
                    
                    <div class="col-12 d-none mb-3">
                        <label class="">Referido por</label>
                        <input 
                            v-model="user.referral.user_login_id"
                            :class="user.referral.user_login_id ? 'is-valid' : ''"
                            @keypress="getAdminReferralProfile(this)"
                            ref="number"
                            type="text" class="form-control" placeholder="Enter para buscar">

                        <div v-if="user.referral.names" class="alert mb-0 mt-2 alert-info text-center ">
                            {{user.referral.names}}
                        </div>
                    </div>

                    <div class="col-12 mb-3">
                        <label class="">Teléfono * </label>
                        <div class="row">
                            <div class="col">
                                <select class="form-select" v-model="user.country_id" aria-label="Selecciona tu país">
                                    <option>Selecciona tu país</option>
                                    <option v-for="country in countries" v-bind:value="country.country_id">
                                        {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                    </option>
                                </select>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <input 
                                        :class="user.phone ? 'is-valid' : 'is-invalid'"
                                        ref="phone"
                                        type="text" ref="phone" v-model="user.phone" class="form-control" @keydown.enter.exact.prevent="updateUser" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="feedback" class="alert alert-light  text-center"> {{feedback}} </div>

                <button  :disabled="!filled" ref="button" type="submit" class="btn shadow-none mb-0 btn-primary px-3 btn-sm" @click="updateUser">Actualizar</button>
            </div>
        </div>

    `
}

export { SellerclientseditViewer }