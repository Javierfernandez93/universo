import { User } from '../../src/js/user.module.js?v=2.4.9'   

const MultilevelViewer = {
    name : 'multilevel-viewer',
    data() {
        return {
            User: new User,
            busy : false,
            multilevel : null,
            multilevelAux : null
        }
    },
    methods: {
        goToSponsor(referral_id) {  
            _scrollTo($(`#${referral_id}`).offset().top) 
        },
        duplicateUsers() {    
            this.multilevel.map((level)=>{
                level.usersAux = level.users
                return level
            })
        },
        searchInLevel(target,level) {    
            const query = target.value

            level.users = level.usersAux
            level.users = level.users.filter((user)=>{
                return user.names.toLowerCase().includes(query.toLowerCase())
                    || user.referral.names.toLowerCase().includes(query.toLowerCase())
            })
        },
        getUsersMultilevel() {    
            return new Promise((resolve,reject) => {        
                this.busy = true 
                this.User.getUsersMultilevel({getRanges:false},(response)=>{
                    this.busy = false 
                    if(response.s == 1)
                    {
                        resolve(response.multilevel)
                    }

                    reject()
                })
            })
        },
    },
    mounted() 
    {   
        this.getUsersMultilevel().then((multilevel)=>{
            this.multilevel = multilevel

            this.duplicateUsers()
        }).catch(() => {
            this.gains = false 
        })
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="card bg-transparent shadow-none mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-xl">
                            <div class="fs-4 fw-semibold text-primary">Mi red</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="multilevel">
            
                <div v-for="(level,levelIndex) in multilevel" class="card bg-transparent shadow-none border-bottom mb-3">
                    <div class="card-header bg-transparent">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl"> 
                                <div class="text-xs">Total usuarios {{level.users.length}}</div>
                                <div class="fs-4 fw-sembold text-primary">Nivel {{levelIndex+1}}</div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="input-group">
                                    <input v-if="level.searching" @keyup="searchInLevel($event.target,level)" type="text" class="form-control" placeholder="Buscar"/>
                                    
                                    <button class="btn btn-outline-dark mb-0" type="button" @click="level.searching = !level.searching">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-hover text-center text-xs">
                        <thead class="">
                            <td>ID</td>
                            <td>Nombre</td>
                            <td>Activación</td>
                            <td>Ingreso</td>
                            <td>Patrocinador</td>
                            <td>Ganancia</td>
                        </thead>
                        <tbody>
                        <tr v-for="user in level.users" :id="user.user_login_id" class="align-middle">
                            <td>{{user.user_login_id}}</td>
                            <td class="text-capitalize text-dark fw-semibold">{{user.names}}</td>
                            <td>
                                <span v-if="user.active" class="badge bg-success">Activo</span>
                                <span v-else class="badge bg-secondary">Inactivo</span>
                            </td>
                            <td>{{user.signup_date.formatFullDate()}}</td>
                            <td class="text-capitalize text-dark fw-semibold">
                                <span @click="goToSponsor(user.referral.referral_id)">
                                    {{user.referral.names}}
                                </span>
                            </td>
                            <td>
                                <span :class="user.total ? 'text-success' : ''">
                                    $ {{user.total.numberFormat(2)}} 
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else="multilevel == false" class="alert alert-white text-center">
                Aquí podrás ver tu genealogía comienza compartiendo tu link de referido para hacer crecer tu red
            </div>
        </div>
    `,
}

export { MultilevelViewer } 