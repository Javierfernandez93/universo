import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'   

const BridgeusersViewer = {
    name : 'bridgeusers-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            accounts: null,
            accountsAux: null,
            query: null,
            user: {
                names: null,
                user_login_id: null,
            },
            status: 0,
            CATALOG_MAM_ACCOUNT :{
                FOREX : 1,
                BTC : 2,
            },
            CATALOG_BRIDGE_BUY_TYPE :{
                FUNDS : 1,
                MAM : 2,
            },
            STATUS :{
                PENDING : 0,
                ACTIVE : 1
            },
            columns: { // 0 DESC , 1 ASC 
                buy_per_user_id : {
                    name: 'buy_per_user_id',
                    desc: false,
                },
                buy_per_bridge_id : {
                    name: 'buy_per_bridge_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                },
                account : {
                    name: 'account',
                    desc: false,
                },
                amountReal : {
                    name: 'amountReal',
                    desc: false,
                },
                amount : {
                    name: 'amount',
                    desc: false
                },
                type : {
                    name: 'type',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            },
            filters: [
                {
                    name: 'Pendientes de validación de pago',
                    status: 0
                },
                {
                    name: 'Pagadas',
                    status: 1
                },
                {
                    name: 'Enviando pago a Bridge',
                    status: 2
                },
                {
                    name: 'Completadas',
                    status: 3
                },
            ],
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        },
        status: {
            handler() {
                this.getAllBuyPerBridgeMain()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.accounts = this.accountsAux
            this.accounts = this.accounts.filter(account => {
                return account.account.toString().includes(this.query)
            })
        },
        addBridgeAccount() {
            let alert = alertCtrl.create({
                title: "Añadir usuario Bridge",
                subTitle: `<div class="mb-3 text-center">Ingresa la información</div>`,
                size: `modal-md`,
                inputs: [
                    {
                        type: 'text',
                        id: 'account',
                        name: 'account',
                        placeholder: 'No. MT5',
                    },
                    {
                        type: 'radio',
                        id: 'forex',
                        name: 'catalog_mam_account_id',
                        value: '1',
                        placeholder: 'Forex',
                        text: 'Forex',
                    },
                    {
                        type: 'radio',
                        id: 'btc',
                        name: 'catalog_mam_account_id',
                        value: '2',
                        placeholder: 'BTC',
                        text: 'BTC',
                    }
                ],
                buttons: [
                    {
                        text: "Dar de alta",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            data.user_login_id = this.user.user_login_id
                            data.catalog_mam_account_id = $("[name=catalog_mam_account_id]:checked").val()


                            alert.modal.dismiss();

                            if(data.account)
                            {
                                if(data.catalog_mam_account_id)
                                {
                                    this.UserSupport.addAdminBridgeAccount(data,(response)=>{
                                        if(response.s == 1)
                                        {
                                            this.getAdminAllUserBridgeAccountMain()
                                            alertInfo({
                                                icon:'<i class="bi bi-ui-checks"></i>',
                                                message: 'Éxito al ejecutar tarea',
                                                _class:'bg-gradient-success text-white'
                                            })
                                        }
                                    })
                                } else {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'Selecciona un tipo de cuenta',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            } else {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: 'Ingresa una cuenta válida',
                                    _class:'bg-gradient-danger text-white'
                                })
                            }
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
        editBridgeAccount(account) {
            console.log(account)
            let alert = alertCtrl.create({
                title: "Añadir usuario Bridge",
                subTitle: `<div class="mb-3 text-center">Ingresa la información</div>`,
                size: `modal-md`,
                inputs: [
                    {
                        type: 'text',
                        id: 'account',
                        name: 'account',
                        value : account.account,
                        placeholder: 'No. MT5',
                    },
                    {
                        type: 'radio',
                        id: 'forex',
                        name: 'catalog_mam_account_id',
                        value: '1',
                        placeholder: 'Forex',
                        text: 'Forex',
                        checked: account.catalog_mam_account_id == this.CATALOG_MAM_ACCOUNT.FOREX,
                    },
                    {
                        type: 'radio',
                        id: 'btc',
                        name: 'catalog_mam_account_id',
                        value: '2',
                        placeholder: 'BTC',
                        checked: account.catalog_mam_account_id == this.CATALOG_MAM_ACCOUNT.BTC,
                        text: 'BTC',
                    }
                ],
                buttons: [
                    {
                        text: "Editar cuenta",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            data.user_bridge_account_id = account.user_bridge_account_id
                            data.catalog_mam_account_id = $("[name=catalog_mam_account_id]:checked").val()

                            alert.modal.dismiss();

                            if(data.catalog_mam_account_id)
                            {
                                this.UserSupport.editBridgeAccount(data,(response)=>{
                                    if(response.s == 1)
                                    {
                                        this.getAdminAllUserBridgeAccountMain()

                                        alertInfo({
                                            icon:'<i class="bi bi-ui-checks"></i>',
                                            message: 'Éxito al ejecutar tarea',
                                            _class:'bg-gradient-success text-white'
                                        })
                                    }
                                })
                            } else {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: 'Selecciona un tipo de cuenta',
                                    _class:'bg-gradient-danger text-white'
                                })
                            }
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
        deleteBridgeAccount(account) {
            let alert = alertCtrl.create({
                title: "Eliminar cuenta Bridge",
                subTitle: `<div class="mb-3 text-center">¿Estás seguro de eliminar la cuenta de ${account.first_name}?</div>`,
                buttons: [
                    {
                        text: "Sí, eliminar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.deleteBridgeAccount({user_bridge_account_id:account.user_bridge_account_id},(response)=>{
                                if(response.s == 1)
                                {
                                    this.getAdminAllUserBridgeAccountMain()

                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: 'Éxito al ejecutar tarea',
                                        _class:'bg-gradient-success text-white'
                                    })
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
        setAsActiveBridgeAccount(account) {
            let alert = alertCtrl.create({
                title: "Aviso",
                subTitle: `<div class="mb-3 text-center">¿Estás seguro de pasar la cuenta de ${account.first_name} como registrada en BridgeMarkets?</div>`,
                size: `modal-md`,
                buttons: [
                    {
                        text: "Sí, proceder",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.setAsActiveBridgeAccount({user_bridge_account_id:account.user_bridge_account_id},(response)=>{
                                if(response.s == 1)
                                {
                                    this.getAdminAllUserBridgeAccountMain()

                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: 'Éxito al ejecutar tarea',
                                        _class:'bg-gradient-success text-white'
                                    })
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
        lookupBridgeAccount(account) {
            let alert = alertCtrl.create({
                title: "Aviso importante",
                subTitle: `<div class="mb-3 text-center">Para garantizar el registro es importante que el usuario cuente con todos los datos. ¿Desea proceder?</div>`,
                size: `modal-md`,
                buttons: [
                    {
                        text: "Sí, proceder",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.lookupBridgeAccount({user_bridge_account_id:account.user_bridge_account_id},(response)=>{
                                if(response.s == 1)
                                {
                                    this.getAdminAllUserBridgeAccountMain()

                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: 'Éxito al ejecutar tarea',
                                        _class:'bg-gradient-success text-white'
                                    })
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
        attachBridgeAccount(account) {
            let alert = alertCtrl.create({
                title: "Agrega cuenta MT5",
                subTitle: `<div class="mb-3 text-center">Añade la cuenta MT5 del usuario</div>`,
                inputs: [
                    {
                        type: 'texnumber',
                        class: 'form-control',
                        id: 'account',
                        name: 'account',
                    }
                ],
                buttons: [
                    {
                        text: "Sí, proceder",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            console.log(data)
                            this.UserSupport.attachBridgeAccount({user_bridge_account_id:account.user_bridge_account_id,account:data.account},(response)=>{
                                if(response.s == 1)
                                {
                                    this.getAdminAllUserBridgeAccountMain()

                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: 'Éxito al ejecutar tarea',
                                        _class:'bg-gradient-success text-white'
                                    })
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
        getAdminAllUserBridgeAccount() {
            return new Promise((resolve, reject) => {
                this.UserSupport.getAdminAllUserBridgeAccount({user_login_id:this.user.user_login_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.accounts)
                    }

                    reject()
                })
            })
        },
        getUserProfile() {
            return new Promise((resolve, reject) => {
                this.UserSupport.getUserProfile({user_login_id:this.user.user_login_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.user)
                    }

                    reject()
                })
            })
        },
        getAdminAllUserBridgeAccountMain() {
            this.accounts = null
            this.accountsAux = null

            this.getAdminAllUserBridgeAccount().then((accounts)=>{
                this.accounts = accounts
                this.accountsAux = accounts
            }).catch((err) => {
                this.accounts = false
                this.accountsAux = false
            })
        },
    },
    mounted() {
        if(getParam("ulid"))
        {
            this.user.user_login_id = getParam("ulid")

            this.getUserProfile().then((user)=>{
                this.user = {...this.user,...user}

                this.getAdminAllUserBridgeAccountMain()
            })
        }
    },
    template : `
        <div class="card mb-3">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <div class="fs-4 fw-sembold text-primary">
                            Cuentas Bridge de  {{user.names}}
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div class="row">
                            <div class="col">
                                <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..." />
                            </div>
                            <div class="col-auto">
                                <button @click="addBridgeAccount" class="btn btn-primary mb-0 shadow-none">Añadir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="accounts" class="card">
            <table class="table table-stripped table-hover">
                <thead class="text-center text-xs">
                    <tr>
                        <th>ID usuario</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Tipo cuenta</th>
                        <th>Cuenta MT5</th>
                        <th>Estatus</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody class="text-center text-xs">
                    <tr v-for="account in accounts" class="align-middle">
                        <td>{{account.user_login_id}}</td>
                        <td>
                            <span v-text="account.first_name ? account.first_name : ''"></span> <span v-text="account.last_name ? account.last_name : ''"></span>
                        </td>
                        <td>
                            <span v-text="account.address ? account.address : ''"></span> <span v-text="account.country ? account.country : ''"></span>
                        </td>
                        <td>
                            <span v-text="account.phone_number ? account.phone_number : '-'"></span>
                        </td>
                        <td>
                            <span v-text="account.email ? account.email : '-'"></span>
                        </td>
                        <td>
                            <span v-text="account.type ? account.type : '-'"></span>
                        </td>
                        <td>
                            <span v-text="account.account ? account.account : '-'"></span>
                        </td>
                        <td>
                            <span v-if="account.status == STATUS.PENDING" class="badge bg-secondary">
                                Pendiente de dar de alta
                            </span>
                            <span v-else-if="account.status == STATUS.ACTIVE" class="badge bg-success">
                                Registrado
                            </span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn btn-outline-primary px-3 mb-0 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li v-if="!account.account"><button class="dropdown-item" @click="attachBridgeAccount(account)">Añadir cuenta MT5</button></li>
                                    <li v-if="account.status == STATUS.PENDING"><button class="dropdown-item" @click="lookupBridgeAccount(account)">Mandar registro a Bridge</button></li>
                                    <li v-if="account.status == STATUS.PENDING"><button class="dropdown-item" @click="setAsActiveBridgeAccount(account)">Agregar como registrado en Bridge</button></li>
                                    <li v-if="account.status == STATUS.ACTIVE"><button class="dropdown-item" @click="editBridgeAccount(account)">Editar</button></li>
                                    <li v-if="account.status == STATUS.ACTIVE"><button class="dropdown-item" @click="deleteBridgeAccount(account)">Eliminar</button></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else-if="accounts == false" class="card">
            <div class="card-body">
                <div class="alert alert-light mb-0 fw-semibold text-center">
                    <strong>Aviso</strong>
                    <div>No tiene cuentas este usuario</div>
                </div>
            </div>
        </div>
    `,
}

export { BridgeusersViewer } 