import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.8'

const PropertypaymentsViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            payments: null,
            paymentsAux: null,
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
                return payment.image.toLowerCase().includes(this.query.toLowerCase()) 
                || payment.create_date.toLowerCase().includes(this.query.toLowerCase()) 
                || payment.payment_number.toString().includes(this.query.toLowerCase())
            })
        },
        viewPayments(property_id) {
            window.location.href = `../../apps/admin-payments/view.php?pid=${property_id}`
        },
        getPropertyPayments(property_id) {
            this.UserSupport.getPropertyPayments({property_id:property_id}, (response) => {
                if (response.s == 1) {
                    this.paymentsAux = response.payments.map((payment) => {
                        payment.create_date = payment.create_date.formatFullDate()
                        return payment
                    })
                    this.payments = this.paymentsAux
                }
            })
        },
        viewImage(image) {
            alertImage({
                image:image,
                size:'modal-md'
            },0)
        },
        setPaymentStatusAs(payment,status) {
            this.UserSupport.setPaymentStatusAs({pull_property_id:payment.pull_property_id,status:status}, (response) => {
                if (response.s == 1) {
                    payment.status = status

                    if(payment.status == '2')
                    {
                        toastInfo({
                            message: '✅ Pago aprobado',
                        })
                    } else if(payment.status == '1') {
                        toastInfo({
                            message: 'Desaprobamos el pago',
                        })
                    }
                }
            })
        },
    },
    mounted() {
        if(getParam("pid")) 
        {
            this.getPropertyPayments(getParam("pid"))
        }
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="payments" class="badge text-secondary p-0">Total {{payments.length}}</span>
                                <div class="h5">
                                    Todos los pagos
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>
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
                                            <u class="text-sm ms-2">Pago</u>
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
                                            <u class="text-sm ms-2">Voucher</u>
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
                                            <u class="text-sm ms-2">Fecha</u>
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
                                            {{payment.payment_number}} 
                                        </td>
                                        <td class="align-middle text-decoration-underline text-primary fw-bold text-capitalize text-center text-sm">
                                            <button @click="viewImage(payment.image)" class="btn px-3 mb-0 shadow-none btn-sm btn-light">Ver aquí</button>
                                            <a :href="payment.image" target="_blank" class="btn px-3 mb-0 shadow-none btn-sm btn-light ms-2">Ver</a>
                                            <a :href="payment.image" download class="btn px-3 mb-0 shadow-none btn-sm ms-2 btn-success">Descargar</a>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            {{payment.create_date}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span v-if="payment.status == '1'" class="badge bg-secondary">
                                                Pendiente de aprobar
                                            </span>
                                            <span v-if="payment.status == '-1'" class="badge bg-danger">
                                                Eliminado
                                            </span>
                                            <span v-if="payment.status == '2'" class="badge bg-success">
                                                Aprobado
                                            </span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 btn-dark mb-0 shadow-none btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li v-if="payment.status == '1'">
                                                        <button class="dropdown-item" @click="setPaymentStatusAs(payment,2)">Aprobar pago</button>
                                                    </li>
                                                    <li v-if="payment.status == '2'">
                                                        <button class="dropdown-item" @click="setPaymentStatusAs(payment,1)">Desaprobar pago</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { PropertypaymentsViewer }