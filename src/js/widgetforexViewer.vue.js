import { User } from '../../src/js/user.module.js?v=1.1.6'   

const WidgetforexViewer = {
    name : 'widforex-viewer',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() 
    {   
    },
    template : `
        <div class="row">
            <h2>Sistemas automatizados</h2>
            <p class="lead py-3">
                ¡Conectamos a nuestros clientes con las mejores operativas automatizadas!
            </p>
        </div>
        <div class="row">
            <div class="col-12 col-xl-6 mb-3">
                <div class="card shadow rounded">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <img src="../../src/img/fx.png" class="img-fluid" style="width:5rem" alt="telegram-floating" title="telegram-floating"/>
                                
                            </div>
                            <div class="col-12 col-xl">
                                <p class="lead text-dark mb-0">Cuenta auditada </p>
                                <h3 class="text-dark">FOREX</h3>
                            </div>
                        </div>
                        <div class="justify-content-center text-center mt-3">
                            <a href="https://www.myfxbook.com/members/ThebullPRO/thebullpro/10074190" class="btn btn-dark text-lowercase mb-0 shadow-none"><i class="bi me-2 bi-arrow-right"></i> Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6 mb-3">
                <div class="card shadow rounded">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <img src="../../src/img/fx.png" class="img-fluid" style="width:5rem" alt="telegram-floating" title="telegram-floating"/>
                            </div>
                            <div class="col-12 col-xl">
                                <p class="lead text-dark mb-0">Cuenta auditada </p>
                                <h3 class="text-dark">CRIPTO</h3>
                            </div>
                        </div>
                        <div class="justify-content-center text-center mt-3">
                            <a href="https://www.myfxbook.com/members/ThebullPRO/btcbullpro/10080605" class="btn btn-dark text-lowercase mb-0 shadow-none"> <i class="bi me-2 bi-arrow-right"></i>  Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { WidgetforexViewer } 