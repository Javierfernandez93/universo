import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.3'

const ImportViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            done: null,
            query: null,
            data: null,
            dataAux: null,
            STATES: Object.freeze({
                SAVED: 'Guardado',
                ALREADY_EXIST: 'Ya existe el cliente en la base de datos',
                NOT_SAVED: 'No se pudo guardar',
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
                    this.data = response.data
                    this.dataAux = response.data
                }
            })
        },
        async importUserData(user) 
        {
            return new Promise((resolve) => {
                user.busy = true
                this.UserSupport.importUserData({user:user},(response)=>{
                    user.busy = false
                    if(response.s == 1)
                    {
                        resolve(this.STATES.SAVED)
                    } else if(response.r == "ALREADY_EXIST") {
                        resolve(this.STATES.ALREADY_EXIST)
                    } else if(response.r == "NOT_SAVED") {
                        resolve(this.STATES.NOT_SAVED)
                    } else {
                        resolve(this.STATES.NOT_SAVED)
                    }
                })
            })
        },
        async importData() 
        {
            for(let user of this.data.data)
            {
                user.result = await this.importUserData(user)
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
            <div v-if="!data" class="row">
                <div class="col-12">
                    <div class="card mb-3 card-body text-center">
                        <div>
                            <div class="h5">
                                <div v-html="file ? 'cambiar excel' : 'subir excel'"></div>
                            </div>

                            <div>(Da clic aquí o arrastra el archivo)</div>
                        </div>
                        <input class="opacity-0 cursor-pointer bg-dark w-100 h-100 start-0 top-0 position-absolute" ref="file" @change="uploadFile($event)" capture="filesystem" type="file" accept=".xls, .xlsx, .jpeg" />

                        <div class="alert bg-white border border-light mb-0 mt-3 text-center">
                            Por favor, asegúrate que tu Excel tenga las mismas características que el template. Descarga Template de subida <a class="text-decoration-underline text-white fw-sembold" href="../../src/files/excel/templates/gains.xlsx">aquí</a></a>
                            <div class="fw-sembold">En este excel están definidas las cabeceras mínimas necesarias para que se lea correctamente el archivo</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="data" class="card">
                <div class="card-header">
                    <div class="row justify-content-center">
                        <div class="col-12 col-xl">
                            <span class="badge text-secondary p-0">total {{data.data.length}}</span>
                            <div class="fs-4 fw-sembold text-primary">Información</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input :disabled="busy" v-model="query" type="text" class="form-control" placeholder="buscar...">
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button :disabled="busy" @click="importData" class="btn btn-primary">
                                Importar datos
                            </button>
                        </div>
                        <div v-if="done != null" class="col-12 col-xl-auto">
                            <div class="text-xs">Dispersando</div>
                            <span class="text-primary fw-sembold">{{done}} de {{users.length}}</span>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr class="text-xs text-center">
                                <th v-for="header in data.headers" >{{header}}</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in data.data" class="text-xs align-middle text-center">
                                <td v-for="value in user">
                                    {{value}}
                                </td>
                                <td>
                                    <div v-if="user.busy">
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    </div>

                                    {{user.result}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
}

export { ImportViewer } 