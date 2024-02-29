import { UserSupport } from '../../src/js/userSupport.module.js?v=2.4.6.6'   

const ClientViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            user: null
        }
    },
    methods : {
        getUserDetail(user_login_id)
        {
            this.UserSupport.getUserDetail({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.user = response.user
                    this.user.user_login_id = user_login_id
                } else {
                    this.user = false
                }
            })
        },
        setFeedbackAs(feedback,status,message)
        {
            this.UserSupport.setFeedbackAs({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
                if(response.s == 1)
                {
                    feedback.status = status
                 
                    let message = ''

                    if(status == 1)
                    {
                        message = 'Feedback marcado como cumplido'
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

            this.UserSupport.uploadImageKycFromAdmin(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                target.value = response.target_path
              }
            });
        },
        refresh()
        {
            this.getUserDetail(this.user.user_login_id)
        },
        deleteKycValue(user_login_id,user_kyc)
        {
            this.UserSupport.deleteKycValue({user_login_id:user_login_id,catalog_kyc_id:user_kyc.catalog_kyc_id},(response)=>{    
                if(response.s == 1)
                {
                    user_kyc.value = null

                    toastInfo({
                        message: 'Valor eliminado',
                    })
                }
            })
        }
    },
    mounted() 
    {       
        if(getParam("ulid"))
        {
            this.getUserDetail(getParam("ulid"))
        }
    },
    template : `
        <div v-if="user">
            <div class="row mb-3">
                <div class="col-12 col-xl-8 animation-fall-down" style="--delay:500ms">
                    <div class="card">
                        <div class="card-header">
                            <div class="h5">Sin pagos</div>
                        </div>
                        <div class="card-body">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-4 animation-fall-down" style="--delay:600ms">
                    <div class="card">
                        <div class="card-body">
                            <div v-if="user.user_kyc">
                                <ul v-for="user_kyc in user.user_kyc" class="list-group list-group-flush">
                                    <li v-if="user_kyc.type == 'file'" class="list-group-item p-3">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl">
                                                <div class="text-success text-xs" v-if="user_kyc.value">
                                                    Enviado <i class="bi bi-check"></i>
                                                </div>
                                                {{user_kyc.title}}
                                            </div>
                                            <div class="col-12 col-xl-auto">
                                                <div>
                                                    <input class="d-none" @change="uploadFile($event,user_kyc,user.user_login_id)" :id="user_kyc.catalog_kyc_id" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                                    <button class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="openFileManager(user_kyc.catalog_kyc_id)">Subir</button>
                                                    <button v-if="user_kyc.value" class="btn btn-dark ms-1 shadow-none mb-0 px-3 btn-sm" @click="deleteKycValue(user.user_login_id,user_kyc)">Eliminar</button>
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
                    <div class="card overflow-hidden">
                        <div class="card-header">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-md">
                                    <div v-if="user.user_feedback" class="text-xs text-secondary">total {{user.user_feedback.length}}</div>
                                    <div class="h5">FeedBack</div>
                                </div>
                                <div class="col-12 col-md-auto">
                                    <button class="btn btn-primary shadow-none px-3 mb-0 btn-sm" @click="$emit('show',user.user_login_id)">añadir feedback</button>
                                </div>
                            </div>
                        </div>
                    
                        <ul class="list-group list-group-flush">
                            <div v-for="feedback in user.user_feedback">
                                <li v-if="feedback.status != -1" class="list-group-item p-3">
                                    <div class="row align-items-center">
                                        <div class="col-12 col-xl-auto">
                                            <span class="avatar avatar-sm bg-dark">F</span>
                                        </div>
                                        <div class="col-12 col-xl">
                                            <span v-if="feedback.status == 1" class="badge text-xxs bg-success">Cumplido</span>
                                            <span v-else-if="feedback.status == 2" class="badge text-xxs bg-warning">sin cumplir</span>
                                            <span v-else-if="feedback.status == 3" class="badge text-xxs bg-secondary">Por revisar</span>
                                            <div class="h5">
                                                {{feedback.message}}
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="dropdown">
                                                <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        
                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li v-if="feedback.status == 2"><button class="dropdown-item" @click="setFeedbackAs(feedback,1)">Marcar como cumplido</button></li>
                                                    <li v-if="feedback.status == 3"><button class="dropdown-item" @click="setFeedbackAs(feedback,1)">Marcar como cumplido</button></li>
                                                    <li v-if="feedback.status == 1"><button class="dropdown-item" @click="setFeedbackAs(feedback,2)">Marcar como no cumplido</button></li>
                                                    <li><button class="dropdown-item" @click="setFeedbackAs(feedback,-1)">Eliminar</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { ClientViewer }