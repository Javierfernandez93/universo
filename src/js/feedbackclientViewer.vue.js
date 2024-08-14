import { User } from '../../src/js/user.module.js?v=1.1.5'   
import Loader from '../../src/js/components/Loader.vue.js?v=1.1.5'

const FeedbackclientViewer = {
    components: { Loader },
    props: ['hide'],
    emit: ['pull'],
    data() {
        return {
            User: new User,
            real_state: null,
            query: null,
            busy: false,
            user: null,
            real_states: null
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
        getUserDetail(user_login_id)
        {
            this.busy = true
            this.User.getUserDetail({user_login_id:user_login_id},(response)=>{
                this.busy = false
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
            this.busy = true
            this.User.updateKycFields({user_kyc:this.user.user_kyc},(response)=>{
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
            this.User.getCatalogRealState({},(response)=>{
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
            this.User.setFeedbackAsFromSeller({user_feedback_id:feedback.user_feedback_id,status:status},(response)=>{
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
            
            this.User.uploadImageKyc(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                target.value = response.target_path
              }
            });
        },
        refresh()
        {
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
        <Loader :busy="busy" />

        <div v-if="user" class="card card-body border border-light">
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
                    <div>Aquí podrás visualizar todo lo referente a tu cliente, si requerimos algún documento adicional o un comentario sobre el proceso lo haremos por éste medio</div>
                </div>
            </div>
        </div>
    `
}

export { FeedbackclientViewer }