import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.0'
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.0'

const AdminaddadministratorViewer = {
    components: {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            administratorComplete: false,
            feedback: null,
            administrator: {
                names: null,
                password: null,
                email: null,
                permissions: {},
            },
        }
    },
    watch: {
        administrator:
        {
            handler() {
                this.administratorComplete = this.administrator.names != null && this.administrator.email != null && this.administrator.password != null
            },
            deep: true
        }
    },
    methods: {
        saveAdministrator: function () {
            this.feedback = null
            this.UserSupport.saveAdministrator({administrator:this.administrator}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        getAdministratorPermissions: function () {
            this.UserSupport.getAdministratorPermissions({user:this.user}, (response) => {
                if (response.s == 1) {
                    Object.assign(this.administrator.permissions, response.permissions)
                }
            })
        },
    },
    mounted() {
        this.getAdministratorPermissions();
    },
    template: `
        <div class="card">
            <div class="card-header pb-0 px-3">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-md">
                        <h6 class="mb-0">Añadir administrador</h6>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label>Nombre</label>
                    <input :disabled="busy" :autofocus="true" :class="administrator.names ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.email.focus()" v-model="administrator.names" ref="names" type="text" class="form-control" placeholder="nombre">
                </div>
                <div class="mb-3">
                    <label>Correo electrónico</label>
                    <input v-model="administrator.email" :class="administrator.email ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.password.focus()" ref="email" type="text" class="form-control" placeholder="Email">
                </div>
                <div class="mb-3">
                    <label>Contraseña</label>
                    <input 
                        v-model="administrator.password" 
                        @keydown.enter.exact.prevent="saveAdministrator" 
                        ref="password" 
                        :class="administrator.password ? 'is-valid' : ''"
                        type="text" class="form-control" placeholder="Password">
                </div>

                <div class="mb-3">
                    <label>Permisos</label>
                    <ul class="list-group">
                        <li v-for="permission in administrator.permissions" class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <div class="form-check form-switch ps-0">
                                        <input 
                                            v-model="permission.checked"
                                            class="form-check-input ms-auto" type="checkbox" id="referral_email" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div><span class="small text-primary">{{permission.permission}}</span></div>
                                    <div>{{permission.description}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <button :disabled="!administratorComplete" ref="button" type="submit" class="btn btn-primary" @click="saveAdministrator">Guardar adminsitrador</button>
            </div>
        </div>
    `
}

export { AdminaddadministratorViewer }