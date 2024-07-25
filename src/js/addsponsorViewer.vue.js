import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.7'
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.7'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.0.7'

const AddsponsorViewer = {
    components : {
        BackViewer,
        LoaderViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            administratorComplete: false,
            feedback: null,
            affiliations: null,
            query: null,
            busy: null,
            administrator: {
                names: null,
                password: null,
                email: null,
                affiliation_id: 1,
                catalog_support_type_id: 2, // sponsor
                permissions: null,
                permissionsAux: null,
            },
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        },
        administrator: {
            handler() {
                this.administratorComplete = this.administrator.names != null && this.administrator.email != null && this.administrator.password != null
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.administrator.permissions = this.administrator.permissionsAux

            this.administrator.permissions = this.administrator.permissions.filter((permission) => {
                return permission.description.toLowerCase().includes(this.query.toLowerCase())
                    || permission.permission.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        saveAdministrator() {
            this.feedback = null
            this.busy = true
            this.UserSupport.saveAdministrator({administrator:this.administrator}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"

                    toastInfo({
                        message: `Hemos guardado el líder ${this.administrator.names} correctamente`,
                    })
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        getAdministratorPermissions() {
            return new Promise((resolve) => {
                this.busy = true
                this.UserSupport.getAdministratorPermissions({user:this.user}, (response) => {
                    this.busy = false
                    if (response.s == 1) {
                        this.administrator.permissions = response.permissions
                        this.administrator.permissionsAux = this.administrator.permissions
                    }

                    resolve()
                })
            })
        },
        getAffiliations() {
            this.busy = true
            this.affiliations = null
            this.UserSupport.getAffiliations({}, async (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.affiliations = response.affiliations

                    await sleep(100)

                    $('.selectpicker').selectpicker();
                    $('.selectpicker').change(() =>{
                        this.administrator.affiliation_id = $('.selectpicker').val();
                    });
                }
            })
        },
        getPermissionsGroup() {
            this.busy = true
            this.UserSupport.getPermissionsGroup({code:'leader'}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    if(response.permission_group.permissions.length ==0)
                    {
                        toastInfo({
                            message: 'No hay permisos para este grupo',
                        })
                        return
                    }
                    
                    let permissions = response.permission_group.permissions.map((permission) => {
                        permission.checked = true
                        return permission
                    })

                    this.administrator.permissions = {...this.administrator.permissions,...permissions}
                }
            })
        },
    },
    async mounted() {
        await this.getAdministratorPermissions();

        this.getAffiliations();
        this.getPermissionsGroup();
    },
    template: `
        <div class="card mb-3">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-md">
                        <h6 class="mb-0">Añadir Líder</h6>
                    </div>
                    <div class="col-12 col-md-auto">
                        <button :disabled="!administratorComplete" ref="button" type="submit" class="btn btn-dark mb-0 shadow-none px-3 btn-sm" @click="saveAdministrator">Guardar líder</button>
                    </div>
                </div>
            </div>

            <LoaderViewer :busy="busy"/>

            <div class="card-body">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md">
                        <label>Nombre</label>
                        <input :disabled="busy" :autofocus="true" :class="administrator.names ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.email.focus()" v-model="administrator.names" ref="names" type="text" class="form-control" placeholder="nombre">
                    </div>
                    <div class="col-12 col-md">
                        <label>Correo electrónico</label>
                        <input v-model="administrator.email" :class="administrator.email ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.password.focus()" ref="email" type="text" class="form-control" placeholder="Email">
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
                    <div v-if="affiliations" class="col-12 col-md mt-3">
                        <label>Asignar a afiliación</label>
                        <select class="selectpicker form-control" data-live-search="true" data-style="border shadow-none">
                            <option v-for="affiliation in affiliations" :data-tokens="affiliation.name" :data-content="affiliation.name">{{ affiliation.affiliation_id }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col-12 col-xl fw-semibold text-primary">
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

export { AddsponsorViewer }