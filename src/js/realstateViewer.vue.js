import { User } from '../../src/js/user.module.js?v=2.4.6.6'   

const RealstateViewer = {
    name : 'realstate-viewer',
    data() {
        return {
            User: new User,
            realStates: null,
        }
    },
    methods : {
        viewVideo(realState)
        {
            alertVideo(realState.link, realState.title)
        },
        getRealStateIntros()
        {
            this.User.getRealStateIntros({},(response)=>{
                if(response.s == 1)
                {
                    this.realStates = response.realStates.map((realState)=>{
                        realState.hasVideo = realState.link.includes('.mp4')

                        return realState
                    })
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
                    <div v-if="realState.hasVideo">
                        <span @click="viewVideo(realState)">
                            <div class="card cursor-pointer z-zoom-element animation-fall-down card-real card-body" :style="{'background-image':'url('+realState.image+')','--delay':(index*250)+'ms'}">
                            </div>
                        </span>
                    </div>
                    <div v-else>
                        <a :href="realState.link">
                            <div class="card cursor-pointer z-zoom-element animation-fall-down card-real card-body" :style="{'background-image':'url('+realState.image+')','--delay':(index*250)+'ms'}">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { RealstateViewer 