import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.1'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.1'

const AdminpaymentsViewer = {
    components: {
        LoaderViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            payments: null,
            paymentsAux: null,
            busy: null,
            catalog_payment_type_id: 1,
            query: null,
            catalogPaymentTypes: null,
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
        query() {
            this.payments = this.paymentsAux.filter((payment) => {
                return payment.seller?.toLowerCase().includes(this.query.toLowerCase()) 
                || payment.names?.toLowerCase().includes(this.query.toLowerCase()) 
                || payment.title?.toLowerCase().includes(this.query.toLowerCase()) 
                || payment.last_payment_number?.toString().includes(this.query.toLowerCase())
            })

            this.getTotals()

        },
        catalog_payment_type_id:
        {
            handler() {
                this.getPaymentsProperties()
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
        viewPayments(property_id) {
            window.location.href = `../../apps/admin-payments/view.php?pid=${property_id}`
        },
        editPayment(payment_property_id) {
            window.location.href = `../../apps/admin-payments/edit.php?ppid=${payment_property_id}`
        },
        getTotals() {
            this.totals.price = 0
            this.payments.map((payment) => {
                this.totals.price += parseFloat(payment.price)
            })
        },
        getPaymentsProperties() {
            this.busy = true
            this.payments = null
            this.paymentsAux = null
            this.UserSupport.getPaymentsProperties({catalog_payment_type_id:this.catalog_payment_type_id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.paymentsAux = response.payments
                    this.payments = response.payments

                    this.getTotals()
                } else {
                    this.payments = false
                    this.paymentsAux = false
                }
            })
        },
        getCatalogPaymentTypes() {
            this.busy = true
            this.catalogPaymentTypes = null
            this.UserSupport.getCatalogPaymentTypes({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.catalogPaymentTypes = response.catalogPaymentTypes
                    this.catalog_payment_type_id = this.catalogPaymentTypes[1].catalog_payment_type_id
                } else {
                    this.catalogPaymentTypes = false
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
        // this.getPaymentsProperties()
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
                                    Pagos
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
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="getPaymentsProperties" class="btn btn-dark btn-sm mb-0 shadow-none px-3">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-payments/add" class="btn btn-dark btn-sm mb-0 shadow-none px-3">Añadir venta</a>
                            </div>
                        </div>
                        <div v-if="query" class="alert alert-light text-center text-dark">Resultados de la búsqueda <b>{{query}}</b> ({{payments.length}} resultados)</div>
                    </div>

                    <LoaderViewer :busy="busy"/>
                    
                    <div v-if="payments" class="card-body px-0 pt-0 pb-2">
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
                                        <th @click="sortData(columns.last_payment_number)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.last_payment_number.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Núm pago
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
                                            <span v-if="payment.on_manivela" class="text-success">
                                                <i class="bi bi-check-square-fill"></i>
                                            </span>
                                        </td>
                                        <td class="align-middle text-capitalize ">
                                            {{payment.names}} 
                                        </td>
                                        <td @click="query = payment.seller" class="align-middle text-decoration-underline text-primary">
                                            {{payment.seller}}
                                        </td>
                                        <td @click="query = payment.support_name" class="align-middle">
                                            {{payment.support_name}}
                                        </td>
                                        <td @click="query = payment.affiliation_name" class="align-middle">
                                            {{payment.affiliation_name}}
                                        </td>
                                        <td class="align-middle">
                                            {{payment.title}}
                                        </td>
                                        <td class="align-middle">
                                            {{payment.last_payment_number}}
                                        </td>
                                        <td class="align-middle">
                                            <span class="badge bg-secondary break-words">{{payment.payment_type}}</span>
                                        </td>
                                        <td class="align-middle">
                                            $ {{payment.price.numberFormat(2)}}
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editPayment(payment.payment_property_id)">Editar</button>
                                                        <button class="dropdown-item" @click="setPaymentPropertyAs(payment.payment_property_id,-1)">Eliminar</button>
                                                        <button class="dropdown-item" @click="viewPayments(payment.property_id)">Ver pagos</button>
                                                        <button class="dropdown-item" @click="requiredApart(payment)">Enviar a manivela</button>
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
                    <div v-else-if="payments === false" class="card-body">
                        <div class="alert bg-dark text-center text-white mb-0">
                            <strong>Aviso</strong>
                            <div>
                                No hay pagos, para añadir uno da click en el botón de arriba "Añadir venta".
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdminpaymentsViewer }