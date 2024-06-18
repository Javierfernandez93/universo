import { User } from '../../src/js/user.module.js?v=1.1.1'   

const LastsignedwidgetViewer = {
    name : 'lastsignedwidget-viewer',
    data() {
        return {
            User : new User,
            busy : false,
            current : null,
            TIME : 3500,
            interval : null,
            user : null,
            users : null
        }
    },
    watch : {
        
    },
    methods: {
        getUserRandom() {
            let index = Math.round(Math.random() * this.users.length)
            this.user = this.users[index]
        },
        getUserRandomInterval() {
            this.getUserRandom()

            this.interval = setInterval(() =>{
                this.getUserRandom()    
            },this.TIME)
        },
        getLastSigned() {
            this.busy = true
            this.User.getLastSigned({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.users = response.users

                    this.getUserRandomInterval()
                }
            })
        },
    },
    mounted() 
    {   
        this.getLastSigned()
    },
    template : `
        <div class="card shadow-none bg-transparent">
            <div v-if="busy" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-if="users">
                <div class="sans text-secondary">Bienvenidos a Site</div>
                
                <div class="h4">
                    <img :src="user.country_id.getCoutryImage()" class="me-2" title="flag" alt="flag" style="width:2rem"/>
                    {{user.names}}
                </div>
            </div>
        </div>
    `,
}

export { LastsignedwidgetViewer } 