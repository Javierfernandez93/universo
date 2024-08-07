import { User } from '../../src/js/user.module.js?v=1.1.4'   

const DummieViewer = {
    name : 'dummie-viewer',
    data() {
        return {
            User: new User,
        }
    },
    watch: {
    },
    methods : {
    },
    mounted() 
    {       
    },
    template : `
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <div class="row justify-content-center mb-3">
                    <div class="col-12 col-xl-4 text-center">
                        <img src="../../src/img/logo-dummietrading-dark.svg" class="w-100 my-3" alt="dummie" title="dummie"/>
                    </div>
                </div>
                
                <div class="row justify-content-center mb-3">
                    <div class="col-12">
                        <div class="card p-0 overflow-hidden bg-transparent shadow-none">
                            <video src="../../src/files/video/comprar-dt.mov" controls>
                                <p>Tu navegador no soporta la reproducción de videos</p>
                            </video>
                        </div>
                    </div>
                </div>

                <div class="h2">Trading Semi Automático</div>
                <div class="lead mb-3">Guíate por las señales de expertos y ejecuta las ordenes desde WhatsApp o Telegram sin necesidad de acceder al exchange o a MT4/MT5</div>
                <div class="lead">Además podras gestionar el riesgo de tu cuenta, solo debes decirle a dummie Trading a través de telegram cuanto quieres ganar y cuanto estás dispuesto a arriesgar en cada orden y esta herramienta con inteligencia artificial colocará la orden por tí sin necesidad de procedimientos complejos.</div>

                <div class="mt-3">
                    <a href="../../apps/store/package?cptid=7" class="btn btn-primary btn-lg shadow-none">Adquirir ahora</a>
                </div>
            </div>
        </div>
    `
}

export { DummieViewer }