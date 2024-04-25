import { User } from '../../src/js/user.module.js?v=1.0.1'   

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
                <div class="col-12 col-12 animation-fall-down" style="--delay:600ms">
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
        </div>
    `
}

export { ViewclientfromsellerViewer }