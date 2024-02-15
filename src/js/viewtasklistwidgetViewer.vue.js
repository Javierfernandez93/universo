import { User } from '../../src/js/user.module.js?v=2.4.0'   

const ViewtasklistwidgetViewer = {
    emit : ['refresh'],
    data() {
        return {
            User: new User,
            feedback: {
                user_login_id: null,
                message: null
            }
        }
    },
    methods : {
        show(user_login_id)
        {
            this.feedback.user_login_id = user_login_id

            $(this.$refs.offcanvasRight).offcanvas('show')
        },
        hide()
        {
            $(this.$refs.offcanvasRight).offcanvas('hide')
        },
        addUserFeedback()
        {
            this.User.addUserFeedback({feedback:this.feedback},(response)=>{
                if(response.s == 1)
                {
                    this.user = response.user

                    this.hide()

                    toastInfo({
                        message: "Feedback enviado",
                    })

                    this.$emit('refresh')
                }
            })
        }
    },
    mounted() 
    {       
        startListener("offcanvasRight")
    },
    template : `
        <div class="offcanvas offcanvas-end overflow-scroll" tabindex="-1" ref="offcanvasRight" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div>
                <div class="offcanvas-header">
                    <div id="offcanvasRightLabel">
                        <div class="h4">
                            Añadir feedback
                        </div>
                    </div>
                    <button type="button" class="btn btn-sm px-3 shadow-none btn-danger" data-bs-dismiss="offcanvas" aria-label="Close"><i class="bi fs-5 bi-x"></i> </button>
                </div>
                <div class="offcanvas-body">
                    <div class="card shadow-none">
                        <div class="card-body">
                            <div class="form-floating mb-3">
                                <textarea ref="message" style="height:250px" v-model="feedback.message" type="text" class="form-control" id="message" placeholder="message"></textarea>
                                <label for="message">Mensaje</label>
                            </div>
                            <button @click="addUserFeedback" class="btn btn-primary mb-1">
                                Envíar feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `
}

export { ViewtasklistwidgetViewer }