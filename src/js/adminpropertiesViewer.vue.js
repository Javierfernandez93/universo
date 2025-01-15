import { UserSupport } from './userSupport.module.js?v=1.1.7'   
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.7'
import PlaceHolder from '../../src/js/components/PlaceHolder.vue.js?v=1.1.7' 
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.1.7'

const AdminpropertiesViewer = {
    components : {
        LoaderViewer,
        PlaceHolder,
        HighLigth   
    },
    data() {
        return {
            UserSupport : new UserSupport,
            query: null,
            busy: false,
            properties: [],
            propertiesAux: [],
        }
    },
    watch : {
        query() {
            this.properties = this.propertiesAux.filter((property)=>{
                return property.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
    },
    methods: {
        getPropertiesByAdmin() 
        {
            this.properties = []
            this.propertiesAux = []
            this.busy = true
            this.UserSupport.getPropertiesByAdmin({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.properties = response.properties
                    this.propertiesAux = response.properties
                }
            })
        },
        goToEdit(property_id)
        {
            window.location.href = `../../apps/admin-properties/edit?pid=${property_id}`
        },  
        setPropertyStatus(property,status) 
        {
            this.UserSupport.setPropertyStatus({property_id:property.property_id,status:status},(response)=>{
                if(response.s == 1)
                {
                    if(status == 1)
                    {
                        toastInfo({
                            message: 'La propiedad ha sido habilitada',
                        })
                    } else if(status == 0) {
                        toastInfo({
                            message: 'La propiedad ha sido deshabilitada',
                        })
                    } else if(status == -1) {
                        toastInfo({
                            message: 'La propiedad ha sido eliminada',
                        })

                        this.getPropertiesByAdmin()
                    }

                    property.status = status
                } else if(response.r == 'INVALID_PERMISSION') {
                    toastInfo({
                        message: 'No tienes permisos para realizar esta acción',
                    })
                }
            })
        },
    },
    mounted() 
    {   
        this.getPropertiesByAdmin()
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="properties" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{properties.length}}</span></div>
                        <h6>Propiedades</h6>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-properties/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir propiedad</a></div>
                    </div>
                    <div class="col-auto text-end">
                        <button @click="getPropertiesByAdmin" class="btn btn-success btn-sm px-3 mb-0 shadow-none">
                            <i class="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>
                    <div class="col-auto text-end">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <HighLigth :busy="busy" :dataLength="properties.length" :query="query"/>

                <div v-if="properties.length > 0" class="table-responsive-sm p-0 overflow-y-scroll h-100">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    PROPIEDAD
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    PRECIO
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    TAMAÑO
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    PRECIO DE APARTADO
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    INGRESO
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="property in properties">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="property">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <span v-if="property.status == 1" class="badge bg-primary">Activo</span>
                                            <span v-else-if="property.status == 0" class="badge bg-secondary">Pausado</span>
                                            <h6 class="mb-0 text-sm">{{property.title}}</h6>
                                            <p class="text-xs text-secondary mb-0">{{property.real_state}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    $ {{property.price.numberFormat(2)}} MXN
                                </td>
                                <td class="align-middle text-center text-sm">
                                    {{property.size}} m2
                                </td>
                                <td class="align-middle text-center text-sm">
                                    $ {{property.down_payment_price.numberFormat(2)}} MXN
                                </td>
                                <td class="align-middle text-center text-sm">
                                    {{property.create_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(property.property_id)">Editar</button></li>
                                            <li v-if="property.status == '1'"><button class="dropdown-item" @click="setPropertyStatus(property,0)">Deshabilitar</button></li>
                                            <li v-else-if="property.status == '0'"><button class="dropdown-item" @click="setPropertyStatus(property,1)">Habilitar</button></li>
                                            
                                            <li><button class="dropdown-item" @click="setPropertyStatus(property,-1)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
}

export { AdminpropertiesViewer } 