import { User } from '../../src/js/user.module.js?v=2.4.6.4'   

const ViewclientfromsellerViewer = {
    props: ['hide'],
    emit: ['pull'],
    data() {
        return {
            User: new User,
            real_state: null,
            query: null,
            user: null,
            real_states: null,
            properties: null,
            propertiesAux: null,
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        },
        real_state : {
            handler() {
                this.query = this.real_state
            },
            deep: true
        }
    },
    methods : {
        filterData()
        {
            this.properties = this.propertiesAux
            this.properties = this.propertiesAux.filter((property)=>{
                return property.title.toLowerCase().includes(this.query.toLowerCase())
                || property.real_state.toLowerCase().includes(this.query.toLowerCase())
            })

        },
        getProperties()
        {
            this.User.getProperties({},(response)=>{
                if(response.s == 1)
                {
                    this.properties = response.properties
                    this.propertiesAux = response.properties
                } 
            })
        },
        getUserDetail(user_login_id)
        {
            this.User.getUserDetail({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.user = response.user
                    this.user.user_login_id = user_login_id
                } else {
                    this.user = false
                }
            })
        },
        updateKycFields()
        {
            this.User.updateKycFields({user_kyc:this.user.user_kyc},(response)=>{
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
            this.User.getCatalogRealState({},(response)=>{
                if(response.s == 1)
                {
                    this.real_states = response.real_states
                }
            })
        },
        setFeedbackAsFromSeller(feedback,status,message)
        {
            this.User.setFeedbackAsFromSeller({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
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
            
            this.User.uploadImageKyc(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                target.value = response.target_path
              }
            });
        },
        refresh()
        {
            this.getProperties()
            this.getCatalogRealState()

            if(getParam("ulid"))
            {
                this.getUserDetail(getParam("ulid"))
            }
        }
    },
    mounted() 
    {       
        this.refresh()
    },
    template : `
        <div v-if="user">
            <div class="row mb-3">
                <div class="col-12 col-xl-8 animation-fall-down" style="--delay:500ms">
                    <div class="card" v-if="properties">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl h4">
                                    <div class="text-xs text-secondary">total {{properties.length}}</div>
                                    Listado de propiedades
                                </div>
                                <div class="col-12 col-xl-auto">
                                    <input type="text" v-model="query" class="form-control" placeholder="Buscar..."/>    
                                </div>
                                <div class="col-12 col-xl-auto">
                                    <div class="form-floating">
                                        <select class="form-select" v-model="real_state" id="real_state" aria-label="Gestor">
                                            <option v-for="real_state in real_states" v-bind:value="real_state.title">
                                                {{ real_state.title }}
                                            </option>
                                        </select>
                                        <label for="real_state_id">Gestor</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="properties" class="card-body overflow-scroll scroll-y">
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
                                            <button class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="$emit('pull',property,user.user_login_id)">Apartar</button>  
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
                </div>
                <div class="col-12 col-xl-4 animation-fall-down" style="--delay:600ms">
                    <div class="card">
                        <div class="card-header">
                            <div class="h5">Documentos</div>
                        </div>
                        <div class="card-body">
                            <div v-if="user.user_kyc">
                                <ul v-for="user_kyc in user.user_kyc" class="list-group list-group-flush">
                                    <li v-if="user_kyc.type == 'file'" class="list-group-item p-3">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl">
                                                {{user_kyc.title}}
                                            </div>
                                            <div class="col-12 col-xl-auto">
                                                <div class="text-success" v-if="user_kyc.value">
                                                    Enviado <i class="bi bi-check"></i>
                                                </div>
                                                <div v-else>
                                                    <input class="d-none" @change="uploadFile($event,user_kyc,user.user_login_id)" :id="user_kyc.catalog_kyc_id" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                                    <button type class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="openFileManager(user_kyc.catalog_kyc_id)">Subir</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li v-if="user_kyc.type == 'text'" class="list-group-item p-3">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl">
                                                DNI
                                            </div>
                                            <div class="col-12 col-xl-auto">
                                                <input type="text" v-model="user.user_kyc.dni" class="form-control" @keypress.exact.enter="updateKycFields" placeholder="Escribe aquí"/>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="alert alert-info text-center text-white mb-0">
                                Sube los documentos de tu cliente
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 animation-fall-down" style="--delay:800ms">
                    <div class="card">
                        <div class="card-header">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-md">
                                    <div v-if="user.user_feedback" class="text-xs text-secondary">total {{user.user_feedback.length}}</div>
                                    <div class="h5">FeedBack de tu cliente</div>
                                </div>
                            </div>
                        </div>
                    
                        <ul v-if="user.user_feedback" class="list-group list-group-flush">
                            <div v-for="feedback in user.user_feedback">
                                <li v-if="feedback.status != -1" class="list-group-item p-3">
                                    <div class="row align-items-center">
                                        <div class="col-12 col-xl-auto">
                                            <span class="avatar avatar-sm bg-dark">FB</span>
                                        </div>
                                        <div class="col-12 col-xl">
                                            <span v-if="feedback.status == 1" class="badge text-xxs bg-primary">Cumplido</span>
                                            <span v-else-if="feedback.status == 2" class="badge text-xxs bg-warning">Pendiente</span>
                                            <span v-else-if="feedback.status == 3" class="badge text-xxs bg-secondary">Realizado</span>
                                            <div class="h5">
                                                {{feedback.message}}
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="dropdown">
                                                <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        
                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li v-if="feedback.status == 2"><button class="dropdown-item" @click="setFeedbackAsFromSeller(feedback,3)">Marcar como realizado</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </ul>
                        <div v-else class="card-body">
                            <div class="alert alert-info text-white text-center mb-0">
                                <strong>Importante</strong>
                                <div>Aquí podrás visualizar todo lo referente a tu cliente, si requerimos algún documento adicional o un comentario sobre el proceso o incluso tu cliente lo haremos por éste medio</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { ViewclientfromsellerViewer }