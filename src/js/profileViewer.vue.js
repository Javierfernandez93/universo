import { User } from '../../src/js/user.module.js?v=2.3.4'   

const ProfileViewer = {
    name : 'profile-viewer',
    data() {
        return {
            User: new User,
            user: null,
            account : null,
            countries : null,
            isAviableToChangePassword : false,
            timezones : null,
            lastReferrals : null,
            password: {
                actualPassword: '',
                newPassword: '',
                newPasswordAgain: '',
            }
        }
    },
    watch : {
        password : {
            handler() {
                this.isAviableToChangePassword = this.password.actualPassword && this.password.newPassword && this.password.newPassword == this.password.newPasswordAgain
            },
            deep: true
        },
        user : {
            handler() {
                this.editProfile()
            },
            deep: true
        },
    },
    methods: {
        getProfile() {
            return new Promise((resolve) => {
                this.User.getProfile({include_countries:true},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response)
                    }
                })
            }) 
        },
        editProfile() {
            this.User.editProfile(this.user,(response)=>{
                if(response.s == 1)
                {
                    
                }
            })
        },
        changePassword() {
            this.User.changePassword(this.password,(response)=>{
                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-check"></i>',
                        message: `Hemos actualizado tu contraseña, ahora serás redirigido en 3 segundos para que accedas de nuevo...`,
                        _class:'bg-gradient-success text-white'
                    })

                    setTimeout(()=>{
                        window.location.href = '../../apps/login'
                    },4000)
                } else if(response.r == 'PASSWORD_MISMATCH') {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: `La contraseña actual es inválida`,
                        _class:'bg-gradient-danger text-white'
                    })
                } else if(response.r == 'PASSWORDS_MISMATCH') {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: `Las contraseñas no coinciden`,
                        _class:'bg-gradient-danger text-white'
                    })

                }
            })
        },
        getCatalogTimezones() {
            return new Promise((resolve) => {
                this.User.getCatalogTimezones({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.timezones)
                    }
                })
            })
        },
        getBridgeAccount() {
            this.User.getBridgeAccount({},(response)=>{
                if(response.s == 1)
                {
                    this.account = response.account
                }
            })
        },
        checkFields() {
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile() 
        {
            $(".progress").removeClass("d-none")

            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.User.uploadImageProfile(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.user.image = response.target_path
              }
            });
        },
    },
    mounted() 
    {   
        if(getParam("e"))
        {
            setTimeout(()=>{
                const element = getParam("e")
                _scrollTo($(`#${element}`).offset().top)
            },1000)
        }

        if(getParam("showLanding"))
        {
            setTimeout(()=>{
                this.$refs.landing.focus()
            },1000)
        }

        this.getBridgeAccount()

        this.getProfile().then((response) => {
            this.getCatalogTimezones().then((timezones) => {
                this.timezones = timezones

                $(this.$refs.phone).mask('(00) 0000-0000')

                this.user = response.user
                this.countries = response.countries
            })
        })
    },
    template : `
        <div v-if="user" class="card card-body p-5">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="card bg-transparent shadow-none mb-3">
                        <div class="row gx-4">
                            <div class="col-auto">
                                <div class="avatar avatar-xl avatar-editable img-upload position-relative" @click="openFileManager">                
                                    <div v-if="user.image" class="avatar avatar-xl rounded-circle">
                                        <img :src="user.image" alt="usuario"
                                            class="border-radius-lg shadow">
                                    </div>

                                    <input class="d-none" ref="file" @change="uploadFile($event)" capture="filesystem" type="file"
                                        accept=".jpg, .png, .jpeg" />
                                </div>
                            </div>
                            <div class="col my-auto">
                                <div class="h-100">
                                    <h5 class="mb-1 fw-sembold text-dark">
                                        {{ user.names }}
                                    </h5>
                                    <p class="mb-0 text-secondary text-sm">
                                        {{ user.email }}
                                    </p>
                                </div>
                            </div>
                            <div class="col-auto my-auto text-end">
                                <div class="fs-5">
                                    <span 
                                        v-if="user.active"
                                        class="badge badge-pill bg-success sans">
                                        Activo 
                                    </span>
                                    <span v-else
                                        class="badge badge-pill bg-secondary sans">
                                        Usuario inactivo
                                    </span>
                                </div>

                                <div v-if="account" class="mt-3">
                                    <a class="btn btn-primary btn-sm px-3 me-2 mb-0 shadow-none" href="../../apps/bridge/sign">
                                        Ver cuenta de bridge
                                    </a>
                                    <a class="btn btn-primary d-none btn-sm px-3 mb-0 shadow-none" href="../../apps/lpoa">
                                        Generador de LPOA
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" ref="firstStep" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Perfil</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" ref="secondStep" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Cambiar contraseña</button>
                        </li>
                    </ul>
                    <div class="tab-content py-5" id="myTabContent">
                        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                            <h3 class="mb-3">Perfil</h3>
                            <div class="row mb-3">
                                <div class="col-12 col-md-6 col-xl-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" readonly v-model="user.company_id" id="company_id" placeholder="">
                                        <label for="company_id">ID</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" readonly v-model="user.landing" @keydown.space.prevent class="form-control" id="landing" placeholder="">
                                        <label for="landing">Username</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="email" v-model="user.email" readonly class="form-control" id="email" placeholder="">
                                        <label for="email">Correo</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <select class="form-select" v-model="user.country_id" aria-label="Selecciona tu país">
                                            <option v-for="country in countries" v-bind:value="country.country_id">
                                                {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                            </option>
                                        </select>
                                        <label for="floatingSelect">Selecciona tu país</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" readonly v-model="user.referral.names" id="sponsor_names" placeholder="">
                                        <label for="sponsor_names">Nombre patrocinador</label>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-xl-6">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" readonly v-model="user.names" id="names" placeholder="">
                                        <label for="names">Nombre completo</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control" v-model="user.phone" id="phone" placeholder="">
                                        <label for="phone">Celular</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" v-model="user.city" id="city" placeholder="">
                                        <label for="city">Ciudad</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                            <h3 class="mb-3">Cambiar Contraseña</h3>

                            <div class="row">
                                <div class="col-12 col-xl">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" v-model="password.actualPassword" id="names" placeholder="">
                                        <label for="names">Contraseña actual</label>
                                    </div>
                                </div>
                                <div class="col-12 col-xl">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" v-model="password.newPassword" id="phone" placeholder="">
                                        <label for="phone">Contraseña nueva</label>
                                    </div>
                                </div>
                                <div class="col-12 col-xl">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" v-model="password.newPasswordAgain" id="phone" placeholder="">
                                        <label for="phone">Contraseña nueva de nuevo</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row justify-content-end border-top mt-3 pt-3">
                                <div class="col-auto">
                                    <button :disabled="!isAviableToChangePassword" @click="changePassword" type="button" class="btn btn-primary mb-0 shadow-none">Cambiar contraseña</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { ProfileViewer } 