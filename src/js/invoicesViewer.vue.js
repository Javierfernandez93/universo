import { User } from '../../src/js/user.module.js?v=2.3.5'   

const InvoicesViewer = {
    name : 'invoices-viewer',
    data() {
        return {
            User: new User,
            busy: false,
            query: null,
            invoices: null,
            invoicesAux: null,
            STATUS : {
                DELETED: -1,
                CANCELED: 0,
                PENDING: 1,
                PAYED: 2,
                REFUND: 3,
            }
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.invoices = this.invoicesAux
            this.invoices = this.invoices.filter((invoice) => {
                return invoice.amount.toString().includes(this.query) 
                    || invoice.invoice_id.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getInvoices() {
            return new Promise((resolve, reject) => {
                this.busy = true
                this.User.getInvoices({}, (response) => {
                    this.busy = false
                    
                    if (response.s == 1) {
                        resolve(response.invoices)
                    }

                    reject()
                })
            })
        },
    },
    mounted() {
        this.getInvoices().then((invoices) => {
            this.invoices = invoices
            this.invoicesAux = invoices
        }).catch((err) => { this.invoices = false })
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-if="invoices">
            <div class="card bg-transparent shadow-none">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">
                            <span class="badge p-0 text-dark">Total {{invoices.length}}</span>
                            <div class="fs-4 text-primary fw-semibold">
                                Mis compras
                            </div>
                        </div>
                    
                        <div class="col">
                            <input type="search" :autofocus="true" class="form-control" v-model="query" placeholder="buscar por monto o items"/>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-borderless table-hover">
                        <thead class="thead-light">
                            <tr class="text-xs text-center text-secondary">
                                <th class="text-uppercase">
                                    ORDEN ID
                                </th>
                                <th class="text-uppercase">
                                    Items
                                </th>
                                <th class="text-uppercase">
                                    Fecha
                                </th>
                                <th class="text-uppercase">
                                    Estatus
                                </th>
                                <th class="text-uppercase">
                                    Método de pago
                                </th>
                                <th class="text-uppercase">
                                    Total
                                </th>
                                <th class="text-uppercase">
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in invoices" class="align-middle text-xs text-center">
                                <td class="text-secondary fw-semibold">
                                    #{{invoice.invoice_id}}
                                </td>
                                <td class="text-dark fw-semibold">
                                    <span v-for="(item,index) in invoice.items" class="text-primary">
                                        {{item.title}} {{index < invoice.items.length -1 ? ',' : ''}}
                                    </span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    <span class="my-2 text-xs">{{invoice.create_date.formatFullDate()}}</span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    <span v-if="invoice.status == STATUS.DELETED"
                                        class="badge bg-danger">
                                        <i class="bi bi-dash-circle-fill"></i>
                                        Eliminada
                                    </span>
                                    <span v-else-if="invoice.status == STATUS.CANCELED"
                                        class="badge bg-warning">
                                        <i class="bi bi-dash-circle"></i>
                                        Cancelada
                                    </span>
                                    <span v-else-if="invoice.status == STATUS.PENDING"
                                        class="badge bg-secondary">
                                        <i class="bi bi-clock"></i>
                                        Pendiente
                                    </span>
                                    <span v-else-if="invoice.status == STATUS.PAYED"
                                        class="badge bg-success">
                                        <i class="bi bi-check-circle"></i> 
                                        Pagada
                                    </span>
                                    <span v-else-if="invoice.status == STATUS.REFUND"
                                        class="badge bg-primary">
                                        <i class="bi bi-arrow-clockwise"></i>
                                        Reembolsada
                                    </span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    <span class="badge bg-primary">{{invoice.catalog_payment_method.payment_method}}</span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    <span class="my-2 text-xs">$ {{invoice.amount.numberFormat(2)}}</span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    <div v-if="invoice.checkout_data.checkout_url">
                                        <a v-if="invoice.status == STATUS.PENDING"
                                            :href="invoice.checkout_data.checkout_url"
                                            :disabled="invoice.status != STATUS.PENDING"
                                            target="_blank"
                                            class="btn btn-sm shadow-none m-0 btn-success"
                                            >
                                            Pagar
                                        </a>
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else-if="invoices == false" class="alert alert-white text-center">
            <div><strong>Importante</strong></div>
            Aquí te mostraremos las compras que realices de tus producto.

            <div class="d-flex justify-content-center py-3">
                <a href="../../apps/store/package" class="btn btn-primary me-2 mb-0 shadow-none">Adquiere tus productos</a>
            </div>
        </div>
    `,
}

export { InvoicesViewer } 