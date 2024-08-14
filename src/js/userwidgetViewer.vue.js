import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.5'   
import OffCanvasViewer from './offcanvasViewer.vue.js?v=1.1.5'

const UserwidgetViewer = {
    components : {
        OffCanvasViewer
    },
    props: ['type','menu'],
    data() {
        return {
            UserSupport: new UserSupport,
            user: null
        }
    },
    methods : {
        goToEdit(user_login_id)
        {
            const url = this.type == 'asesor' ? `../../apps/admin-users/edit?ulid=${user_login_id}` : `../../apps/admin-client/edit?ulid=${user_login_id}`
            
            window.location.href = url
        },  
        getInBackoffice(user_login_id)
        {
            this.busy = true
            this.UserSupport.getInBackoffice({ company_id: user_login_id }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    window.open('../../apps/backoffice')
                }
            })
        },  
        getUser(user_login_id)
        {
            this.busy = true
            this.UserSupport.getUser({user_login_id:user_login_id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.user = response.user
                    this.user.showDetails = false
                }
            })
        }
    },
    mounted() 
    {       
        if(getParam("ulid"))
        {
            this.getUser(getParam("ulid"))
        }
    },
    template : `
        <div v-if="user" class="card card-body mb-3">
            <div class="row g-3 justify-content-center align-items-center">
                <div class="col-12 col-xl-auto">
                    <div class="avatar avatar-md">
                        <img v-if="user.image" :src="user.image" class="avatar avatar-md rounded-circle"/>
                        <img v-else src="../../src/img/user/user.png" class="avatar avatar-md rounded-circle"/>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="mb-1">
                        <span class="badge text-xxs bg-primary">{{type}}</span>
                    </div>
                    <div class="h4 mb-0">{{user.names}}</div>
                    <div class="text-xs text-secondary">
                        correo electrónico 
                        <span class="badge text-xxs border border-light text-secondary">
                            {{user.email}}
                        </span>
                    </div>
                </div>

                <div v-if="menu != 'false'" class="col-12 col-xl-auto">
                    <div class="dropdown">
                        <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                        </button>
                        <ul class="dropdown-menu shadow">
                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                            <li v-if="type != 'cliente'"><button class="dropdown-item" @click="getInBackoffice(user.user_login_id)">Acceder a backoffice</button></li>
                            <li>
                                <button class="dropdown-item" @click="$refs.offcanvas.show()">
                                    Ver detalles
                                </button>
                            </li>
                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            
        </div>

        <OffCanvasViewer title="Información adicional" ref="offcanvas">
            <div class="card shadow-none">
                <div class="card card-body border border-light mb-3 shadow-none">
                    <div class="row justify-content-center d-flex align-items-center">
                        <div class="col-12 col-xl-auto">
                            <div class="avatar avatar-md">
                                <img v-if="user.image" :src="user.image" class="avatar avatar-md rounded-circle"/>
                                <img v-else src="../../src/img/user/user.png" class="avatar avatar-md rounded-circle"/>
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="h4 mb-3">{{user.names}}</div>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="">
                                <div class="text-secondary text-xs">Nacionalidad</div> 
                                <span class="fw-semibold text-dark">{{user.nationality}}</span>   
                            </div>
                        </li>
                        <li class="list-group-item">
                                <div class="">
                                <div class="text-secondary"> text-xsRFC</div> 
                                <span class="fw-semibold text-dark">{{user.rfc}}</span>   
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="">
                                <div class="text-secondary text-xs">CURP</div> 
                                <span class="fw-semibold text-dark">{{user.curp}}</span>   
                            </div>
                        </li>
                        <div v-if="user.user_references">
                            <li v-for="(user_reference,index) in user.user_references" class="list-group-item border-top-0 border-bottom-0">
                                <div class="">
                                    <div class="text-secondary text-xs">Referencia {{index+1}}</div> 
                                    <span class="fw-semibold text-dark">{{user_reference.names}} {{user_reference.last_name}}</span>   
                                </div>
                            </li>
                        </div>
                        <li class="list-group-item">
                            <div class="">
                                <div class="text-secondary text-xs">Dirección</div> 
                                <span class="fw-semibold text-dark">{{user.address}} {{user.city}} {{user.state}}</span>   
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="">
                                <div class="text-secondary text-xs">Teléfono</div> 
                                <span class="fw-semibold text-dark">{{user.phone}}</span>   
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="">
                                <div class="text-secondary text-xs">Email</div> 
                                <span class="fw-semibold text-dark">{{user.email}}</span>   
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </OffCanvasViewer>
    `
}

export { UserwidgetViewer }