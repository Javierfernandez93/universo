import { User } from '../../src/js/user.module.js?v=1.1.3'   

const WidgetlandingViewer = {
    name : 'widgetlanding-viewer',
    data() {
        return {
            User: new User,
            busy : false,
            landing : null,
            hasLandingConfigurated : null,
        }
    },
    methods: {
        getReferralLanding() {
            this.busy = true
            
            this.User.getReferralLanding({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.landing = response.landing
                    this.hasLandingConfigurated = response.hasLandingConfigurated
                }
            })
        },
        copyToClipBoard(text,target) {
            let currentText = target.innerText

            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Copiada...'
                
                setTimeout(() => {
                    target.innerText = currentText
                },2000)
            });
        },
        sendByWhatsapp : function(landing) {
            window.open(`*¡Hola!* quiero invitarte Site *proyecto increíble* que te permite *ganar dinero* de *diversas maneras* ¡regístrate ya! ${landing}`.getWhatsappLink())
        },
    },
    mounted() 
    {   
        this.getReferralLanding()
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div>
            <h3>Mi link</h3>                
        </div>
        <div v-if="landing" class="card rounded bg-gray">
            <div class="card-body py-2">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <span @click="copyToClipBoard(landing.getFullLanding(),$event.target)" class="fs-5 text-dark fw-semibold">{{landing.getFullLanding()}}</span>
                    </div>
                    
                    <div class="col-12 col-xl-auto">
                        <button @click="copyToClipBoard(landing.getFullLanding(),$event.target)" class="btn btn-round btn-sm px-3 me-1 mb-0 btn-primary shadow-none">
                            Copiar Landing
                            <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                        </button>
                        <button @click="sendByWhatsapp(landing.getFullLanding())" class="btn me-1 mb-0 btn-round btn-sm px-3 btn-primary shadow-none">
                            Envíar a WhatsApp
                            <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { WidgetlandingViewer } 