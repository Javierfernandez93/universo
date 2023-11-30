import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'

const AdminaddgainsViewer = {
    name : 'adminaddgains-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            done: null,
            query: null,
            users: null,
            busyButton: false,
            usersAux: null,
            STATES: Object.freeze({
                DISPERSED: 'dispersado',
                CLIENT_NOT_FOUND: 'cliente no encontrado',
                NOT_BROKER: 'broker inválido',
                DISPERTION_EXIST: 'ya se disperso previamente',
                INVALID_PROFIT: 'El monto es inválido',
                NO_INFO: 'sin información',
            }),
            filter : {
                start_date: null,
                end_date: null,
            },
            busy: false,
            file: null,
        }
    },
    watch: {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.users = this.usersAux
            this.users = this.users.filter((user)=>{
                user.broker = user.broker ? user.broker.toString() : ""

                return user.names.toLowerCase().includes(this.query.toLowerCase()) || user.email.toLowerCase().includes(this.query.toLowerCase()) || user.broker.toString().includes(this.query)
            })
        },
        getAdminUserGains() {
            return new Promise((resolve,reject) => {
                this.UserSupport.getAdminUserGains({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.users)
                    }

                    reject()
                })
            })
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        readFileData() {    
            this.busy = true

            this.UserSupport.readFileData({file:this.file},(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    this.users = response.users
                    this.usersAux = response.users
                }
            })
        },
        async addAdminUserClientProfit(user) 
        {
            return new Promise((resolve) => {
                this.UserSupport.addAdminUserClientProfit({user:user},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(this.STATES.DISPERSED)
                    } else if(response.r == "NOT_BROKER") {
                        resolve(this.STATES.NOT_BROKER)
                    } else if(response.r == "NOT_CLIENT_ID") {
                        resolve(this.STATES.CLIENT_NOT_FOUND)
                    } else if(response.r == "DISPERTION_EXIST") {
                        resolve(this.STATES.DISPERTION_EXIST) 
                    } else if(response.r == "INVALID_PROFIT") {
                        resolve(this.STATES.INVALID_PROFIT)
                    } else {
                        resolve(this.STATES.NO_INFO)
                    }
                })
            })
        },
        async addAdminUserClientProfits() 
        {
            for(let user of this.users)
            {
                this.done++
                user.status = await this.addAdminUserClientProfit(user)
            }
        },
        uploadFile() 
        {
            this.busy = true

            $(".progress").removeClass("d-none")

            let files = $(this.$refs.file).prop('files');

            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.UserSupport.uploadGainsFile(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                this.busy = false
                this.file = response.target_path

                this.readFileData()
              } else if(response.r == "INVALID_PERMISSION") {
                alertInfo({
                    icon:'<i class="bi bi-x"></i>',
                    message: `No tienes permiso para acceder a esta característica`,
                    _class:'bg-danger text-white'
                })
              }
            });
        },
    },
    mounted() {
   
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center py-5">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </div>
        <div v-else>
            <div v-if="!users" class="row">
                <div class="col-12">
                    <div class="border bg-white rounded-2 p-3 text-center mb-3 shadow position-relative">
                        <div class="fw-sembold text-primary">
                            <div v-if="file">Cambiar excel </div>
                            <div v-else>Subir excel </div>
                            <div>(Da clic aquí o arrastra el archivo)</div>
                        </div>
                        <input class="opacity-0 cursor-pointer bg-dark w-100 h-100 start-0 top-0 position-absolute" ref="file" @change="uploadFile($event)" capture="filesystem" type="file" accept=".xls, .xlsx, .jpeg" />
                    </div>
                    <div class="alert alert-danger text-white text-center">
                        Por favor, asegúrate que tu Excel tenga las mismas características que el template. Descarga Template de subida <a class="text-decoration-underline text-white fw-sembold" href="../../src/files/excel/templates/gains.xlsx">aquí</a></a>
                        <div class="fw-sembold">En este excel están definidas las cabeceras mínimas necesarias para que se lea correctamente el archivo</div>
                    </div>
                </div>
            </div>

            <div v-if="users" class="card">
                <div class="card-header">
                    <div class="row justify-content-center">
                        <div class="col-12 col-xl">
                            <span class="badge text-secondary p-0">total {{users.length}}</span>
                            <div class="fs-4 fw-sembold text-primary">Usuarios</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input v-model="query" type="text" class="form-control" placeholder="buscar...">
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button :disabled="busyButton" @click="addAdminUserClientProfits" class="btn btn-primary">
                                Dispersar ganancias
                            </button>
                        </div>
                        <div v-if="done != null" class="col-12 col-xl-auto">
                            <div class="text-xs">Dispersando</div>
                            <span class="text-primary fw-sembold">{{done}} de {{users.length}}</span>
                        </div>
                    </div>
                </div>
                <table class="table table-responsive table-striped">
                    <thead>
                        <tr class="text-xs text-center">
                            <th>Broker</th>
                            <th>Correo</th>
                            <th>Nombre</th>
                            <th>Volumen</th>
                            <th>Profit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" class="text-xs align-middle text-center">
                            <td>{{user.account}}</td>
                            <td><span class="text-truncate">{{user.email}}</span></td>
                            <td><span class="text-truncate">{{user.first_name}}</span></td>
                            <td>
                                <span v-if="user.balance">
                                    {{user.balance.numberFormat(2)}}
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </td>
                            <td>
                                <span v-if="user.profit > 0">
                                    {{user.profit.numberFormat(2)}}
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </td>
                            <td>
                                <span v-if="user.status == STATES.DISPERSED" class="text-success">
                                    {{STATES.DISPERSED}}
                                </span>
                                <span v-else-if="user.status == STATES.CLIENT_NOT_FOUND" class="text-danger">
                                    {{STATES.CLIENT_NOT_FOUND}}
                                </span>
                                <span v-else-if="user.status == STATES.NOT_BROKER" class="text-danger">
                                    {{STATES.NOT_BROKER}}
                                </span>
                                <span v-else-if="user.status == STATES.NO_INFO" class="text-danger">
                                    {{STATES.NO_INFO}}
                                </span>
                                <span v-else-if="user.status == STATES.INVALID_PROFIT" class="text-danger">
                                    {{STATES.INVALID_PROFIT}}
                                </span>
                                <span v-else-if="user.status == STATES.DISPERTION_EXIST" class="text-danger">
                                    {{STATES.DISPERTION_EXIST}}
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </td>
                        </class=>
                    </tbody>
                </table>
            </div>
        </div>
    `,
}

export { AdminaddgainsViewer } 