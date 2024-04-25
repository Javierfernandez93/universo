import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.1'
import { LoaderViewer } from '../../src/js/loaderViewer.vue.js?v=1.0.1'

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
            query: null,
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
            }
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
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
        filterData() {
            this.payments = this.paymentsAux
            this.payments = this.payments.filter((payment) => {
                return payment.seller.toLowerCase().includes(this.query.toLowerCase()) || payment.title.toLowerCase().includes(this.query.toLowerCase()) || payment.last_payment_number.toString().includes(this.query.toLowerCase())
            })
        },
        viewPayments(property_id) {
            window.location.href = `../../apps/admin-payments/view.php?pid=${property_id}`
        },
        getPaymentsProperties() {
            this.busy = true
            this.payments = null
            this.paymentsAux = null
            this.UserSupport.getPaymentsProperties({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.paymentsAux = response.payments
                    this.payments = this.paymentsAux
                } else {
                    this.payments = false
                    this.paymentsAux = false
                }
            })
        },
    },
    mounted() {
        this.getPaymentsProperties()
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
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-payments/add" class="btn btn-dark btn-sm mb-0 shadow-none px-3">Añadir venta</a>
                            </div>
                        </div>
                        <div v-if="query" class="alert alert-light text-center text-dark">Resultados de la búsqueda <b>{{query}}</b> ({{payments.length}} resultados)</div>
                    </div>
                    <div v-if="payments" class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center opacity-7 text-center text-xs text-primary">
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
                                            Número de pago
                                        </th>
                                        <th @click="sortData(columns.status)" class="cursor-pointer text-uppercase">
                                            <span :class="columns.status.desc ? 'bi-arrow-up-square-fill' : 'bi-arrow-down-square-fill'"></span>    
                                            Estatus
                                        </th>
                                        <th class="text-uppercase">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="payment in payments" class="text-center text-sm fw-bold text-capitalize">
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
                                            <span class="badge bg-secondary">{{payment.payment_type}}</span>
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="viewPayments(payment.property_id)">Ver pagos</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else-if="payments == false" class="card-body">
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