import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'   

const AdminatiViewer = {
    name : 'adminati-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            busy: false,
            users: null,
            usersAux: null,
            STATUS: { 
                DELETE : -1,
                INACTIVE : 0,
                WATINING_CREDENTIALS : 1,
                ACTIVE : 2,
            },
            columns: { // 0 DESC , 1 ASC 
                user_api_id: {
                    name: 'user_api_id',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                sandbox: {
                    name: 'sandbox',
                    desc: false,
                },
                trx: {
                    name: 'trx',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                email: {
                    name: 'email',
                    desc: false,
                    alphabetically: true,
                },
                address: {
                    name: 'address',
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
            this.apis.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.apis = this.apisAux
            this.apis = this.apis.filter(api =>  api.name.toLowerCase().includes(this.query.toLowerCase()))
        },
        getAdminUserAti() {
            return new Promise((resolve, reject) =>{
                this.busy = true
                this.UserSupport.getAdminUserAti({},(response)=>{
                    this.busy = false
                    if(response.s == 1)
                    {
                        resolve(response.users)
                    }

                    reject()
                })
            })
        },
        sendAtiCredentials(user)
        {
            this.busy = true
            let alert = alertCtrl.create({
                title: "Aviso",
                subTitle: `<div class="text-center mb-3">¿Deseas envíar un correo con los accesos a ATI?</div>`,
                buttons: [
                    {
                        text: "Sí, enviar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.sendAtiCredentials(user,(response)=>{
                                this.busy = false

                                if(response.s == 1)
                                {
                                    alertInfo({
                                        icon:'<i class="bi bi-check"></i>',
                                        message: 'Credenciales enviadas',
                                        _class:'bg-gradient-success text-white'
                                    })
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

            alertCtrl.present(alert.modal);
        },
        addAtiCredentials(user)
        {
            let alert = alertCtrl.create({
                title: "Importante",
                subTitle: `<div class="text-center mb-3">Añade los datos de la cuenta a continuación</div>`,
                inputs: [
                    {
                        type: 'text',
                        placeholder: 'Usuario',
                        id: 'user',
                        name: 'user',
                    },
                    {
                        type: 'text',
                        placeholder: 'Contraseña',
                        id: 'password',
                        name: 'password',
                    },
                    {
                        type: 'text',
                        placeholder: 'SerialKey',
                        id: 'serial_key',
                        name: 'serial_key',
                    },
                    {
                        type: 'text',
                        placeholder: 'IP',
                        id: 'ip',
                        name: 'ip',
                    }
                ],
                buttons: [
                    {
                        text: "Añadir cuenta",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            data.user_login_id = user.user_login_id

                            if(data.ip)
                            {
                                if(data.user)
                                {
                                    if(data.password)
                                    {
                                        if(data.serial_key)
                                        {
                                            this.UserSupport.addAtiCredentials(data,(response)=>{
                                                if(response.s == 1)
                                                {
                                                    user.status = this.STATUS.ACTIVE
                                                    this.getAdminUserAtiMaster()
                                                }
                                            })
                                        } else {
                                            alertInfo({
                                                icon:'<i class="bi bi-x"></i>',
                                                message: 'Debes de ingresar un serial key',
                                                _class:'bg-gradient-danger text-white'
                                            })
                                        }
                                    } else {
                                        alertInfo({
                                            icon:'<i class="bi bi-x"></i>',
                                            message: 'Debes de ingresar una contraseñas',
                                            _class:'bg-gradient-danger text-white'
                                        })
                                    }
                                } else {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'Debes de ingresar un usuario',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            } else {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: 'Debes de ingresar una I.P.',
                                    _class:'bg-gradient-danger text-white'
                                })
                            }
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

            alertCtrl.present(alert.modal);
        },
        deleteUserApi(api) {
            this.UserSupport.deleteUserApi({user_api_id:api.user_api_id},(response)=>{
                if(response.s == 1)
                {
                    api.status = response.status   
                }
            })
        },
        getAdminUserAtiMaster() {
            this.getAdminUserAti().then((users)=>{
                this.users = users
                this.usersAux = users
            })
        },
    },
    mounted() 
    {       
        this.getAdminUserAtiMaster()
    },
    template : `
    <div class="card border-radius-2xl mb-4">
        <div class="card-header pb-0">
            <div class="row align-items-center">
                <div v-if="users" class="col fw-sembold text-primary">
                    <div><span class="badge bg-secondary text-xxs">Total {{users.length}}</span></div>
                    <div class="fs-5">Lista de usuarios</div>
                </div>
                <div class="col-auto">
                    <div v-if="busy" class="spinner-grow spinner-grow-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-header">
            <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
        </div>
        <div v-if="users" class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr class="align-items-center text-center">
                            <th @click="sortData(columns.user_api_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                <span v-if="columns.user_api_id.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">ID</u>
                            </th>
                            <th 
                                @click="sortData(columns.names)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.names.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Usuario</u>
                            </th>
                            <th 
                                @click="sortData(columns.email)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.email.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Email</u>
                            </th>
                            <th 
                                @click="sortData(columns.sandbox)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.sandbox.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Deriv</u>
                            </th>
                            <th 
                                @click="sortData(columns.create_date)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.create_date.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">VPS</u>
                            </th>
                            <th 
                                @click="sortData(columns.address)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.address.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Creado</u>
                            </th>
                            <th 
                                @click="sortData(columns.trx)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.trx.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Estatus</u>
                            </th>
                            <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" class="text-center">
                            <td class="align-middle text-center">
                                {{user.user_login_id}}
                            </td>
                            <td class="align-middle text-xs">
                                {{user.names}}
                            </td>
                            <td class="align-middle text-xs">
                                {{user.email}}
                            </td>
                            <td class="align-middle">
                                <div class="mb-3">
                                    <div class="text-xs text-secondary">Server</div>
                                    <div class="fw-semibold text-dark" v-text="user.deriv_server ? user.deriv_server : '-'"></div>
                                </div>
                                <div>
                                    <div class="text-xs text-secondary">Login</div>
                                    <div class="fw-semibold text-dark" v-text="user.deriv_login ? user.deriv_login : '-'"></div>
                                </div>
                            </td>
                            <td class="align-middle">
                                <div class="mb-3">
                                    <div class="text-xs text-secondary">Usuario</div>
                                    <div class="fw-semibold text-dark" v-text="user.user ? user.user : '-'"></div>
                                </div>
                                <div class="mb-3">
                                    <div class="text-xs text-secondary">Password</div>
                                    <div class="fw-semibold text-dark" v-text="user.password ? user.password : '-'"></div>
                                </div>
                                <div>
                                    <div class="text-xs text-secondary">IP</div>
                                    <div class="fw-semibold text-dark" v-text="user.ip ? user.ip : '-'"></div>
                                </div>
                                <div>
                                    <div class="text-xs text-secondary">Serial Key</div>
                                    <div class="fw-semibold text-dark" v-text="user.serial_key ? user.serial_key : '-'"></div>
                                </div>
                            </td>
                            <td class="align-middle">
                                {{user.create_date.formatDate()}}
                            </td>
                            <td class="align-middle">
                                <span v-if="user.status == STATUS.DELETE" class="badge bg-danger">Eliminado</span>
                                <span v-else-if="user.status == STATUS.INACTIVE" class="badge bg-secondary">Inactivo</span>
                                <span v-else-if="user.status == STATUS.WATINING_CREDENTIALS" class="badge bg-warning">Esperando credenciales</span>
                                <span v-else-if="user.status == STATUS.ACTIVE" class="badge bg-primary">Listo</span>
                            </td>
                            <td class="align-middle">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-outline-primary px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                    </button>
                                    <ul class="dropdown-menu shadow">
                                        <li v-if="user.status == STATUS.WATINING_CREDENTIALS" ><button class="dropdown-item" @click="addAtiCredentials(user)">Añadir credenciales</button></li>
                                        <li v-if="user.status == STATUS.ACTIVE" ><button class="dropdown-item" @click="addAtiCredentials(user)">Cambiar credenciales</button></li>
                                        <li v-if="user.status == STATUS.ACTIVE" ><button class="dropdown-item" @click="sendAtiCredentials(user)">Enviar email con credenciales</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="apis == false"
            class="card-body">
            <div class="alert alert-secondary text-white text-center">
                <div>Not user apis found</div>
            </div>
        </div>
    </div>
    `
}

export { AdminatiViewer }