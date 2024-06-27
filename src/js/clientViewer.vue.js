import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.2'   
import OffCanvasViewer from './offcanvasViewer.vue.js?v=1.1.2'
import feedBackModel from './models/feedback.module.js?v=1.1.2'
import LoaderViewer from './loaderViewer.vue.js?v=1.1.2'
import { PropertiesAdminListViewer } from '../../src/js/propertiesAdminListViewer.vue.js?v=1.1.2'

const ClientViewer = {
    components : {
        OffCanvasViewer,
        LoaderViewer,
        PropertiesAdminListViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            feedbackFilled: false,
            query: null,
            user: {
                user_login_id: null,
            },
            feedback: feedBackModel
        }
    },
    watch: {
        query()
        {
            this.user.user_feedback = this.user.user_feedback_aux.filter((feedback) => {
                return feedback.message.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        feedback : {
            handler() {
                this.feedbackFilled = this.feedback.message != null && this.feedback.message.length > 0
            },
            deep: true
        }
    },
    methods : {
        getUserDetail()
        {
            this.busy = true
            this.UserSupport.getUserDetail({user_login_id:this.user.user_login_id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.user = {...this.user, ...response.user}
                    this.user.user_feedback_aux = this.user.user_feedback
                } else {
                    this.user = false
                }
            })
        },
        setFeedbackAs(feedback,status,message)
        {
            this.busy = true
            this.UserSupport.setFeedbackAs({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
                this.busy = false
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
        informAboutFeatureToFeedBack(title)
        {
            this.feedback.message = `Importante! Es necesario completar el documento ${title} del cliente`

            this.$refs.offCanvas.show()
        },
        refresh()
        {
            this.getUserDetail(this.user.user_login_id)
        },
        deleteKycValue(user_login_id,user_kyc)
        {
            this.busy = true
            this.UserSupport.deleteKycValue({user_login_id:user_login_id,catalog_kyc_id:user_kyc.catalog_kyc_id},(response)=>{    
                this.busy = false
                if(response.s == 1)
                {
                    user_kyc.value = null

                    toastInfo({
                        message: 'Valor eliminado',
                    })
                }
            })
        },
        addUserFeedback()
        {
            this.busy = true
            this.UserSupport.addUserFeedback({feedback:this.feedback},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.$refs.offCanvas.hide()

                    toastInfo({
                        message: "✅ Feedback enviado",
                    })

                    this.$emit('refresh')
                }
            })
        }
    },
    mounted() 
    {       
        if(getParam("ulid"))
        {
            this.user.user_login_id = getParam("ulid")
            this.feedback.user_login_id = getParam("ulid")

            this.getUserDetail()
        }
    },
    template : `
        <LoaderViewer :busy="busy" />

        <div v-if="user">
            <div class="row mb-3">
                <div class="col-12 col-xl-8 animation-fall-down" style="--delay:500ms">
                    <PropertiesAdminListViewer/>
                </div>
                <div class="col-12 col-xl-4 animation-fall-down" style="--delay:600ms">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="h6">
                                Lista de documentos requeridos
                            </div>
                        </div>
                        <div class="card-body">
                            <div v-if="user.user_kyc">
                                <ul v-for="user_kyc in user.user_kyc" class="list-group list-group-flush">
                                    <li v-if="user_kyc.type == 'file'" class="list-group-item p-3">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl">
                                                <div class="text-success text-xs" v-if="user_kyc.value">
                                                    Enviado <i class="bi bi-check"></i>
                                                </div>
                                                <div v-else>
                                                    <span v-if="user_kyc.required" class="text-xs text-danger">
                                                        * Requerido
                                                    </span>
                                                </div>
                                                {{user_kyc.title}}
                                            </div>
                                            <div class="col-12 col-xl-auto">
                                                <div>
                                                    <input class="d-none" @change="uploadFile($event,user_kyc,user.user_login_id)" :id="user_kyc.catalog_kyc_id" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                                    <button class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="openFileManager(user_kyc.catalog_kyc_id)">Subir</button>
                                                    <button class="ms-1 btn btn-outline-dark shadow-none mb-0 px-3 btn-sm" @click="informAboutFeatureToFeedBack(user_kyc.title)">Informar</button>
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
                            <div v-else-if="user.user_kyc === false" class="alert alert-dark text-center text-white mb-0">
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
                                    <div class="text-xs text-secondary">total {{user.user_feedback ? user.user_feedback.length : 0}}</div>
                                    <div class="h5">Tablero de feedbacks</div>
                                </div>
                                <div class="col-12 col-md-auto">
                                    <input :disabled="!user.user_feedback" type="search" v-model="query" class="form-control" placeholder="Buscar por nombre o fecha">
                                </div>
                                <div class="col-12 col-md-auto">
                                    <button class="btn btn-outline-dark shadow-none px-3 mb-0 btn-sm" @click="$refs.offCanvas.show()">
                                        <i class="fa fa-plus"></i>
                                        añadir feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                        <div class="card-body">
                            <ul class="list-group list-group-flush list-group-item-action">
                                <div v-for="feedback in user.user_feedback">
                                    <li v-if="feedback.status != -1" class="list-group-item border-radius-md list-group-item-action p-3 border-0">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl-auto">
                                                <span class="avatar avatar-sm bg-dark">F</span>
                                            </div>
                                            <div class="col-12 col-xl">
                                                <span v-if="feedback.status == 1" class="badge text-xxs bg-success">Cumplido</span>
                                                <span v-else-if="feedback.status == 2" class="badge text-xxs bg-warning">sin cumplir</span>
                                                <span v-else-if="feedback.status == 3" class="badge text-xxs bg-secondary">Por revisar</span>
                                                <span class="badge border text-xxs border-secondary ms-2 text-secondary">
                                                    {{feedback.create_date.formatFullDate()}}
                                                </span>
                                                <div class="lead p-3 mt-2 border-radius-md border border-light">
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
        </div>

        <OffCanvasViewer ref="offCanvas" title="Añadir feedBack">
            <div class="card shadow-none">
                <LoaderViewer :busy="busy" />
                <div class="card-body p-0">
                    <div class="alert border border-light alert-dismissible fade show" role="alert">
                        <strong>Aviso</strong>
                        <div>
                            El comentario se guardará en el panel de administración o por el asesor que dió de alta al cliente.
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                            <i class="bi bi-x text-dark"></i>
                        </button>
                    </div>

                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item">
                            <div class="row align-items-center border-0">
                                <div class="col-auto">
                                    <span class="badge text-secondary p-0">Creado por</span>
                                </div>
                                <div class="col-auto">
                                    <span class="badge text-secondary p-0 d-flex align-items-center">
                                        <span class="avatar avatar-sm">
                                            <img src="../../src/img/user/user.png" class="avatar avatar-xs rounded-circle" alt="avatar">
                                        </span>

                                        Ti
                                    </span>
                                </div>
                            </li>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center border-0">
                                <div class="col-auto">
                                    <span class="badge text-secondary p-0">Fecha de creación</span>
                                </div>
                                <div class="col-auto">
                                    <span class="badge text-secondary p-0">
                                        {{ Date.now().formatFullDate() }}
                                    </span>
                                </div>
                            </li>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center border-0">
                                <div class="col-auto">
                                    <span class="badge text-secondary p-0">Estatus</span>
                                </div>
                                <div class="col-auto">
                                    <span class="badge bg-success">
                                        Creado
                                    </span>
                                </div>
                            </li>
                        </li>
                    </ul>
                    
                    <div class="form-floating mb-3">
                        <textarea ref="message" style="height:250px" v-model="feedback.message" type="text" class="form-control text-md" id="message" placeholder="message"></textarea>
                        <label for="message">Mensaje</label>
                    </div>
                    <button :disabled="busy || !feedbackFilled" @click="addUserFeedback" class="btn btn-dark shadow-none mb-1">
                        Envíar feedback
                    </button>
                </div>
            </div>
        </OffCanvasViewer>
    `
}

export { ClientViewer }