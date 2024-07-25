import { User } from '../../src/js/user.module.js?v=1.0.8'   

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
                <div v-for="(realState,index) in realStates" class="col-12 col-md-6 col-xl-4">
                    <div v-if="realState.hasVideo"> 
                        <span @click="viewVideo(realState)">
                            <div class="card cursor-pointer overflow-hidden z-zoom-element animation-fall-down card-real card-body p-0" :style="{'background-image':'url('+realState.image+')','--delay':(index*250)+'ms'}">
                                <div v-if="realState.sold_out" class="mask position-relative">
                                    <div class="position-absolute end-0 bottom-0">
                                        <span class="sold-out text-uppercase">Sold out</span>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div v-else>
                        <a :href="realState.link">
                            <div class="card cursor-pointer z-zoom-element animation-fall-down card-real overflow-hidden" :style="{'background-image':'url('+realState.image+')','--delay':(index*250)+'ms'}">
                                <div v-if="realState.sold_out" class="mask position-relative">
                                    <div class="position-absolute end-0 bottom-0">
                                        <span class="sold-out text-uppercase">Sold out</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { RealstateViewer }