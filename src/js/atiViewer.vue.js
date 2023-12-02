import { User } from '../../src/js/user.module.js?v=2.3.7'   

const AtiViewer = {
    name : 'ati-viewer',
    data() {
        return {
            User: new User,
        }
    },
    template : `
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <div class="row justify-content-center mb-3">
                    <div class="col-12 text-center">
                        <img src="../../src/img/ati.png?v=1.3.6" class="w-100" alt="Ati" title="Ati"/>
                    </div>
                </div>

                <div class="row justify-content-center mb-3">
                    <div class="col-12">
                        <div class="card p-0 overflow-hidden bg-transparent shadow-none">
                            <video src="../../src/files/video/comprar-ati.mp4" controls>
                                <p>Tu navegador no soporta la reproducción de videos</p>
                            </video>
                        </div>
                    </div>
                </div>

                <div class="h2">Trading Semi Automático</div>
                <div class="lead mb-3">¡Descubre ATI de Site, el <strong>Asistente de Trading Inteligente de bajo riesgo!</strong> analiza tu rentabilidad en índices sintéticos y genera ganancias hasta del 2% diario a un mínimo riesgo y con muy poca presencia tuya.</div>
                <div class="lead mb-3">Aprovecha el poder de ATI, conviértelo en tu asistente personal de trading y alcanza tus metas financieras!</div>

                <div class="card card-body bg-mesh rounded">
                    <div class="mb-3 text-center text-white">
                        <div class="h3 text-white">Recibes</div>
                        <div class="h4 text-white"><i class="bi text-white bi-check"></i> Licencia de uso</div>
                        <div class="h4 text-white"><i class="bi text-white bi-check"></i> VPS</div>
                        <div class="h4 text-white"><i class="bi text-white bi-check"></i> Acompañamiento diario y soport</div>
                    </div>
                </div>
                
                <div class="mt-3">
                    <a href="../../apps/store/package?cptid=8" class="btn btn-primary btn-lg shadow-none">Adquirir ahora</a>
                </div>
            </div>
        </div>
    `
}

export { AtiViewer }