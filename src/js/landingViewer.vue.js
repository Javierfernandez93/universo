import { User } from '../../src/js/user.module.js?v=2.3.4'   

const LandingViewer = {
    name : 'landing-viewer',
    data() {
        return {
            User : new User,
            landing : null,
            hasLandingConfigurated : null,
        }
    },
    watch : {
        
    },
    methods: {
        getReferralLanding() {
            this.User.getReferralLanding({},(response)=>{
                if(response.s == 1)
                {
                    this.landing = response.landing
                    this.hasLandingConfigurated = response.hasLandingConfigurated
                }
            })
        },
        copyToClipBoard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.$refs.landing.innerText = 'Copiada'
            });
        },
        sendByWhatsapp(landing) {
            window.open(`*¡Hola!* quiero invitarte a un *proyecto increíble* que te permite *ganar dinero* por el *entretenimiento* ¡regístrate ya! ${landing}`.getWhatsappLink())
        },
    },
    mounted() 
    {   
        this.getReferralLanding()
    },
    template : `
        <div class="card shadow-none border">
            <div class="card-body text-center">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <div class="text-dark fw-semibold">
                            Enlace De Referidos
                        </div>
                        <div class="text-xs text-secondary">
                            {{landing.getFullLanding()}}
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl-6">
                        <div class="d-flex">
                            <button @click="copyToClipBoard(landing.getFullLanding())" ref="landing" class="btn mb-0 text-success shadow-none">
                                <div><i class="bi fs-2 bi-copy"></i></div>
                                Copiar
                            </button>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6">
                        <div class="d-flex">
                            <button @click="sendByWhatsapp(landing.getFullLanding())" class="btn mb-0 text-success shadow-none">
                                <div><i class="bi fs-2 bi-send-fill"></i></div>
                                Envíar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!hasLandingConfigurated" class="card-footer">
                <div class="alert alert-danger text-white mb-0 text-center">
                    <div><strong>Crea tu landing personalizada</strong></div>
                    Parece que no tienes configurada tu URL personalizada, puedes configurarla dando clic <a class="text-white" href="../../apps/backoffice/profile"><u>aquí</u></a>. Ingresa un nombre para tu link de referido en el apartado de "Landing Personalizada"
                </div>
            </div>
        </div>
    `,
}

export { LandingViewer } 