import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.3'   
import { LoaderViewer } from '../../src/js/loaderViewer.vue.js?v=1.0.3'   
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.3'   

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
            catalogPromotions: null,
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
                    end_date : null,
                    start_date : null
                },
                property : {
                    property_id: null,
                    title : null,
                    price : null,
                    extension_date : null,
                    promotion : false,
                    extension : false,
                    catalog_promotion_id: null,
                    catalog_month_finance_id: null,
                    new: false
                }
            }
        }
    },
    watch: {
        sale: {
            handler() {
                this.filled = this.sale.property.title && this.sale.property.price && this.sale.payment_property.start_date
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

                        const [catalogMonthFinance] = this.catalogMonthFinances
                        
                        this.sale.property.catalog_month_finance_id = catalogMonthFinance.catalog_month_finance_id

                        $('.selectpicker-catalogMonthFinances').selectpicker('val', catalogMonthFinance.catalog_month_finance_id.toString());
                        $('.selectpicker-catalogMonthFinances').selectpicker('refresh');
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
                        
                        const [catalogPaymentType] = this.catalogPaymentTypes
                        
                        this.sale.payment_property.catalog_payment_type_id = catalogPaymentType.catalog_payment_type_id

                        $('.selectpicker-catalogPaymentTypes').selectpicker('val', catalogPaymentType.catalog_payment_type_id.toString());
                        $('.selectpicker-catalogPaymentTypes').selectpicker('refresh');
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
                        
                        const [user] = this.users
                        this.sale.user.user_login_id = user.user_login_id
                        $('.selectpicker').selectpicker('val', user.user_login_id.toString());
                        $('.selectpicker').selectpicker('refresh');
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
                        
                        const [developer] = this.developers
                        this.sale.real_state_developer.real_state_developer_id = developer.real_state_developer_id
                        $('.selectpicker-developers').selectpicker('val', developer.real_state_developer_id.toString());
                        $('.selectpicker-developers').selectpicker('refresh');
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
                        
                        const [realState] = this.realStates
                        this.sale.real_state.real_state_id = realState.real_state_id
                        $('.selectpicker-realStates').selectpicker('val', realState.real_state_id.toString());
                        $('.selectpicker-realStates').selectpicker('refresh');

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
        getCatalogPromotion() {
            this.busy = true
            this.UserSupport.getCatalogPromotion({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalogPromotions = response.catalogPromotions

                    setTimeout(()=>{
                        $('.selectpicker-catalogPromotions').selectpicker();
                        
                        $('.selectpicker-catalogPromotions').change(() =>{
                            this.sale.property.catalog_promotion_id = $('.selectpicker-catalogPromotions').val();
                        });
                        
                        const [catalogPromotion] = this.catalogPromotions
                        this.sale.property.catalog_promotion_id = catalogPromotion.catalog_promotion_id;
                        $('.selectpicker-catalogPromotions').selectpicker('val', catalogPromotion.catalog_promotion_id.toString());
                        $('.selectpicker-catalogPromotions').selectpicker('refresh');
                    },100)
                }
            })
        }
    },
    mounted() {
        this.getClients()
        this.getDevelopers()
        this.getRealStates()
        this.getCatalogPaymentTypes()
        this.getCatalogPromotion()
        this.getCatalogMonthFinances()

        setTimeout(()=>{
            $('#price').mask("#,##0.00", {reverse: true});
        },500)
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
                        <button :disabled="!filled" @click="saveSale" class="btn btn-dark btn-sm px-3 mb-0 shadow-none">Guardar</button>
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
                        <div class="row align-items-center mb-3 align-items-center">
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Propiedad</label>
                                    <input :class="sale.property.title ? 'is-valid' :'is-invalid'"  v-model="sale.property.title" type="text" class="form-control" placeholder="Propiedad">
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Precio</label>
                                    <input :class="sale.property.price ? 'is-valid' :'is-invalid'"  v-model="sale.property.price" type="text" id="price" class="form-control" placeholder="Precio">
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Fecha apertura</label>
                                    <input :class="sale.payment_property.start_date ? 'is-valid' :'is-invalid'"  v-model="sale.payment_property.start_date" type="date" class="form-control" placeholder="Fecha apertura">
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-group">
                                    <label>Fecha cierre (opcional)</label>
                                    <input :class="sale.payment_property.end_date ? 'is-valid' :'is-invalid'"  v-model="sale.payment_property.end_date" type="date" class="form-control" placeholder="Fecha cierre">
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mb-3 align-items-center">
                            <div v-if="realStates" class="col-12 col-md">
                                <label>Elegir proyecto</label>
                                <select class="selectpicker selectpicker-realStates form-control" data-live-search="true" data-style="border shadow-none">
                                    <option v-for="realState in realStates" :data-tokens="realState.title" :data-content="realState.title">{{ realState.real_state_id }}</option>
                                </select>
                            </div>
                            <div class="col-12 col-md">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.property.promotion" type="checkbox" role="switch" id="promotion">
                                    <label class="form-check-label" for="promotion">Promoción</label>
                                </div>
                            </div>
                            <div v-show="sale.property.promotion" class="col-12 col-md">
                                <div v-if="catalogPromotions">
                                    <label>Elegir proyecto</label>
                                    <select class="selectpicker selectpicker-catalogPromotions form-control" data-live-search="true" data-style="border shadow-none">
                                        <option v-for="catalogPromotion in catalogPromotions" :data-tokens="catalogPromotion.title" :data-content="catalogPromotion.title">{{ catalogPromotions.catalog_promotion_id }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center mb-3 align-items-center">
                            <div class="col-12 col-md">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" v-model="sale.property.extension" type="checkbox" role="switch" id="extension">
                                    <label class="form-check-label" for="extension">Extensión</label>
                                </div>
                            </div>
                            <div v-if="sale.property.extension" class="col-12 col-md">
                                <div class="form-group">
                                    <label>Fecha de extension</label>
                                    <input :class="sale.property.extension_date ? 'is-valid' :'is-invalid'"  v-model="sale.property.extension_date" type="date" class="form-control" placeholder="Fecha de extensión">
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