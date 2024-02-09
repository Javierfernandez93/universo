import { User } from '../../src/js/user.module.js?v=2.3.8'   

const ForgotpasswordViewer = {
    name: 'forgotpassword-viewer',
    data() {
        return {
            User : new User,
            mailSent: false,
            loading: false,
            email: '',
            feedback : false
        }
    },
    methods: {
        recoverPassword() {
            if(this.email.isValidMail())
            {
                this.feedback = false
                this.loading = true
                
                this.User.recoverPassword({email:this.email},(response)=>{
                    this.loading = false

                    if(response.s == 1)
                    {
                        this.mailSent = true
                    } else if(response.r == "INVALID_PASSWORD") {
                        this.feedback = "Las contraseña indicada no es correcta. Intente nuevamente"
                    } else if(response.r == "NOT_FOUND_MAIL") {
                        this.feedback = "El correo proporcionado no está registrado"
                    } else if(response.r == "INVALID_CREDENTIALS") {
                        this.feedback = "Las credenciales proporcionadas no son correctas, intente nuevamente"
                    }
                })
            }
        },
    },
    mounted() 
    {
    },
    template : `
        <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-11 col-xl-4">
                <div
                    v-if="mailSent == false" 
                    class="card bg-transparent shadow-none text-start p-3">
                    <div class="card-header text-center bg-transparent border-0">
                        <div class="fs-4 fw-bold">Recuperar contraseña</div>
                        <div class="text-muted">Ingresa tus datos para continuar</div>
                    </div>
                    <div class="card-body">
                        <div class="form-floating mb-3">
                            <input 
                                :autofocus="true"
                                :class="email.isValidMail() ? 'is-valid' : 'is-invalid'"
                                type="email" ref="email" v-model="email" class="form-control" @keydown.enter.exact.prevent="recoverPassword" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">

                            <label for="email">Correo electrónico</label>
                        </div>

                        <div class="text-end">
                            <a href="../../apps/login/">¿Quieres ingresar a tu cuenta?</a>
                        </div>
                    </div>
                    <div class="card-footer pt-0">
                        
                        <div v-show="feedback" class="alert alert-secondary text-white text-center alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <button :disabled="!email.isValidMail() || loading" class="btn btn-lg btn-primary shadow-none w-100" @click="recoverPassword" id="button">
                            <span v-if="!loading">
                                Recuperar contraseña
                            </span>
                            <span v-else>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </span>
                        </button>
                    </div>
                </div>    
                <div
                    v-else
                    class="card text-start shadow p-3">
                    <div class="card-header text-center bg-transparent border-0">
                        <div class="fs-4 fw-bold">Recuperar contraseña</div>
                    </div>
                    <div class="card-body">
                        <strong>Aviso</strong>
                        <div class="mb-3">Hemos enviado un correo a <span v-text="email" class="fw-bold"></span> con las instrucciones para recuperar tu contraseña.</div>
                        <div class="small text-muted">Si no ves el mensaje en tu bandeja de entrada, revisa en correos no deseados. El correo puede tardar en llegar hasta 5 minutos</div>
                    </div>
                    <div class="card-footer pt-0">
                        
                        <div v-show="feedback" class="alert alert-warning alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <button :disabled="!mailSent" class="btn btn-lg btn-secondary w-100" @click="mailSent = false" id="button">
                            ¿No recibiste el correo?
                        </button>
                    </div>
                </div>    
            </div>
        </div>
    `
}

export { ForgotpasswordViewer }