import { User } from '../../src/js/user.module.js?v=1.0.8'   

const ViewclientViewer = {
    props: ['hide'],
    data() {
        return {
            User: new User,
            user: null
        }
    },
    methods : {
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
        setFeedbackAs(feedback,status,message)
        {
            this.User.setFeedbackAs({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
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
        refresh()
        {
            this.getUserDetail(this.user.user_login_id)
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
                        <div class="card-header">
                            <div class="h5">Documentos</div>
                        </div>
                        <div class="card-body">
                            <div v-if="user.user_kyc">
                                {{user.user_kyc.create_date}}
                                {{user.user_kyc.document_front}}
                                {{user.user_kyc.document_back}}
                                {{user.user_kyc.dni}}
                            </div>
                            <div v-else>
                                Sin documentos cargados
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
                                            <span v-if="feedback.status == 1" class="badge text-xxs bg-primary">Cumplido</span>
                                            <span v-else-if="feedback.status == 2" class="badge text-xxs bg-secondary">sin cumplir</span>
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

export { ViewclientViewer }