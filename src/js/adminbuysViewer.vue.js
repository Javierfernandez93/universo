import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'

const AdminbuysViewer = {
    name : 'adminbuys-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            buys: null,
            buysAux: null,
            query: null,
            status : null,
            STATUS : {
                ALL: {
                    status: null,
                    text: 'Todas',
                },
                DELETED: {
                    status: -1,
                    text: 'Eliminada',
                },
                EXPIRED: {
                    status: 0,
                    text: 'Expirada',
                },
                PENDING: {
                    status: 1,
                    text: 'Pendiente',
                },
                VALIDATED: {
                    status: 2,
                    text: 'Validada',
                }
            },
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
            },
            CATALOG_PAYMENT_METHODS : {
                COINPAYMENTS: 1,
                EWALLET: 2,
            },
        }
    },
    watch : {
        status : {
            handler() {
                this.search()
            },
            deep: true
        },
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        filterData: function () {
            this.buys = this.buysAux

            this.buys = this.buys.filter((buy) => {
                return buy.invoice_id.toLowerCase().includes(this.query.toLowerCase()) || buy.amount.toString().includes(this.query.toLowerCase()) || buy.payment_method.toLowerCase().includes(this.query.toLowerCase()) || buy.names.toLowerCase().includes(this.query.toLowerCase()) || buy.user_login_id.toString().includes(this.query.toLowerCase()) || buy.buy_per_user_id.toString().includes(this.query.toLowerCase())
            })
        },
        getBuys: function () {
            return new Promise((resolve,reject) => {
                this.UserSupport.getBuys({status:this.status.status,query:this.query}, (response) => {
                    if (response.s == 1) {
                        resolve(response.buys)
                    }

                    reject()
                })
            })
        },
        validateBuyByAdmin: function (buy) {
            const alert = alertCtrl.create({
                title: `¿Deseas procesar éste pago?`,
                subTitle: `Procesar orden #${buy.invoice_id}`,
                buttons: [
                    { 
                        text: 'Procesar',
                        handler: data => {
                            this.UserSupport.validateBuyByAdmin({invoice_id:buy.invoice_id}, (response) => {
                                if (response.s == 1) {
                                    buy.status = this.STATUS.VALIDATED.status
                                } else if(response.r == 'INVALID_PERMISSION') {
                                    alertHtml('No tienes permisos necesarios para hacer esta acción. <strong>El incidente será reportado.</strong>')
                                }

                                alert.modal.dismiss();
                            })
                        }              
                    },
                    { 
                        text: 'Procesar sin comisiones',
                        handler: data => {
                            this.UserSupport.validateBuyByAdmin({sendCommissions:false,invoice_id:buy.invoice_id}, (response) => {
                                if (response.s == 1) {
                                    buy.status = this.STATUS.VALIDATED.status
                                } else if(response.r == 'INVALID_PERMISSION') {
                                    alertHtml('No tienes permisos necesarios para hacer esta acción. <strong>El incidente será reportado.</strong>')
                                }

                                alert.modal.dismiss();
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        deleteBuyByAdmin: function (buy) {
            const alert = alertCtrl.create({
                title: `¿Deseas eliminar éste pago?`,
                subTitle: `Eliminar orden #${buy.invoice_id}`,
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            this.UserSupport.deleteBuyByAdmin({invoice_id:buy.invoice_id}, (response) => {
                                if (response.s == 1) {
                                    buy.status = this.STATUS.DELETED.status
                                } else if(response.r == 'INVALID_PERMISSION') {
                                    alertHtml('No tienes permisos necesarios para hacer esta acción. <strong>El incidente será reportado.</strong>')
                                }

                                alert.modal.dismiss();
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        setBuyAsPendingByAdmin: function (buy) {
            const alert = alertCtrl.create({
                title: `¿Deseas cambiar a pendiente éste pago?`,
                subTitle: `Orden #${buy.invoice_id}`,
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            this.UserSupport.setBuyAsPendingByAdmin({invoice_id:buy.invoice_id}, (response) => {
                                if (response.s == 1) {
                                    buy.status = this.STATUS.PENDING.status
                                } else if(response.r == 'INVALID_PERMISSION') {
                                    alertHtml('No tienes permisos necesarios para hacer esta acción. <strong>El incidente será reportado.</strong>')
                                }

                                alert.modal.dismiss();
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        search: function () {
            this.getBuys().then((buys) => {
                this.buys = buys
                this.buysAux = buys
            }).catch(() => this.buys = false)
        },
        viewCoinpaymentsTXNId: function (buy) {
            const { txn_id } = buy.checkout_data

            this.UserSupport.viewCoinpaymentsTXNId({txn_id:txn_id}, (response) => {
                if (response.s == 1) {
                   buy.coinpaymentsResponse = response.coinpaymentsResponse
                }
            })
        },
    },
    mounted() {
        this.status = this.STATUS.PENDING
    },
    template : `
        <div v-if="buys" class="card mb-3">
            <div class="card-header">
                <span class="badge text-secondary p-0">Total {{buys.length}}</span>
                <div class="fs-4 fw-sembold text-primary">
                    Compras
                </div>
            </div>
            <div class="card-header">
                <div class="input-group input-group-lg input-group-merge">
                    <input
                        v-model="query"
                        :autofocus="true"
                        @keydown.enter.exact.prevent="search"
                        type="text" class="form-control" placeholder="Buscar compra..."/>

                    <select class="form-select" v-model="status" aria-label="Estatus">
                        <option v-for="_status in STATUS" v-bind:value="_status">
                            {{ _status.text }}
                        </option>
                    </select>

                    <button @click="search" class="btn btn-light mb-0"><i class="bi bi-search"></i></button>
                </div>
            </div>

            <div class="card">
                <div class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Orden</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Usuario</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Producto</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Método de pago</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Monto</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fecha de compra</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="buy in buys">
                                    <td class="align-middle text-center text-xs">
                                        <span class="badge border border-primary mb-1 text-primary">{{buy.buy_per_user_id}}</span>
                                        <div>
                                            <span class="badge bg-primary">#{{buy.invoice_id}}</span>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">{{buy.user_login_id}}</td>
                                    <td class="align-middle text-center text-sm">{{buy.names}}</td>
                                    <td class="align-middle text-center text-sm">
                                        <div v-if="buy.items">
                                            <div v-for="item in buy.items">
                                                {{item.title}}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge bg-success">{{buy.payment_method}}</span>
                                    </td>
                                    <td class="align-middle text-center text-sm">$ {{buy.amount.numberFormat(2)}}</td>
                                    <td class="align-middle text-center text-sm">
                                        <span v-if="buy.status == STATUS.PENDING.status" class="badge bg-warning">
                                            Pendiente de procesar
                                        </span>
                                        <span v-else-if="buy.status == STATUS.VALIDATED.status" class="badge bg-success">
                                            Pago procesado
                                        </span>
                                        <span v-else-if="buy.status == STATUS.DELETED.status" class="badge bg-danger">
                                            Pago eliminado
                                        </span>
                                        <span v-else-if="buy.status == STATUS.EXPIRED.status" class="badge bg-danger">
                                            Pago expirado
                                        </span>
                                    </td>
                                    <td class="align-middle text-center text-sm">{{buy.create_date.formatFullDate()}}</td>
                                    <td class="align-middle text-center text-sm">
                                        <div class="dropdown">
                                            <button class="btn btn-primary mb-0 shadow-none btn-sm px-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            
                                            </button>

                                            <ul class="dropdown-menu">
                                                <li v-if="buy.status == STATUS.PENDING.status"><button  
                                                    @click="validateBuyByAdmin(buy)"
                                                    class="dropdown-item">Procesar pago</button>
                                                </li>
                                                <li v-if="buy.status == STATUS.PENDING.status"><button  
                                                    @click="deleteBuyByAdmin(buy)"
                                                    class="dropdown-item">Cancelar pago</button>
                                                </li>
                                                <li v-if="buy.status == STATUS.PENDING.status && buy.catalog_payment_method_id == CATALOG_PAYMENT_METHODS.COINPAYMENTS"><button  
                                                    @click="viewCoinpaymentsTXNId(buy)"
                                                    class="dropdown-item">Ver info (COINPAYMENTS)</button>
                                                </li>
                                                <li v-if="buy.status == STATUS.DELETED.status || buy.status == STATUS.EXPIRED.status"><button  
                                                    @click="setBuyAsPendingByAdmin(buy)"
                                                    class="dropdown-item">Cambiar a pendiente</button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div v-if="buy.coinpaymentsResponse">
                                            <span class="badge bg-success">{{buy.coinpaymentsResponse.status_text}}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="buys == false" class="alert alert-light fw-semibold text-center">    
            No tenemos compras aún 
        </div>
    `,
}

export { AdminbuysViewer } 