import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.7'
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.1.7'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.7'

const AdminaddadministratorViewer = {
    components: {
        BackViewer,
        LoaderViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            filled: false,
            query: null,
            busy: false,
            feedback: null,
            permissionsAux:null,
            administrator: {
                user_support_id: null,  
                names: null,
                password: null,
                email: '',
                permissions: [],
            },
        }
    },
    watch: {
        query() {
            this.administrator.permissions = this.permissionsAux.filter((permission) => {
                return permission.description.toLowerCase().includes(this.query.toLowerCase())
                    || permission.permission.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        administrator: {
            handler() {
                this.filled = this.administrator.names != null 
                && this.administrator.email.isValidMail()
                && this.administrator.password != null
                && this.administrator.permissions.some((permission) => permission.checked == true)
            },
            deep: true
        }
    },
    methods: {
        saveAdministrator() {
            this.feedback = null
            this.UserSupport.saveAdministrator({administrator:this.administrator}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        generatePassword() {
            this.administrator.password = generateRandomPassword();
        },
        getAdministratorPermissions() {
            this.busy = true
            this.UserSupport.getAdministratorPermissions({user:this.user}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.administrator.permissions = response.permissions
                    this.permissionsAux = response.permissions
                }
            })
        },
    },
    mounted() {
        this.getAdministratorPermissions();

        if(!this.administrator.user_support_id)
        {
            this.generatePassword();
        }
    },
    template: `
        <LoaderViewer :busy="busy"/>

        <div class="card mb-3">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-md h6">
                        Añadir administrador
                    </div>
                    <div class="col-12 col-md-auto">
                        <button :disabled="!filled" ref="button" type="submit" class="btn btn-dark mb-0 shadow-none btn-sm px-3" @click="saveAdministrator">Guardar adminsitrador</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row align-items-end d-flex">
                    <div class="col-12 col-md">
                        <label>Nombre</label>
                        <input :disabled="busy" :autofocus="true" :class="administrator.names ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.email.focus()" v-model="administrator.names" ref="names" type="text" class="form-control" placeholder="nombre">
                    </div>
                    <div class="col-12 col-md">
                        <label>Correo electrónico</label>
                        <input v-model="administrator.email" :class="administrator.email.isValidMail() ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.password.focus()" ref="email" type="text" class="form-control" placeholder="Email">
                    </div>
                    <div class="col-12 col-md">
                        <label>Contraseña</label>
                        <input 
                            v-model="administrator.password" 
                            @keydown.enter.exact.prevent="saveAdministrator" 
                            ref="password" 
                            :class="administrator.password ? 'is-valid' : ''"
                            type="text" class="form-control" placeholder="Password">
                    </div>
                    <div class="col-12 col-md-auto">
                        <button @click="generatePassword" class="btn btn-sm btn-outline-dark px-3 mb-0 shadow-none">
                            generar contraseña segura
                        </button>   
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col-12 col-xl fw-semibold text-primary">
                        <div class="text-xs text-secondary">{{administrator.permissions? administrator.permissions.length :0 }}</div>  
                        <h6>
                            Listado de permisos
                        </h6>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="buscar...">
                    </div>
                </div>
            </div>

            
            <div class="card-body">
                <div v-if="!administrator.permissions.some((permission) => permission.checked == true)" class="alert alert-dark text-center text-white">
                    <strong>Aviso</strong>
                    <div>
                        Elige al menos un permiso 
                    </div>
                </div>
                <ul class="list-group">
                    <li v-for="permission in administrator.permissions" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <div class="form-check form-switch ps-0">
                                    <input 
                                        v-model="permission.checked"
                                        :id="permission.catalog_permission_id"
                                        class="form-check-input ms-auto" type="checkbox" />
                                </div>
                            </div>
                            <div class="col-12 col-xl">
                                <label :for="permission.catalog_permission_id">
                                    <div class="fw-semibold text-dark">{{permission.description}}</div>
                                </label>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-secondary">{{permission.permission}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `
}

export { AdminaddadministratorViewer }