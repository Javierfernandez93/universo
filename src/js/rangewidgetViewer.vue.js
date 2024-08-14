import { User } from '../../src/js/user.module.js?v=1.1.5'   

const RangewidgetViewer = {
    name : 'rangewidget-viewer',
    data() {
        return {
            User: new User,
            members : null
        }
    },
    methods: {
        getLastMembers() {
            this.User.getLastMembers({},(response)=>{
                if(response.s == 1)
                {
                    this.members = response.members
                } else {
                    this.members = false
                }
            })
        },
    },
    mounted() 
    {   
        this.getLastMembers()
    },
    template : `
        <div v-if="members" class="card shadow-none border">
            <div class="card-header">
                <div class="row">
                    <div class="col-12 col-xl">
                        Rango Actual
                    </div>
                    <div class="col-12 col-xl-auto">
                        Contador de Miembros
                    </div>
                    <div class="col-12 col-xl-auto">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li v-for="member in members" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <div class="avatar avatar">
                                    <img :src="member.image" class="avatar" title="user" alt="user"/>
                                </div>
                            </div>
                            <div class="col-12 col-xl">
                                <div class="lead">{{member.names}}</div>
                                <div class="text-xs">ID {{member.user_login_id}}</div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <span class="badge text-secondary p-0">Saldo historíco</span>    
                            </div>
                            <div class="col-12 col-xl-auto">
                                <span v-if="member.active" class="badge bg-success">Calificado</span>    
                                <span v-else class="badge bg-secondary">No calificado</span>    
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else-if="members == false" class="card shadow-none overflow-hidden border">
            <div class="mask bg-dark d-flex justify-content-center align-items-center text-center text-white z-index-1">
                <div class="row">
                    <div class="col-12">
                        <div><i class="bi h1 text-white bi-lock-fill"></i></div>
                        Comienza a invitar a personas a Site
                    </div>
                </div>
            </div>
            <div class="card-body py-5">
                <div class="row">
                    <div class="col-12 col-xl">
                        Rango Actual
                    </div>
                    <div class="col-12 col-xl-auto">
                        Contador de Miembros
                    </div>
                    <div class="col-12 col-xl-auto">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { RangewidgetViewer } 