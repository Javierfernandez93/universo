import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.0'
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.1.0'

const AdmineditsponsorViewer = {
    components : {
        BackViewer,
    },
    data() {
        return {
            administratorComplete: false,
            UserSupport: new UserSupport,
            query: null,
            feedback: null,
            affiliations: null,
            administrator: {
                names: null,
                password: null,
                email: null,
                permissions: null,
                permissionsAux: null,
                affiliation_id: null,
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
        administrator:
        {
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
        editAdministrator() {
            this.feedback = null
            this.UserSupport.editAdministrator({administrator:this.administrator}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Actualizado"

                    toastInfo({
                        message: 'Administrador actualizado',
                    })
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        getAdministrator(user_support_id) {
            this.UserSupport.getAdministrator({user_support_id:user_support_id}, (response) => {
                if (response.s == 1) {
                    this.administrator = {...this.administrator, ...response.administrator}
                    this.administrator.permissionsAux = this.administrator.permissions

                    this.getAffiliations();
                }
            })
        },
        getAffiliations() {
            this.busy = true
            this.affiliations = null
            this.UserSupport.getAffiliations({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.affiliations = response.affiliations

                    setTimeout(()=>{
                        $('.selectpicker').selectpicker();
                        
                        $('.selectpicker').change(() =>{
                            this.administrator.affiliation_id = $('.selectpicker').val();
                        });


                        let affiliation_id = this.administrator.affiliation_id.toString()
                        $('.selectpicker').selectpicker('val', affiliation_id);
                    },100)
                }
            })
        },
    },
    mounted() {

        if(getParam('usid'))
        {
            this.getAdministrator(getParam('usid'));
        }
    },
    template: `
        <div class="card mb-3">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col-12 col-xl-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-xl">
                        <h6>Editar líder</h6>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button ref="button" type="submit" class="btn btn-dark btn-sm px-3 shadow-none mb-0" @click="editAdministrator">Editar</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <label>Nombre</label>
                        <input :disabled="busy" :autofocus="true" :class="administrator.names ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.email.focus()" v-model="administrator.names" ref="names" type="text" class="form-control" placeholder="nombre">
                    </div>
                    <div class="col-12 col-xl">
                        <label>Correo electrónico</label>
                        <input v-model="administrator.email" :class="administrator.email ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.password.focus()" ref="email" type="text" class="form-control" placeholder="Email">
                    </div>
                    <div class="col-12 col-xl">
                        <label>Contraseña</label>
                        <input 
                            v-model="administrator.password" 
                            @keydown.enter.exact.prevent="editAdministrator" 
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

export { AdmineditsponsorViewer }