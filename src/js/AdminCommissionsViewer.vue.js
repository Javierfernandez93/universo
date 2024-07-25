import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.8'
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.0.8'
import OffCanvasViewer from '../../src/js/offcanvasViewer.vue.js?v=1.0.8'
import CommissionModel from '../../src/js/models/commission.module.js?v=1.0.8'

const AdminCommissionsViewer = {
    components : {
        HighLigth,
        OffCanvasViewer
    },
    data() {
        return {
            UserSupport : new UserSupport,
            commission: CommissionModel,
            catalogCommissions: [],
            administrators: [],
            commissions : [],
            commissionsAux : [],
            filled : false,
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
            busy : false,
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
        commission: {
            handler() {
                this.filled = this.commission.amount 
                && this.commission.catalog_commission_id
                && this.commission.user_login_id 
            },
            deep: true
        },
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
        addCommission() {
            this.$refs.offCanvas.show()
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
        uploadFile(event) 
        {
            return new Promise((resolve,reject)=>{
                
                let files = $(event.target).prop('files');
                var form_data = new FormData();
            
                form_data.append("file", files[0]);
                
                this.UserSupport.uploadCommissionFile(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.target_path)

                        // toastInfo({
                        //     message: "Imagen subida correctamente", 
                        // })

                        // this.getUsersCommissions()
                        // this.showAlertEmailCommission(commission)
                    }
                });
            })
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
            this.busy = true
            this.commissions = []
            this.commissionsAux = []
            
            this.UserSupport.getUsersCommissions({status:this.status},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.commissions = response.commissions
                    this.commissionsAux = response.commissions
                }
            })
        },
        getAdministrators() {
            this.busy = true
            this.UserSupport.getAdministrators({status:this.status},async(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.administrators = response.administrators

                    await sleep(1000)

                    $('.selectpicker-leaders').selectpicker();
                    $('.selectpicker-leaders').change(() =>{
                        this.commission.user_login_id = $('.selectpicker-leaders').val();
                    });

                    this.commission.user_login_id = this.administrators[0].user_support_id
                }
            })
        },
        getCatalogCommission() {
            this.busy = true
            this.UserSupport.getCatalogCommission({status:this.status},async(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.catalogCommissions = response.catalogCommissions

                    await sleep(1000)

                    $('.selectpicker-commissions').selectpicker();
                    $('.selectpicker-commissions').change(() =>{
                        this.commission.catalog_commission_id = $('.selectpicker-commissions').val();
                    });

                    this.commission.catalog_commission_id = this.catalogCommissions[0].catalog_commission_id
                }
            })
        },
        editCommission(commission) {
            this.commission = commission

            $('.selectpicker-leaders').selectpicker('val', this.commission.user_login_id.toString());
            $('.selectpicker-leaders').selectpicker('refresh');

            $('.selectpicker-commissions').selectpicker('val', this.commission.catalog_commission_id.toString());    
            $('.selectpicker-commissions').selectpicker('refresh');

            this.$refs.offCanvas.show()
        },
        saveCommission() {
            this.busy = true
            
            this.UserSupport.saveCommission(this.commission,async(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.commission = CommissionModel
                    this.filled = false

                    toastInfo({
                        message: '✅ Comisión guardada',
                    })

                    this.$refs.offCanvas.hide()

                    this.getUsersCommissions()
                }
            })
        },
    },
    mounted() 
    {
        this.getUsersCommissions()
        this.getAdministrators()
        this.getCatalogCommission()
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
                        <input :disabled="busy" :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div class="col-12 col-xl-auto">
                        <select class="form-control" v-model="status">
                            <option v-for="filter in filters" v-bind:value="filter.status">{{filter.name}}</option>
                        </select>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button @click="getUsersCommissions" class="btn btn-dark btn-sm px-3 mb-0 shadow-none">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button @click="addCommission" class="btn btn-dark btn-sm px-3 mb-0 shadow-none">
                            Añadir
                        </button>
                    </div>
                </div> 
            </div>

            <HighLigth :busy="busy" :dataLength="commissions.length" :query="query"/>

            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="commissions.length > 0" class="table-responsive-sm p-0">
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
                                            
                                            <li><button class="dropdown-item" @click="editCommission(commission)">Subir comprobante</button></li>    

                                            <li><button class="dropdown-item" @click="deleteWithdraw(commission)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <OffCanvasViewer title="Añadir comisión" ref="offCanvas">
            <div class="form-floating mb-3">
                <input v-model="commission.amount" :class="commission.amount ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.price.focus()" type="number" class="form-control" placeholder="Monto">
                <label for="price">Monto</label>
            </div>

            <div class="card border border-ligth mb-3">
                <input class="d-none" @change="uploadFile($event,commission).then((file)=>{commission.file = file})" ref="file" id="file" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />

                <img v-if="commission.file" :src="commission.file" class="img-fluid img-thumbnail" alt="logo" title="logo" class="img-fluid"/>

                <div class="card-footer">
                    <div class="d-grid">
                        <button class="btn btn-dark shadow-none mb-0" @click="$refs.file.click()">

                            <span v-text="commission.file ? 'Cambiar' : 'Subir'"></span>
                            
                            <div class="text-xs">
                                (Clic subir comprobante)
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="administrators.length > 0">
                <label>Elegir Líder</label>
                <select class="selectpicker selectpicker-leaders form-control" data-live-search="true" data-style="border shadow-none">
                    <option v-for="administrator in administrators" :data-tokens="administrator.names" :data-content="administrator.names">{{ administrator.user_support_id }}</option>
                </select>
            </div>

            <div v-if="catalogCommissions.length > 0">
                <label>Elegir comisión</label>
                <select class="selectpicker selectpicker-commissions form-control" data-live-search="true" data-style="border shadow-none">
                    <option v-for="catalogCommission in catalogCommissions" :data-tokens="catalogCommission.name" :data-content="catalogCommission.name">{{ catalogCommission.catalog_commission_id }}</option>
                </select>
            </div>

            <div class="d-grid">
                <button :disabled="!filled" class="btn btn-primary shadow-none mb-0" @click="saveCommission">
                    Guardar comisión
                </button>   
            </div>
        </OffCanvasViewer>
    `
}

export { AdminCommissionsViewer }