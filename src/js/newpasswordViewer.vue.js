import { User } from '../../src/js/user.module.js?v=2.5.0'   

const NewpasswordViewer = {
    name: 'newpassword-viewer',
    data() {
        return {
            feedback : null,
            hasValidPasswords : false,
            paswordReseted : false,
            user: {
                email: null,
                password: null,
                passwordVerificator: null,
            },
            User : null
        }
    },
    watch : {
        user : {
            handler() {
                this.checkHasValidPasswords()
            },
            deep: true
        },
    },
    methods: {
        checkHasValidPasswords() {
            let valid = false

            if(this.user.password != undefined && this.user.passwordVerificator != undefined) 
            {
                valid = (this.user.password == this.user.passwordVerificator) && (this.user.password.length > 0 && this.user.passwordVerificator.length > 0)
            }

            this.hasValidPasswords = valid
        },
        changePasswordWithoutLogin() {
            this.User.changePasswordWithoutLogin(Object.assign(this.user,{token:getParam('token')}),(response)=>{
                if(response.s == 1)
                {
                    this.paswordReseted = true
                } else if(response.r == "") {
                    this.feedback = ''
                }
            })
        },
        getAuthToChangePassword() {
            this.User.getAuthToChangePassword({token:getParam('token')},(response)=>{
                if(response.s == 1)
                {
                   this.user.email = response.email
                }
            })
        },
    },
    mounted() 
    {
        this.User = new User

        if(getParam('token'))
        {
            this.getAuthToChangePassword()
        }
    },
    template : `
        <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-12 col-xl-4">
                <div
                    v-if="paswordReseted == false" 
                    class="card text-start shadow-none bg-transparent p-3">
                    <div class="card-header bg-transparent border-0">
                        <div class="fs-4 fw-bold">Cambiar contraseña</div>
                        <div class="text-muted">Ingresa tu nueva contraseña para <span class="fw-semibold text-dark">{{user.email}}</span></div>
                    </div>
                    <div class="card-body">

                        <div class="form-floating mb-3">
                            <input 
                                :class="user.password ? 'is-valid' : ''"
                                :autofocus="true"
                                type="password" ref="password" v-model="user.password" class="form-control" @keydown.enter.exact.prevent="$refs.passwordVerificator.focus()" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
                            <label for="password">Contraseña</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input 
                                :class="hasValidPasswords ? 'is-valid' : ''"
                                type="password" ref="passwordVerificator" v-model="user.passwordVerificator" class="form-control" @keydown.enter.exact.prevent="changePassword" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">

                            <label for="passwordVerificator" >Contraseña de nuevo</label>    
                        </div>

                        <div class="text-end">
                            <a href="../../apps/login/">¿Quieres ingresar a tu cuenta?</a>
                        </div>
                    </div>
                    <div class="card-footer pt-0">
                        <div v-show="feedback" class="alert alert-secondary text-white alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <button :disabled="!hasValidPasswords" class="btn btn-lg btn-primary w-100" @click="changePasswordWithoutLogin" id="button">
                            Cambiar contraseña
                        </button>
                    </div>
                </div>    
                <div
                    v-else
                    class="card text-start shadow p-3">
                    <div class="card-header bg-transparent border-0">
                        <div class="fs-4 fw-bold">Cambiar contraseña</div>
                        <div class="row align-items-center">
                            <div class="col-auto fs-4 text-success">
                                <i class="bi bi-check-circle"></i>
                            </div>
                            <div class="col">
                                Hemos cambiado tu contraseña a la contraseña indicada. Ya puedes acceder a tu cuenta
                            </div>
                        </div>
                    </div>
                    <div class="card-footer pt-0">
                        <div v-show="feedback" class="alert alert-secondary text-white alert-dismissible fade show" role="alert">
                            {{ feedback }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                        <a class="btn btn-lg btn-primary w-100" href="../../apps/login">
                            Ingresa a tu cuenta
                        </a>
                    </div>
                </div>    
            </div>
        </div>
    `
} 

export { NewpasswordViewer }