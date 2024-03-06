import { UserSupport } from '../../src/js/userSupport.module.js?v=2.5.0'

const AdmintransactionsViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            commissions : null,
            commissionsAux : null,
            filters: [
                {
                    name: 'Pendientes',
                    status: 1
                },
                {
                    name: 'Pendientes de firma',
                    status: 2
                },
                {
                    name: 'Completadas',
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
                this.getUsersCommissions()
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
        openFileManager(id) 
        {
            $(`#${id}`).click()
        },
        uploadFile(event,commission) 
        {
            let files = $(event.target).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
            form_data.append("commission_per_user_id", commission.commission_per_user_id);
            
            this.UserSupport.uploadCommissionFile(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                commission.file = response.target_path

                toastInfo({
                    message: "Imagen subida correctamente", 
                })

                this.getUsersCommissions()

                this.showAlertEmailCommission(commission)
              }
            });
        },
        showAlertEmailCommission(commission) {
            let alert = alertCtrl.create({
                title: "Email",
                subTitle: `¿Quieres enviar un email a <b>${commission.names}</b> para notificarle que su comisión ha sido aprobada?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.sendEmailCommission({commission_per_user_id:commission.commission_per_user_id},(response)=>{
                                if(response.s == 1)
                                {
                                    commission.status = response.status
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
        deleteWithdraw(commission) {
            let alert = alertCtrl.create({
                title: "Aviso",
                subTitle: `
                    <div class="text-center">¿Estás seguro de eliminar esta esta transacción?</div>
                    <div class="text-center mt-3">Regresaremos <b>$ ${commission.amount} USD </b> a la billetera de <b>${commission.names}</b></div>`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.deleteWithdraw({commission_per_user_id:commission.commission_per_user_id},(response)=>{
                                if(response.s == 1)
                                {
                                    commission.status = response.status
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
        getUsersCommissions() {
            this.commissions = null
            this.commissionsAux = null

            this.UserSupport.getUsersCommissions({status:this.status},(response)=>{
                if(response.s == 1)
                {
                    this.commissions = response.commissions
                    this.commissionsAux = response.commissions
                }
            })
        },
    },
    mounted() 
    {
        this.getUsersCommissions()
    },
    template: `
        <div class="card mb-4">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <div v-if="commissions" class="text-xs text-secondary">total {{commissions.length}}</div>
                        <div class="h5">
                            Comisiones
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div><span v-if="transactions" class="badge text-secondary">Total de comisiones {{transactions.length}}</span></div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div class="col-12 col-xl-auto">
                        <select class="form-control" v-model="status">
                            <option v-for="filter in filters" v-bind:value="filter.status">{{filter.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="commissions" class="table-responsive-sm p-0">
                    <table class="table table-striped table-hover align-items-center mb-0">
                        <thead>
                            <tr>
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

                                <th @click="sortData(columns.account)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.account.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Motivo</u>
                                </th>
                                <th @click="sortData(columns.ammount)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.ammount.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Comisión</u>
                                </th>

                                <th @click="sortData(columns.create_date)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                    <span v-if="columns.create_date.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>
                                    <span v-else>
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>
                                    <u class="text-sm ms-2">Fecha</u>
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
                            <tr v-for="(commission,key) in commissions" class="align-middle text-center text-xs">
                                <td>
                                    {{commission.commission_per_user_id}}
                                </td>
                                <td>
                                    {{commission.names}}
                                </td>
                                <td>
                                    {{commission.name}}
                                </td>
                                <td>
                                    <span class="fw-semibold text-dark">$ {{commission.amount.numberFormat(2)}} MXN</span>
                                </td>
                                <td>
                                    {{commission.create_date.formatDate()}}
                                </td>
                                <td>
                                    <span v-if="commission.status == 1" class="badge bg-dark">Pendiente comprobante</span>
                                    <span v-else-if="commission.status == 2" class="badge bg-secondary">Pendientes de firma</span>
                                    <span v-else-if="commission.status == 3" class="badge bg-success">Completado</span>
                                    <span v-else-if="commission.status == -1" class="badge bg-danger">Eliminada</span>
                                </td>
                                <td v-if="status == 1" class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button class="btn btn-dark mb-0 shadow-none btn-sm mb-0 px-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        
                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <input class="d-none" @change="uploadFile($event,commission)" :id="commission.commission_per_user_id" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                            
                                            <li><button class="dropdown-item" @click="openFileManager(commission.commission_per_user_id)">Subir comprobante</button></li>    

                                            <li>
                                                <hr class="dropdown-divider">
                                            </li>
                                            <li><button class="dropdown-item" @click="deleteWithdraw(commission)">Eliminar</button></li>
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