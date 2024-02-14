import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.9'   

const AddclientViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            sellers: null,
            sellersAux: null,
            query: null,
            feedback: null,
            countries: {},
            user: {
                names: null,
                password: null,
                email: '',
                address: null,
                colony: null,
                city: null,
                state: null,
                phone: null,
                catalog_user_type_id: 1, // sellter
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
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        },
        user: {
            handler() {
                this.filled = this.user.names != null && this.user.email.isValidMail() && this.user.phone
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.sellers = this.sellersAux
            this.sellers = this.sellers.filter((seller) => {
                return seller.names.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        saveUser() {
            this.feedback = null

            this.UserSupport.saveUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                    
                    toastInfo({
                        message: 'Vendedor guardado correctamente. Redireccionando...',
                    })

                    setTimeout(()=>{
                        window.location.href = `../../apps/admin-user/`
                    },3000)

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
            self.UserSupport.getAdminReferralProfile({referral_id:self.user.referral.user_login_id}, (response) => {
                if (response.s == 1) {
                    self.user.referral = {...self.user.referral,...response.profile} 
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
        getSellers() {
            this.UserSupport.getUsers({  }, (response) => {
                if (response.s == 1) {
                    this.sellers = response.users
                    this.sellersAux = response.users

                    setTimeout(()=>{
                        $('.selectpicker').selectpicker();
                        
                        $('.selectpicker').change(() =>{
                            this.user.referral.user_login_id = $('.selectpicker').val();
                        });
                    },100)
                    setTimeout(()=>{
                        // console.log(23)
                        // $('.selectpicker').selectpicker('val', getParam("ulid"));


                        // if(getParam("ulid"))
                        // {
                        //     $('select[name=selValue]').val(getParam("ulid"));
                        //     $('.selectpicker').change()
                        //     $('.selectpicker').selectpicker('refresh')
                        // }
                    },1500)
                }
            })
        },
    },
    mounted() {
        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()
        this.getSellers()
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center"> 
                    <div class="col-12 col-xl"> 
                        <div class="h5">Añadir cliente</div>
                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button  :disabled="!filled" ref="button" type="submit" class="btn shadow-none mb-0 btn-primary px-3 btn-sm" @click="saveUser">Guardar</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Usuario *</label>
                        <input 
                            :autofocus="true"
                            :class="user.names ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.email.focus()"
                            v-model="user.names"
                            ref="names"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Correo *</label>
                        <input 
                            v-model="user.email"
                            :class="user.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.landing.focus()"
                            ref="email"
                            type="text" class="form-control" placeholder="Email">
                    </div>
                    
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Nombre de usuario</label>
                        <input 
                            v-model="user.user_account.landing"
                            :class="user.user_account.landing ? 'is-valid' : ''"
                            @keydown.space.prevent
                            @keydown.enter.exact.prevent="$refs.address.focus()"
                            ref="landing"
                            type="text" class="form-control" placeholder="Nombre de usuario">
                    </div>
                    
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Dirección</label>
                        <input 
                            v-model="user.address"
                            :class="user.address ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.city.focus()"
                            ref="address"
                            type="text" class="form-control" placeholder="Dirección">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Ciudad</label>
                        <input 
                            v-model="user.city"
                            :class="user.city ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.state.focus()"
                            ref="city"
                            type="text" class="form-control" placeholder="Ciudad">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Estado</label>
                        <input 
                            v-model="user.state"
                            :class="user.state ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="state"
                            type="text" class="form-control" placeholder="Estado">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Colonia</label>
                        <input 
                            v-model="user.colony"
                            :class="user.colony ? 'is-valid' : ''"
                            @keydown.enter.exact.prevent="$refs.colony.focus()"
                            ref="colony"
                            type="text" class="form-control" placeholder="Colonia">
                    </div>
                    
                    <div class="col-12 col-xl-6 d-none mb-3">
                        <label>Referido por</label>
                        <input 
                            v-model="user.referral.user_login_id"
                            :class="user.referral.user_login_id ? 'is-valid' : ''"
                            @keypress="getAdminReferralProfile(this)"
                            ref="number"
                            type="text" class="form-control" placeholder="Enter para buscar">

                        <div v-if="user.referral.names" class="alert mb-0 mt-2 alert-info text-center text-white">
                            {{user.referral.names}}
                        </div>
                    </div>

                    <div class="col-12 col-xl-6 mb-3">
                        <label>Teléfono * </label>
                        <div class="row">
                            <div class="col-auto">
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
                                        type="text" ref="phone" v-model="user.phone" class="form-control" @keydown.enter.exact.prevent="saveUser" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="basic-addon1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="sellers" class="row">
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Asignar a vendedor</label>
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

export { AddclientViewer } 