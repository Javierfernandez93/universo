import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.0'
import { BackViewer } from '../../src/js/backViewer.vue.js?v=1.0.0'

const AddsponsorViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport: new UserSupport,
            administratorComplete: false,
            feedback: null,
            affiliations: null,
            busy: null,
            administrator: {
                names: null,
                password: null,
                email: null,
                affiliation_id: 1,
                catalog_support_type_id: 2, // sponsor
                permissions: {},
            },
        }
    },
    watch: {
        administrator: {
            handler() {
                this.administratorComplete = this.administrator.names != null && this.administrator.email != null && this.administrator.password != null
            },
            deep: true
        }
    },
    methods: {
        saveAdministrator() {
            this.feedback = null
            this.busy = true
            this.UserSupport.saveAdministrator({administrator:this.administrator}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.$refs.button.innerText = "Guardado"

                    toastInfo({
                        message: 'Guardado',
                    })
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        getAdministratorPermissions() {
            this.busy = true
            this.UserSupport.getAdministratorPermissions({user:this.user}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.administrator.permissions = response.permissions
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
                    },100)
                }
            })
        },
    },
    mounted() {
        this.getAdministratorPermissions();
        this.getAffiliations();
    },
    template: `
        <div class="card">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-md">
                        <h6 class="mb-0">Añadir Líder</h6>
                    </div>
                    <div class="col-12 col-md-auto">
                        <button :disabled="!administratorComplete" ref="button" type="submit" class="btn btn-dark mb-0 shadow-none px-3 bnt-sm" @click="saveAdministrator">Guardar líder</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="card card-body border border-light shadow-none mb-3">
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

                <div class="card card-body border border-light shadow-none">
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
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button :disabled="!administratorComplete" ref="button" type="submit" class="btn btn-dark mb-0 shadow-none px-3 bnt-sm" @click="saveAdministrator">Guardar líder</button>
            </div>
        </div>
        `
} 

export { AddsponsorViewer }