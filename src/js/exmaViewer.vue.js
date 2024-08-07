import { User } from '../../src/js/user.module.js?v=1.1.4'   
import { Translator } from '../../src/js/translator.module.js?v=1.1.4'   

const ExmaViewer = {
    name : 'exma-viewer',
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
            <div class="col-12 col-xl-6">
                <div class="card rounded">
                    <div class="card-header">
                        <div class="h4 mb-n2">Cuenta PAMM</div>
                        <div class="h2">Exma Trading</div>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="row align-items-center w-100">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success"></i>
                                    </div>
                                    <div class="col-12 col-xl">
                                        Control sobre tu capital
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Puedes activar tu cuenta desde cualquier parte del mundo
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Visibilidad y resultados en tiempo real desde MT5
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Utilidades directamente a tu cuenta del broker
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Inicia desde 1,000 USD
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Costo de conexión 4%
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <i class="bi bi-check h4 text-success">
                                    </div>
                                    <div class="col-12 col-xl">
                                        Tiempo mínimmo de permanecia 1 mes
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer py-0">
                        <div class="d-grid">
                            <a href="../../apps/exma/account" class="btn btn-lg shadow-none btn-primary">Adquirir ahora</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <h3>Cuentas auditadas</h3>
                <div class="row justify-content-center align-items-center">
                    <div class="col-12">
                        <div class="card card-body mb-3 rounded">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-xl-auto">
                                    <img src="../../src/img/fx.png" alt="fx" title="fx" class="img-fluid"/>
                                </div>
                                <div class="col-12 col-xl">
                                    <div class="text-xs">Cuenta auditada</div>
                                    <div class="h3">PAMM 1</div>
                                    <a href="https://www.mql5.com/en/signals/2028026?source=Site+Signals+My" class="btn btn-primary mb-0">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 d-none">
                        <div class="card card-body mb-3 rounded">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-xl-auto">
                                    <img src="../../src/img/fx.png" alt="fx" title="fx" class="img-fluid"/>
                                </div>
                                <div class="col-12 col-xl">
                                    <div class="text-xs">Cuenta auditada</div>
                                    <div class="h3">PAMM 2</div>
                                    <a href="https://www.mql5.com/en/signals/2028026?source=Site+Signals+My" class="btn btn-primary mb-0">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { ExmaViewer }