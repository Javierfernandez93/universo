import { User } from '../../src/js/user.module.js?v=1.0.8'   

const AutotradingViewer = {
    name : 'autotrading-viewer',
    props : ['image'],
    data() {
        return {
            User : new User,
            hasAccount : null,
        }
    },
    methods: {
        getBridgeAccount() {
            this.User.getBridgeAccount({},(response)=>{
                if(response.s == 1)
                {
                    this.hasAccount = true
                } else if(response.r == "NOT_ACCOUNT") {
                    alertInfo({
                        icon:'<i class="bi bi-x"></i>',
                        message: 'Aún no tienes una cuenta en Bridge',
                        _class:'bg-gradient-danger text-white'
                    })
                }
                
                reject()
            })
        },
    },
    mounted() {
        this.getBridgeAccount().then((account) =>{

        })
    },
    template : `
        <div class="row justify-content-center mb-5 text-center">
           <div class="col-12">
                <div class="row justify-content-center my-5">
                    <div class="col-8 col-md-4 col-xl-4">
                        <img src="../../src/img/bridge-markets.png" class="w-100" alt="bridge-markets" alt="bridge-markets">
                    </div>
                </div>

                <h4>Activa tu cuenta de Trading 100% en automático, en 2 sencillos pasos.</h4>

                <div class="py-3">
                    <h4 class="fw-semibold text-dark">
                        Paso #1:
                    </h4>
                    
                    <p class="lead">
                        Regístrate en nuestro Broker Recomendado y haz tu primer depósito.
                    </p>

                    <a class="btn btn-primary mb-0 shadow-none" href="../../apps/bridge/sign">Registro</a>
                </div>

                <div class="py-3">
                    <h3 class="text-primary">
                        Contacta a tu patrocinador
                        
                        <div>
                            Siteglobal
                        </div>
                    </h3>
                </div>

                <div class="py-3">
                    <h4 class="fw-semibold text-dark">
                        Paso #2:
                    </h4>

                    <p class="lead">
                        Depósita a tu cuenta y comienza a ganar dinero en automático
                    </p>
                </div>

                <a href="../../apps/store/package?cptid=4" class="btn btn-lg px-4 mb-0 shadow-none fs-3 btn-primary">Deposita aquí</a>
            </div>
        </div>
    `,
}

export { AutotradingViewer } 