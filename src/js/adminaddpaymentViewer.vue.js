import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.0'   
import { LoaderViewer } from '../../src/js/loaderViewer.vue.js?v=1.0.0'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.0'   

const AdminaddpaymentViewer = {
    components : {
        LoaderViewer,
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: null,
            catalogMonthFinances: null,
            catalogPaymentTypes: null,
            busy: false,
            users: null,
            users: null,
            realStates: null,
            developers: null,
            sale: {
                user : {
                    user_login_id : null,
                    names : null,
                    last_name : null,
                    sur_name : null,
                    nationality : 'Méxicano',
                    catalog_user_type_id : 3,
                    new : false,
                },
                real_state_developer : {
                    real_state_developer_id : null,
                },
                real_state : {
                    real_state_id : null,
                },
                payment_property : {
                    user_login_id : null,
                    property_id : null,
                    catalog_payment_type_id : null,
                    start_date : null
                },
                property : {
                    property_id: null,
                    title : null,
                    price : null,
                    promotion : false,
                    extension : false,
                    catalog_month_finance_id: null,
                    new: false
                }
            }
        }
    },
    watch: {
        buy: {
            handler() {
                this.isBuyFilled = this.buy.ipn_data.observation != null && this.buy.ipn_data.image != null
            },
            deep: true
        },
    },
    methods: {
        filterData() {
            this.payments = this.paymentsAux
            this.payments = this.payments.filter((payment) => {
                return payment.names.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        getCatalogMonthFinances() {
            this.busy = true
            this.UserSupport.getCatalogMonthFinances({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalogMonthFinances = response.catalogMonthFinances

                    setTimeout(()=>{
                        $('.selectpicker-catalogMonthFinances').selectpicker();
                        
                        $('.selectpicker-catalogMonthFinances').change(() =>{
                            this.sale.property.catalog_month_finance_id = $('.selectpicker-catalogMonthFinances').val();
                        });
                    },100)
                }
            })
        },
        getCatalogPaymentTypes() {
            this.busy = true
            this.UserSupport.getCatalogPaymentTypes({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalogPaymentTypes = response.catalogPaymentTypes

                    setTimeout(()=>{
                        $('.selectpicker-catalogPaymentTypes').selectpicker();
                        
                        $('.selectpicker-catalogPaymentTypes').change(() =>{
                            this.sale.payment_property.catalog_payment_type_id = $('.selectpicker-catalogPaymentTypes').val();
                        });
                    },100)
                }
            })
        },
        getClients() {
            this.UserSupport.getUsers({ catalog_user_type_id : 3 }, (response) => {
                if (response.s == 1) {
                    this.users = response.users
                    this.usersAux = response.users

                    setTimeout(()=>{
                        $('.selectpicker').selectpicker();
                        
                        $('.selectpicker').change(() =>{
                            this.sale.user.user_login_id = $('.selectpicker').val();
                        });

                        $('.selectpicker').selectpicker('val', this.users[0].user_login_id.toString());

                    },100)
                }
            })
        },
        getDevelopers() {
            this.UserSupport.getDevelopers({ catalog_user_type_id : 3 }, (response) => {
                if (response.s == 1) {
                    this.developers = response.developers

                    setTimeout(()=>{
                        $('.selectpicker-developers').selectpicker();
                        
                        $('.selectpicker-developers').change(() =>{
                            this.sale.real_state_developer.real_state_developer_id = $('.selectpicker-developers').val();
                        });
                        
                        $('.selectpicker-developers').selectpicker('val', this.developers[0].real_state_developer_id.toString());
                    },100)
                }
            })
        },
        getRealStates() {
            this.UserSupport.getRealStates({ catalog_user_type_id : 3 }, (response) => {
                if (response.s == 1) {
                    this.realStates = response.realStates

                    setTimeout(()=>{
                        $('.selectpicker-realStates').selectpicker();
                        
                        $('.selectpicker-realStates').change(() =>{
                            this.sale.real_state.real_state_id = $('.selectpicker-realStates').val();
                        });

                        $('.selectpicker-realStates').selectpicker('val', this.realStates[0].real_state_id.toString());

                    },100)
                }
            })
        },
        saveSale() {
            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de guardar esta información?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.saveSale(this.sale, (response) => {
                                if (response.s == 1) {
                                    toastInfo({
                                        message: "Venta guardada correctamente",
                                    })
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
            
        },
    },
    mounted() {
        this.getClients()
        this.getDevelopers()
        this.getRealStates()
        this.getCatalogPaymentTypes()
        this.getCatalogMonthFinances()
    
    },
    template : `
        <LoaderViewer :busy="busy"/>

        <div class="card">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-md h5">
                        Añadir venta
                    </div>

                    <div class="col-12 col-md-auto">
                        <button @click="saveSale" class="btn btn-dark btn-sm px-3 mb-0 shadow-none">Guardar</button>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="card border border-light mb-3">
                    <div class="card-header">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-md h6">
                                Cliente
                            </div>

                            <div class="col-12 col-md-auto">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.user.new" type="checkbox" role="switch" id="new">
                                    <label class="form-check-label" for="new">Cliente nuevo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12 col-md">
                                <div v-show="!sale.user.new">
                                    <div v-if="users">
                                        <label>Elegir cliente</label>
                                        <select class="selectpicker form-control" data-live-search="true" data-style="border shadow-none">
                                            <option v-for="user in users" :data-tokens="user.names" :data-content="user.names">{{ user.user_login_id }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div v-show="sale.user.new" class="row">
                                    <div class="col-12 col-md">
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input ref="names" :class="sale.user.names ? 'is-valid' :'is-invalid'" @keydown.enter.exact.prevent="$refs.las_name.focus()" v-model="sale.user.names" type="text" class="form-control" placeholder="Nombre del cliente">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md">
                                        <div class="form-group">
                                            <label>Apellido paterno</label>
                                            <input ref="las_name" :class="sale.user.last_name ? 'is-valid' :'is-invalid'" @keydown.enter.exact.prevent="$refs.sur_name.focus()" v-model="sale.user.last_name" type="text" class="form-control" placeholder="Apellido paterno">
                                        </div>
                                    </div>
                                    <div class="col-12 col-md">
                                        <div class="form-group">
                                            <label>Apellido materno</label>
                                            <input ref="sur_name" :class="sale.user.sur_name ? 'is-valid' :'is-invalid'"  v-model="sale.user.sur_name" type="text" class="form-control" placeholder="Apellido materno">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border border-light mb-3">
                    <div class="card-header">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-md h6">
                                Propiedad
                            </div>
                            <div class="col-12 col-md-auto d-none">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.user.new" type="checkbox" role="switch" id="new">
                                    <label class="form-check-label" for="new">Propiedad nueva</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row align-items-center mb-3">
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Propiedad</label>
                                    <input :class="sale.property.title ? 'is-valid' :'is-invalid'"  v-model="sale.property.title" type="text" class="form-control" placeholder="Propiedad">
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Precio</label>
                                    <input :class="sale.property.price ? 'is-valid' :'is-invalid'"  v-model="sale.property.price" type="text" class="form-control" placeholder="Precio">
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Fecha apertura</label>
                                    <input :class="sale.payment_property.start_date ? 'is-valid' :'is-invalid'"  v-model="sale.payment_property.start_date" type="date" class="form-control" placeholder="Fecha apertura">
                                </div>
                            </div>
                            <div v-if="realStates" class="col-12 col-md">
                                <label>Elegir proyecto</label>
                                <select class="selectpicker selectpicker-realStates form-control" data-live-search="true" data-style="border shadow-none">
                                    <option v-for="realState in realStates" :data-tokens="realState.title" :data-content="realState.title">{{ realState.real_state_id }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row align-items-center mb-3">
                            <div class="col-12 col-md">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.property.promotion" type="checkbox" role="switch" id="promotion">
                                    <label class="form-check-label" for="promotion">Promoción</label>
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.property.extension" type="checkbox" role="switch" id="extension">
                                    <label class="form-check-label" for="extension">Extensión</label>
                                </div>
                            </div>
                            <div v-if="catalogPaymentTypes" class="col-12 col-md">
                                <label>Estatus</label>
                                <select class="selectpicker selectpicker-catalogPaymentTypes form-control" data-live-search="true" data-style="border shadow-none">
                                    <option v-for="catalogPaymentType in catalogPaymentTypes" :data-tokens="catalogPaymentType.title" :data-content="catalogPaymentType.title">{{ catalogPaymentType.catalog_payment_type_id }}</option>
                                </select>
                            </div>
                            <div v-if="catalogMonthFinances" class="col-12 col-md">
                                <label>Meses de financiamiento</label>
                                <select class="selectpicker selectpicker-catalogMonthFinances form-control" data-live-search="true" data-style="border shadow-none">
                                    <option v-for="catalogMonthFinance in catalogMonthFinances" :data-tokens="catalogMonthFinance.title" :data-content="catalogMonthFinance.title">{{ catalogMonthFinance.catalog_month_finance_id }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminaddpaymentViewer } 