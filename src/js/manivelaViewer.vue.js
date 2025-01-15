import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.3'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=2.3.3'

const ManivelaViewer = {
    components: {
        LoaderViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            done: null,
            query: null,
            users: null,
            usersAux: null,
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
        query() {
            this.users = this.usersAux.filter((user)=>{
                return user.Cliente.toLowerCase().includes(this.query.toLowerCase()) 
                || user.Unidad.toLowerCase().includes(this.query.toLowerCase()) 
                || user.Status_venta.toLowerCase().includes(this.query.toLowerCase()) 
            })
        }
    },
    methods: {
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
        async importUserDataFromService(user) 
        {
            return new Promise((resolve) => {
                user.busy = true
                this.UserSupport.importUserDataFromService({user:user},(response)=>{
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
            for(let user of this.users) {
                user.result = await this.importUserDataFromService(user)
            }
        },
        getManivelaSales() 
        {
            this.busy = true
          
            this.UserSupport.getManivelaSales({},(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    this.users = response.users
                    this.usersAux = response.users
                }
            });
        },
    },
    mounted() {
        this.getManivelaSales()
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header">
                <div class="row justify-content-center">
                    <div class="col-12 col-xl">
                        <span class="badge text-secondary p-0">total {{users ? users.length : 0}}</span>
                        <div class="h3">Información</div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <input :disabled="busy" v-model="query" type="search" class="form-control" placeholder="buscar...">
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button @click="importData" class="btn btn-primary mb-0 shadow-none">Importar</button>
                    </div>
                    <div v-if="done != null" class="col-12 col-xl-auto">
                        <div class="text-xs">Dispersando</div>
                        <span class="text-primary fw-sembold">{{done}} de {{users.length}}</span>
                    </div>
                </div>
            </div>
            <LoaderViewer :busy="busy"/>

            <div  v-if="users" class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr class="text-xs text-center">
                            <th>Cliente</th>
                            <th>Correo</th>
                            <th>Desarrollo</th>
                            <th>Etapa</th>
                            <th>Porcentaje_Enganche</th>
                            <th>Precio_Venta</th>
                            <th>Status_venta</th>
                            <th>Total_cobrado</th>
                            <th>Unidad</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" class="text-xs align-middle text-center">
                            <td>
                                {{user.Cliente}}
                            </td>
                            <td>
                                {{user.Correo}}
                            </td>
                            <td>
                                {{user.Desarrollo}}
                            </td>
                            <td>
                                {{user.Etapa}}
                            </td>
                            <td>
                                {{user.Porcentaje_Enganche}}
                            </td>
                            <td>
                                {{user.Precio_Venta}}
                            </td>
                            <td>
                                {{user.Status_venta}}
                            </td>
                            <td>
                                {{user.Total_cobrado}}
                            </td>
                            <td>
                                {{user.Unidad}}
                            </td>
                            <td>
                                {{user.result}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
}

export { ManivelaViewer } 