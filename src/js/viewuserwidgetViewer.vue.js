import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.8'   
import { User } from '../../src/js/user.module.js?v=1.1.8'   

const ViewuserwidgetViewer = {
    props: ['type','seller'],
    data() {
        return {
            User: new User,
            UserSupport: new UserSupport,
            user: null
        }
    },
    methods : {
        goToEdit(user_login_id)
        {
            const url = this.type == 'asesor' ? `../../apps/admin-users/edit?ulid=${user_login_id}` : ``
            
            window.location.href = url
        },  
        getUser(user_login_id)
        {
            this.UserSupport.getUser({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.user = response.user
                }
            })
        },
        deleteUserFromSeller(user_login_id)
        {
            this.User.deleteUserFromSeller({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Usuario eliminado de clientes. Redireccionando...',
                    })

                    setTimeout(()=>{
                        window.location.href = '../../apps/clients/'
                    })
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
    /* html */
    template : `
        <div v-if="user" class="card card-body mb-3">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl-auto">
                    <div class="avatar avatar-xl">
                        <img v-if="user.image" :src="user.image" class="avatar avatar-xl rounded-circle"/>
                        <img v-else src="../../src/img/user/user.png" class="avatar avatar-xl rounded-circle"/>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="mb-1">
                        <span class="badge text-xxs bg-primary">{{type}}</span>
                    </div>
                    <div class="h4 mb-0">{{user.names}}</div>
                    <div class="text-xs text-secondary">{{user.email}}</div>
                </div>
                <div class="col-12 col-xl-auto">
                    <div v-if="seller" class="dropdown">
                        <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                        </button>
                        <ul class="dropdown-menu shadow">
                            <li><button class="dropdown-item" @click="deleteUserFromSeller(user.user_login_id)">Eliminar</button></li>
                        </ul>
                    </div>
                    <div v-else class="dropdown">
                        <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                        </button>
                        <ul class="dropdown-menu shadow">
                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                            <li><button class="dropdown-item" @click="getInBackoffice(user.user_login_id)">Acceder a backoffice</button></li>
                            <li><button class="dropdown-item" @click="deleteUser(user.user_login_id)">Eliminar</button></li>
                        </ul>
                    </div>
                </div>
            </div
        </div>
    `
}

export { ViewuserwidgetViewer }