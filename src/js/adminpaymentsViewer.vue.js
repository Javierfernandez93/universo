import { UserSupport } from '../../src/js/userSupport.module.js?t=5.1.4'
import { LoaderViewer } from '../../src/js/loaderViewer.vue.js?t=5.1.4'

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
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                },
                title: {
                    name: 'title',
                    desc: false,
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
                                    <tr class="align-items-center">
                                        <th @click="sortData(columns.company_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.company_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Cliente</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.company_id)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.company_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">asesor</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.company_id)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.company_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Propiedad</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.company_id)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.company_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Número de pago</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.company_id)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.company_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Estatus</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="payment in payments">
                                        <td class="align-middle text-capitalize text-center text-sm">
                                            {{payment.names}} 
                                        </td>
                                        <td @click="query = payment.seller" class="align-middle text-decoration-underline text-primary fw-bold text-capitalize text-center text-sm">
                                            {{payment.seller}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            {{payment.title}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            {{payment.last_payment_number}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge bg-secondary">{{payment.payment_type}}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
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