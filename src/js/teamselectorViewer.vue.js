import { User } from '../../src/js/user.module.js?v=2.3.4'   

const TeamselectorViewer = {
    name : 'teamselector-viewer',
    data() {
        return {
            User: new User,
            users : null,
            SIDE : {
                LEFT : 0,
                RIGHT : 1,
            }
        }
    },
    methods: {
        getTeamPending() {
            this.users = null
            this.User.getTeamPending({},(response)=>{
                if(response.s == 1)
                {
                    this.users = response.users
                    
                }
            })
        },
        setReferralInPosition(user_login_id,side) {
            this.User.setReferralInPosition({user_login_id:user_login_id,side:side},(response)=>{
                if(response.s == 1)
                {
                    this.getTeamPending()

                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: `Hemos colocado al usuario ya lo puedes ver en tu <a href="../../apps/team/">equipo</a>`,
                        _class:'bg-gradient-success text-white'
                    })
                }
            })
        },
    },
    mounted() 
    {   
        this.getTeamPending()
    },
    template : `
        <div v-if="users" class="card mb-3">
            <div class="card-header h4">
                Usuarios pendientes por colocar en tu red
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="user in users" class="list-group-item">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <div class="h4">
                                {{user.names}}
                            </div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button @click="setReferralInPosition(user.user_login_id,SIDE.LEFT)" class="btn btn-primary me-2 mb-0">Izquierda</button>
                            <button @click="setReferralInPosition(user.user_login_id,SIDE.RIGHT)" class="btn btn-primary mb-0">Derecha</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    `,
}

export { TeamselectorViewer } 