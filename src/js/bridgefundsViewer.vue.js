import { Translator } from '../../src/js/translator.module.js?v=1.0.2'   

const BridgefundsViewer = {
    name : 'home-viewer',
    data() {
        return {
            Translator: new Translator,
            language_code: null,
            countries : [
                {
                    'country_id': 226,
                    'code': 'es',
                    'name': 'Español',
                },
                {
                    'country_id': 279,
                    'code': 'en',
                    'name': 'Inglés',
                }
            ],
        }
    },
    watch: {
        language_code: {
            async handler() {
                if(this.Translator.language != this.language_code)
                {
                    await this.Translator.changeLanguage(this.language_code)

                    location.reload()
                }
            },
            deep: true
        }
    },
    methods : {
        initScroll() {

            window.addEventListener("scroll", function(event) {
                if(this.scrollY > 100)
                {
                    $("#navbar").addClass("bg-white border-bottom")

                } else {
                    $("#navbar").removeClass("bg-white border-bottom")
                }
            })
        }
    },
    async mounted() 
    {       
        await this.Translator.init()
        
        this.language_code = this.Translator.language
        
        this.initScroll()
    },
    template : `
        <div class="row justify-content-center">
            <div class="col-12 col-xl-5 text-center">
                <div class="mb-5">
                    <img src="../../src/img/bridge.png" alt="bridge" title="bridge" class="img-fluid"/>
                </div>
                
                <h4>Obtén acceso a tu cuenta fondeada en minutos consigue el profit que deseas sin arriesgar tu capital</h4>

                <h4>
                    Paso#1
                </h4>

                <div class="mb-5">
                    <p class="lead fw-semibold text-dark">Registrate en <b>bridgemarkets</b> con tu mismo correo de <b>inicio de sesión que utilizas en Site</b></p>

                    <div class="d-grid">
                        <a href="../../apps/bridge/sign" class="btn btn-primary btn-lg shadow-none mb-0"><i class="bi me-2 bi-arrow-right-circle-fill"></i> Registrate</a>
                    </div>
                </div>
                <div>
                    <h4>
                        Paso#2
                    </h4>

                    <p class="lead fw-semibold text-dark">Selecciona la cuenta de tu preferencia</p>

                    <div class="">
                        <a href="../../apps/store/package?cptid=1" class="btn bg-gradient-primary px-5 btn-lg shadow-none mb-0"> Tipos de cuentas</a>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { BridgefundsViewer }