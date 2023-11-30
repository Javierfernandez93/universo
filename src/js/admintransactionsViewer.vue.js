import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'

const AdmintransactionsViewer = {
    name : 'admintransactions-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            transactions : null,
            transactionsAux : null,
            filters: [
                {
                    name: 'Pendientes',
                    status: 1
                },
                {
                    name: 'Procesando',
                    status: 2
                },
                {
                    name: 'Transferidas',
                    status: 3
                },
            ],
            status: 1,
            query : null,
            columns: { // 0 DESC , 1 ASC 
                withdraw_per_user_id : {
                    name: 'withdraw_per_user_id',
                    desc: false,
                },
                user_support_id : {
                    name: 'user_support_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                ammount : {
                    name: 'ammount',
                    desc: false,
                },
                method : {
                    name: 'method',
                    desc: false,
                },
                account : {
                    name: 'account',
                    desc: false,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    watch : {
        status: {
            handler() {
                this.getUsersTransactions()
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.administrators.sort((a,b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if(column.alphabetically)
                {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        applyWithdraw(transaction) {
            this.UserSupport.applyWithdraw({withdraw_per_user_id: transaction.withdraw_per_user_id},(response)=>{
                if(response.s == 1)
                {
                    transaction.status = response.status
                }
            });
        },
        sendPayout(transaction) {
            this.UserSupport.sendPayout(transaction,(response)=>{
                if(response.s == 1)
                {
                    transaction.status = response.status

                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: 'Hemos enviado la información. El pago se procesará pronto',
                        _class:'bg-gradient-success text-white'
                    })
                }
            });
        },
        deleteWithdraw(transaction) {
            console.log(transaction)
            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `
                    <div class="text-center">¿Estás seguro de eliminar esta esta transacción?</div>
                    <div class="text-center mt-3">Regresaremos <b>$ ${transaction.amount} USD </b> a la billetera de <b>${transaction.names}</b></div>`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.deleteWithdraw({withdraw_per_user_id:transaction.withdraw_per_user_id},(response)=>{
                                if(response.s == 1)
                                {
                                    transaction.status = response.status
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        getUsersTransactions() {
            this.transactions = null
            this.transactionsAux = null

            this.UserSupport.getUsersTransactions({status:this.status},(response)=>{
                if(response.s == 1)
                {
                    this.transactions = response.transactions
                    this.transactionsAux = response.transactions
                }
            })
        },
    },
    mounted() 
    {
        this.getUsersTransactions()
    },
    template: `
        <div class="card mb-4">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <div class="fs-4 fw-sembold text-primary">Pagar comisiones</div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div><span v-if="transactions" class="badge text-secondary">Total de comisiones {{transactions.length}}</span></div>
                    </div>
                </div>
            </div>
            <div class="card-header pb-0">
                <div class="row">
                    <div class="col">
                        <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div class="col-auto">
                        <select class="form-control" v-model="status">
                            <option v-for="filter in filters" v-bind:value="filter.status">{{filter.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="transactions" class="table-responsive p-0">
                    <table class="table table-striped table-hover align-items-center mb-0">
                        <thead>
                            <tr>
                                <th @click="sortData(columns.withdraw_per_user_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.withdraw_per_user_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">#</u>
                                </th>
                                <th @click="sortData(columns.user_support_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.user_support_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">ID</u>
                                </th>
                                <th @click="sortData(columns.names)" class="text-start c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.names.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Usuario</u>
                                </th>
                                <th @click="sortData(columns.ammount)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.ammount.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Monto retirado</u>
                                </th>
                                <th @click="sortData(columns.account)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.account.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Cuenta</u>
                                </th>

                                <th @click="sortData(columns.create_date)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.create_date.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Fecha de sol.</u>
                                </th>

                                <th @click="sortData(columns.create_date)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.create_date.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Estatus</u>
                                </th>

                                <th v-if="status == 1" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="transaction in transactions" class="align-middle text-center text-xs">
                                <td>
                                    {{transaction.withdraw_per_user_id}}
                                </td>
                                <td>
                                    {{transaction.user_login_id}}
                                </td>
                                <td>
                                    {{transaction.names}}
                                </td>
                                <td>
                                    <span class="fw-semibold text-dark">$ {{transaction.amount.numberFormat(2)}}</span>
                                </td>
                                <td>
                                    <div>
                                        <span class="badge border border-primary text-primary">
                                            {{transaction.method}} - 
                                            {{transaction.currency}}
                                        </span>
                                    </div>
                                
                                    <span class="text-truncate text-xs">{{transaction.wallet}}</span>
                                </td>
                                <td>
                                    {{transaction.create_date.formatDate()}}
                                </td>
                                <td>
                                    <span v-if="transaction.status == 1" class="badge bg-warning">Pendiente</span>
                                    <span v-else-if="transaction.status == 2" class="badge bg-secondary">Procesando</span>
                                    <span v-else-if="transaction.status == 3" class="badge bg-success">Transferida</span>
                                    <span v-else-if="transaction.status == -1" class="badge bg-danger">Eliminada</span>
                                </td>
                                <td
                                    v-if="status == 1"
                                    class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button class="btn btn-outline-primary btn-sm mb-0 px-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        
                                        </button>
                                        <ul class="dropdown-menu shadow">
                                        <li><button class="dropdown-item" @click="sendPayout(transaction)">Enviar</button></li>
                                            <li><button class="dropdown-item" @click="applyWithdraw(transaction)">Cambiar estatus a aplicada</button></li>
                                        
                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>
                                            <li><button class="dropdown-item" @click="deleteWithdraw(transaction)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="transactions == false" class="card-body">
                    <div class="alert alert-light mb-0 fw-semibold text-center">
                        <strong>Aviso</strong>
                        <div>No tenemos transacciones aún</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdmintransactionsViewer } 