import { User } from '../../src/js/user.module.js?v=2.3.8'   

const RealstateViewer = {
    name : 'realstate-viewer',
    data() {
        return {
            User: new User,
            realStates: null,
        }
    },
    methods : {
        getRealStateIntros()
        {
            this.User.getRealStateIntros({},(response)=>{
                if(response.s == 1)
                {
                    this.realStates = response.realStates
                }
            })
        }
    },
    mounted() 
    {       
        this.getRealStateIntros()
    },
    template : `
        <div v-if="realStates" class="container py-6">
            <div class="row g-5 py-5">
                <div v-for="(realState,index) in realStates" class="col-12 col-md-4">
                    <a :href="realState.link">
                        <div class="card cursor-pointer z-zoom-element animation-fall-down card-real card-body" :style="{'background-image':'url('+realState.image+')','--delay':(index*250)+'ms'}">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `
}

export { RealstateViewer }