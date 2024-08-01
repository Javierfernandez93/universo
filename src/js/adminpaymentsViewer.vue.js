import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.1'
import { WidgetPayments } from '../../src/js/widgetPayments.vue.js?v=1.1.1'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.1'
import PlaceHolder from '../../src/js/components/PlaceHolder.vue.js?v=1.1.1'
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.1.1' 
import IconHolder from '../../src/js/components/IconHolder.vue.js?v=1.1.1'

const AdminpaymentsViewer = {
    components: {
        LoaderViewer,
        PlaceHolder,
        WidgetPayments,
        IconHolder,
        HighLigth
    },
    data() {
        return {
            UserSupport: new UserSupport,
            payments: [],
            paymentsAux: [],
            toggleFilter: false,
            busy: false,
            catalog_payment_type_id: 1,
            query: '',
            extraQuery: '',
            catalogPaymentTypes: [],
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                seller: {
                    name: 'seller',
                    desc: false,
                    alphabetically: true,
                },
                support_name: {
                    name: 'support_name',
                    desc: false,
                    alphabetically: true,
                },
                title: {
                    name: 'title',
                    desc: false,
                    alphabetically: true,
                },
                last_payment_number: {
                    name: 'last_payment_number',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                start_date: {
                    name: 'start_date',
                    desc: false,
                },
                end_date: {
                    name: 'end_date',
                    desc: false,
                },
                price: {
                    name: 'price',
                    desc: false,
                },
                affiliation_name: {
                    name: 'affiliation_name',
                    desc: false,
                    alphabetically: true,
                },
                status: {
                    name: 'status',
                    desc: false,
                    alphabetically: true,
                },
                real_state: {
                    name: 'real_state',
                    desc: false,
                    alphabetically: true,
                },
            },
            totals: {
                price : 0
            },
        }
    },
    watch: {
        catalog_payment_type_id: {
            async handler() {
                this.query = ''
                await this.getPaymentsProperties()
            },
            deep: true
        },
        extraQuery: {
            async handler() {
                this.searchProperties(this)
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.payments.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if (column.alphabetically) {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        extraQueryFilter()
        {
            this.payments = this.paymentsAux

            if(this.extraQuery != '') {
                this.payments = this.paymentsAux.filter((payment) => {
                    console.log(payment.on_manivela,this.extraQuery)
                    return payment.on_manivela_text.includes(this.extraQuery)
                })
            }
        },
        searchProperties: _debounce((self) => {
            self.extraQueryFilter()

            self.payments = self.payments.filter((payment) => {
                return (payment.seller?.toLowerCase().includes(self.query.toLowerCase()) 
                || payment.names?.toLowerCase().includes(self.query.toLowerCase()) 
                || payment.title?.toLowerCase().includes(self.query.toLowerCase()) 
                || payment.last_payment_number?.toString().includes(self.query.toLowerCase())
                || payment.support_name?.toLowerCase().includes(self.query.toLowerCase())
                || payment.affiliation_name?.toLowerCase().includes(self.query.toLowerCase())
                || payment.start_date?.toLowerCase().includes(self.query.toLowerCase())
                || payment.end_date?.toLowerCase().includes(self.query.toLowerCase())
                || payment.on_manivela_text?.toLowerCase().includes(self.query.toLowerCase()))
            })

            if(self.payments.length == 0 && self.extraQuery == '') {
                self.getPaymentsProperties(self.query)
            }

            self.getTotals()
        },500),
        queryBy(query) {
            this.query = query

            this.searchProperties(this)
        },
        viewPayments(property_id) {
            window.location.href = `../../apps/admin-payments/view.php?pid=${property_id}`
        },
        editPayment(payment_property_id) {
            window.location.href = `../../apps/admin-payments/edit.php?ppid=${payment_property_id}`
        },
        getTotals() {
            this.totals.price = 0

            if(!this.payments) { 
                return;
            }
            this.payments.map((payment) => {
                this.totals.price += parseFloat(payment.price)
            })
        },
        getPaymentsProperties() {
            return new Promise((resolve) => {
                this.busy = true
                this.payments = []
                this.paymentsAux = []
                this.UserSupport.getPaymentsProperties({catalog_payment_type_id:this.catalog_payment_type_id,query:this.query}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        this.payments = response.payments.map(payment => {
                            payment.start_date = typeof payment.start_date == 'number' ? payment.start_date.formatDate() : payment.start_date
                            payment.end_date = typeof payment.end_date == 'number' ? payment.end_date.formatDate() : payment.end_date
                            payment.on_manivela_text = payment.on_manivela == 1 ? 'on_manivela' : 'off_manivela'

                            return payment
                        })
                        this.paymentsAux = this.payments

                        this.getTotals()
                    } 

                    resolve()
                })
            })
        },
        getCatalogPaymentTypes() {
            this.busy = true
            this.catalogPaymentTypes = []
            this.UserSupport.getCatalogPaymentTypes({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalogPaymentTypes = response.catalogPaymentTypes
                    this.catalog_payment_type_id = this.catalogPaymentTypes[1].catalog_payment_type_id
                } 
            })
        },
        setPaymentPropertyTypeAs(payment_property_id, catalog_payment_type_id, title) {
            this.busy = true
            this.UserSupport.setPaymentPropertyTypeAs({payment_property_id:payment_property_id,catalog_payment_type_id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.getPaymentsProperties()

                    toastInfo({
                        message: `Se ha cambiado el tipo de pago a ${title}`
                    })
                } 
            })
        },
        updateManivelaPayment(payment) {
            this.busy = true
            this.UserSupport.updateManivelaPayment({email:payment.email,title:payment.title}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.getPaymentsProperties()

                    toastInfo({
                        message: `Actualizamos la información de la manivela`
                    })
                } 
            })
        },
        setPaymentPropertyAs(payment_property_id, status) {
            this.busy = true
            this.UserSupport.setPaymentPropertyAs({payment_property_id:payment_property_id,status:status}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.getPaymentsProperties()

                    if(!status == -1)
                    {
                        toastInfo({
                            message: 'Se ha eliminado el pago'
                        })
                    } 
                } 
            })
        },
        findPayment(property) {
            return new Promise((resolve,reject) => {
                this.busy = true
                this.UserSupport.findPayment({email:property.email,user_login_id:property.user_login_id,title:property.title}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        property.on_manivela = true
                        property.on_manivela_text = 'on_manivela'
                        toastInfo({
                            message: `✅ Usuario encontrado ${response.user.Cliente}`
                        })

                        resolve(true)
                    } else if(response.r == "NOT_PAYMENTS") {
                        resolve(false)
                    } else if(response.r == "NOT_USER") {
                        toastInfo({
                            message: `❌ Usuario no encontrado`
                        })

                        resolve(false)
                    }

                    reject()
                })
            })
        },
        async validateIfExistBeforeSend(property) {
            return new Promise(async (resolve) => {
                await this.findPayment(property)
    
                if(property.on_manivela)
                {
                    resolve(true)
                } else {

                    let alert = alertCtrl.create({
                        title: "Aviso",
                        subTitle: "¿Estás seguro de que deseas enviar el apartado a Manivela?",
                        buttons: [
                            {
                                text: "Sí, enviar",
                                class: 'btn-success',
                                handler: (data) => {
                                    resolve(false)
                                }
                            },
                            {
                                text: "Cancelar",
                                role: "cancel",
                                handler: (data) => {
                                    reject()
                                }
                            }
                        ],
                    })

                    alertCtrl.present(alert.modal);
                }
            })
        },
        clearFilter() {
            this.query = ''
            this.extraQuery = ''

            this.getPaymentsProperties()
        },
        requiredApart(property) {
            this.validateIfExistBeforeSend(property).then((exist) => {
                if(!exist)
                {
                    this.busy = true

                    this.UserSupport.requiredApart({
                        user_login_id: property.user_login_id,
                        property : {
                            property_id: property.property_id,
                            month_finance: property.month_finance,
                            affiliation_name: property.affiliation_name,
                            real_state: property.real_state
                        }
                    }, (response) => {
                        this.busy = false
                        if (response.s == 1) {
                            toastInfo({
                                message: `✅ Pago registrado en manivela`
                            })
                        }
                    })
                }
            })
        },
    },
    mounted() {
        this.getCatalogPaymentTypes()
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl-auto">
                                <LoaderViewer :busy="busy"/>
                            </div>
                            <div class="col-12 col-xl">
                                <span v-if="payments" class="badge text-secondary p-0">Total {{payments.length}}</span>
                                <div class="h5">
                                    Lista de ventas
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div v-if="catalogPaymentTypes" class="">
                                    <select class="form-select" v-model="catalog_payment_type_id" id="" aria-label="">
                                        <option v-for="catalogPaymentType in catalogPaymentTypes" v-bind:value="catalogPaymentType.catalog_payment_type_id">
                                            {{ catalogPaymentType.title }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input :disabled="busy" v-model="query" @input="searchProperties(this)" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="getPaymentsProperties" class="btn btn-dark btn-sm mb-0 shadow-none px-3">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                            <div v-if="query || extraQuery" class="col-12 col-xl-auto">
                                <button @click="clearFilter" class="btn btn-dark btn-sm mb-0 shadow-none px-3">
                                    Borrar filtro
                                </button>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-payments/add" class="btn btn-dark btn-sm mb-0 shadow-none px-3">Añadir venta</a>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="toggleFilter = !toggleFilter" class="btn btn-dark btn-sm mb-0 shadow-none px-3">
                                    <i class="bi bi-filter"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-header py-0" v-if="toggleFilter">
                        {{extraQuery}}
                        <div class="row align-items-center justify-content-end">
                            <div class="col-12 col-xl-auto">
                                <div class="form-check form-check-inline">
                                    <input v-model="extraQuery" class="form-check-input" type="radio" name="extraQuery" id="all" value="" checked>
                                    <label class="form-check-label" for="all">Todos</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input v-model="extraQuery" class="form-check-input" type="radio" value="on_manivela" name="extraQuery" id="on_manivela">
                                    <label class="form-check-label" for="on_manivela">Enviados a Manivela</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input v-model="extraQuery" class="form-check-input" type="radio" value="off_manivela" name="extraQuery" id="off_manivela">
                                    <label class="form-check-label" for="off_manivela">No enviados a Manivela</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <WidgetPayments/>
                    </div>

                    <HighLigth :busy="busy" :dataLength="payments.length" :query="query"/>
                    
                    <div v-if="payments.length > 0" class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive-md p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center opacity-7 text-center text-xs text-primary">
                                        <th class="cursor-pointer text-uppercase">
                                            Manivela
                                        </th>
                                        <th @click="sortData(columns.names)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.names.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Cliente
                                        </th>
                                        <th @click="sortData(columns.seller)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.seller.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Asesor
                                        </th>
                                        <th @click="sortData(columns.support_name)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.support_name.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Lider
                                        </th>
                                        <th @click="sortData(columns.affiliation_name)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.affiliation_name.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Afiliación
                                        </th>
                                        <th @click="sortData(columns.title)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.title.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Propiedad
                                        </th>
                                        <th @click="sortData(columns.last_payment_number)" class="cursor-pointer text-uppercase d-none">
                                            <span :class="columns.last_payment_number.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Núm pago
                                        </th>
                                        <th @click="sortData(columns.start_date)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.start_date.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            apertura
                                        </th>
                                        <th @click="sortData(columns.end_date)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.end_date.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            cierre
                                        </th>

                                        <th @click="sortData(columns.status)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.status.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Estatus
                                        </th>
                                        <th @click="sortData(columns.price)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.price.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Precio
                                        </th>
                                        <th class="text-uppercase">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="payment in payments" class="text-center text-sm fw-bold text-capitalize">
                                        <td class="align-middle text-capitalize text-center">
                                            <IconHolder :value="payment.on_manivela" icon="bi-check-square" :tooltip="payment.on_manivela ? 'Enviado a Manivela' : 'No enviado a Manivela'" />
                                        </td>
                                        <td @click="queryBy(payment.names)" class="align-middle text-hover-underline">
                                            <PlaceHolder :value="payment.names" placeholder="-"/>
                                        </td>
                                        <td @click="queryBy(payment.seller)" class="align-middle text-hover-underline">
                                            <PlaceHolder :value="payment.seller" placeholder="-"/>
                                        </td>
                                        <td @click="queryBy(payment.support_name)" class="align-middle text-hover-underline">
                                            <PlaceHolder :value="payment.support_name" placeholder="-"/>
                                        </td>
                                        <td @click="queryBy(payment.affiliation_name)" class="align-middle text-hover-underline">
                                            <PlaceHolder :value="payment.affiliation_name" placeholder="-"/>
                                        </td>
                                        <td class="align-middle">
                                            <PlaceHolder :value="payment.title" placeholder="-"/>
                                        </td>
                                        <td class="align-middle d-none">
                                            <PlaceHolder :value="payment.last_payment_number" placeholder="-"/>
                                        </td>
                                        <td @click="queryBy(payment.start_date)" class="align-middle text-hover-underline">
                                            {{payment.start_date}}
                                        </td>
                                        <td @click="queryBy(payment.end_date)" class="align-middle text-hover-underline">
                                            {{payment.end_date}}
                                        </td>
                                        <td class="align-middle">
                                            <span class="badge bg-secondary break-words">{{payment.payment_type}}</span>
                                        </td>
                                        <td class="align-middle">
                                            $ {{payment.price.numberFormat(2)}}
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-dark mb-0 shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editPayment(payment.payment_property_id)">Editar</button>
                                                        <button class="dropdown-item" @click="setPaymentPropertyAs(payment.payment_property_id,-1)">Eliminar</button>
                                                        <button class="dropdown-item" @click="viewPayments(payment.property_id)">Ver pagos</button>
                                                        <button class="dropdown-item" @click="requiredApart(payment)">Enviar a manivela</button>
                                                        <button class="dropdown-item" @click="updateManivelaPayment(payment)">Actualizar información de manivela</button>
                                                        <div v-for="catalogPaymentType in catalogPaymentTypes">
                                                            <button v-if="catalogPaymentType.catalog_payment_type_id != payment.catalog_payment_type_id" class="dropdown-item" @click="setPaymentPropertyTypeAs(payment.payment_property_id,catalogPaymentType.catalog_payment_type_id,catalogPaymentType.title)">{{catalogPaymentType.title}}</button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="text-center text-sm fw-bold text-capitalize">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>total</td>
                                        <td>$ {{totals.price.numberFormat(2)}}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdminpaymentsViewer }