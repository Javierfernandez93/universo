import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.7'   
import LoaderViewer from './loaderViewer.vue.js?v=1.1.7'
import { PropertyAdminPullViewer } from './propertyAdminPullViewer.vue.js?v=1.1.7'

const PropertiesAdminListViewer = {
    components : {
        LoaderViewer,
        PropertyAdminPullViewer
    },
    props: ['hide'],
    data() {
        return {
            UserSupport: new UserSupport,
            real_state: null,
            busy: null,
            query: null,
            user: {
                user_login_id: null,
            },
            real_states: null,
            properties: null,
            propertiesAux: null,
        }
    },
    watch : {
        query() {
            this.properties = this.propertiesAux.filter((property)=>{
                return property.title.toLowerCase().includes(this.query.toLowerCase())
                || property.real_state.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        real_state : {
            handler() {
                this.query = this.real_state
            },
            deep: true
        }
    },
    methods : {
        getProperties()
        {
            this.busy = true
            this.properties = null
            this.propertiesAux = null
            this.UserSupport.getProperties({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.properties = response.properties
                    this.propertiesAux = response.properties
                } 
            })
        },
        getUserDetail()
        {
            this.busy = true
            this.UserSupport.getUserDetail({user_login_id:this.user.user_login_id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.user = {...this.user,...response.user}
                } else {
                    this.user = false
                }
            })
        },
        updateKycFields()
        {
            this.busy = true
            this.UserSupport.updateKycFields({user_kyc:this.user.user_kyc},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Datos actualizados',
                    })
                }
            })
        },
        getCatalogRealState()
        {
            this.busy = true
            this.UserSupport.getCatalogRealState({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.real_states = response.real_states
                }
            })
        },
        setFeedbackAsFromSeller(feedback,status,message)
        {
            this.busy = true
            this.UserSupport.setFeedbackAsFromSeller({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    feedback.status = status
                 
                    let message = ''

                    if(status == 1)
                    {
                        message = 'Feedback marcado como cumplido'
                    } else if(status == 3) {
                        message = 'Feedback marcado como pendiente para revisión'
                    } else if(status == 2) {
                        message = 'Feedback marcado como no cumplido'
                    } else {
                        message = 'Feedback eliminado'
                    }

                    toastInfo({
                        message: message,
                    })
                } 
            })
        },
        openFileManager(id) 
        {
            $(`#${id}`).click()
        },
        uploadFile(event,target,user_login_id) 
        {
            let files = $(event.target).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
            form_data.append("catalog_kyc_id", target.catalog_kyc_id);
            form_data.append("user_login_id", user_login_id);
            
            this.UserSupport.uploadImageKyc(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                target.value = response.target_path
              }
            });
        },
        pullProperty(property,user_login_id)
        {
            console.log({
                property:property,
                user_login_id:user_login_id
            })
            this.$refs.property.show(property,user_login_id)
        },
        refresh()
        {
            // this.getProperties()
            // this.getCatalogRealState()

            if(getParam("ulid"))
            {
                this.user.user_login_id = getParam("ulid")
                
                this.getUserDetail()
            }
        }
    },
    mounted() 
    {       
        this.refresh()
    },
    template : `
        <LoaderViewer :busy="busy" />

        <div class="card" v-if="properties">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col-12 col-xl h4">
                        <div class="text-xs text-secondary">total {{properties.length}}</div>
                        Propiedades
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div class="form-floating">
                            <input :disabled="busy" type="search" v-model="query" class="form-control" placeholder="Buscar..."/>    
                            <label for="query">Buscar</label>
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div class="form-floating">
                            <select class="form-select" v-model="real_state" id="real_state" aria-label="Proyecto">
                                <option v-for="real_state in real_states" v-bind:value="real_state.title">
                                    {{ real_state.title }}
                                </option>
                            </select>
                            <label for="real_state_id">Filtra por proyecto</label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="properties" class="card-body overflow-scroll scroll-y max-h-50">
                <ul class="list-group">
                    <li v-for="property in properties" class="list-group-item">
                        <div class="row align-items-center">

                            <div class="col-12 col-xl">
                                <span class="badge bg-primary">Desarrolladora: {{property.real_state}}</span>
                                <div class="h3">
                                    {{property.title}}
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto text-xs text-secondary">
                                Subido hace {{property.create_date.timeSince()}}
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div class="text-xs text-secondary">Precio (m2)</div>
                                <div>
                                    $ {{property.single_price.numberFormat(2)}} MXN
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-secondary">Tamaño</div>
                                <div>
                                    {{property.size}} m<sup>2</sup>
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-secondary">Precio</div>
                                <div>
                                    $ {{property.price.numberFormat(2)}} MXN
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-secondary">Precio (enganche)</div>
                                <div>
                                    $ {{property.down_payment_price.numberFormat(2)}} MXN
                                </div>
                            </div>
                            <div v-if="property.pull" class="col-12 col-xl-auto text-success">
                                Apartado
                            </div>
                            <div v-else class="col-12 col-xl-auto">
                                <button class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="pullProperty(property,user.user_login_id)">Apartar</button>  
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else-if="properties == false">
                <div class="alert alert-info">
                    No tenemos propiedades para mostrar
                </div>
            </div>
        </div>

        <PropertyAdminPullViewer @refresh="refresh" ref="property"></PropertyAdminPullViewer>
    `
}

export { PropertiesAdminListViewer }