import { AdviceViewer } from '../../src/js/adviceViewer.vue.js?v=2.4.0'

const AboutViewer = {
    name : 'about-viewer',
    methods : {
        initScroll() {

            window.addEventListener("scroll", function(event) {
                if(this.scrollY > 100)
                {
                    $("#navbar").addClass("bg-gradient-dark shadow-xl")

                } else {
                    $("#navbar").removeClass("bg-gradient-dark shadow-xl")
                }
            })
        }
    },
    mounted() {
        this.initScroll()
    },
    template : `
        <div class="container py-5">
            <div class="row justify-content-center animation-fall-down" style="--delay:300ms">
                <div class="col-9 col-md-4">
                    <img src="../../src/img/black-horizontal.png" alt="logo" title="logo" class="w-100" />
                </div>
            </div>
            <div class="py-5">
                <div class="card card-body shadow-none bg-transparent animation-fall-down" style="--delay:500ms">
                    <div class="row gx-6 justify-content-center mb-5">
                        <div class="col-12">
                            <div class="row g-6 justify-content-center align-items-center">
                                <div class="col-12 col-md-8 text-center text-md-end pb-5 pb-md-0">
                                    <div class="mb-4">
                                        <div class="h1 mb-n1 text-success">Misión</div>

                                        <span class="divider bg-success"></span>
                                    </div>

                                    <div class="lead lead-xl mb-3">Nuestra <b class="text-dark">misión</b> en <b class="text-dark">Universo de Jade</b> es proporcionar a nuestros clientes <b class="text-dark">oportunidades de inversión seguras</b> y <b class="text-dark">rentables</b> en <b class="text-dark">desarrollos sustentables</b>. </div>
                                    <div class="lead lead-xl mb-3">Nos comprometemos a <b class="text-dark">ofrecer un servicio de alta calidad</b>, basado en la <b class="text-dark">transparencia</b> y <b class="text-dark">cumplimiento de las normas legales</b>, garantizando la satisfacción y <b class="text-dark">tranquilidad</b> de nuestros clientes. </div>
                                    <div class="lead lead-xl">Creemos en la construcción de <b class="text-dark">relaciones a largo plazo</b>, basadas en la <b class="text-dark">confianza</b> y el <b class="text-dark">respeto mutuo</b>.</div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <img src="../../src/img/mision.jpg" alt="about" title="about" class="w-100 rounded"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-white shadow-lg border border-light p-5 card-body animation-fall-down" style="--delay:600ms">
                    <div class="gx-6 justify-content-center">
                        <div class="col-12 col-md">
                            <div class="row g-6 justify-content-center align-items-center">
                                <div class="col-12 col-md-4 order-md-0 order-1">
                                    <img src="../../src/img/vision.jpg" alt="about" title="about" class="w-100 rounded"/>
                                </div>
                                <div class="col-12 col-md-8">
                                    <div class="mb-4">
                                        <div class="h1 mb-n1 text-success">Visión</div>

                                        <span class="divider bg-success"></span>
                                    </div>

                                    <div class="lead mb-3 lead-xl">En <b class="text-dark">Universo de Jade</b>, aspiramos a ser <b class="text-dark">reconocidos a nivel nacional e internacional</b> como <b class="text-dark">líderes en la venta de Bienes Raíces</b> con un concepto de sustentabilidad y conexión.</div>
                                    <div class="lead mb-3 lead-xl">Queremos ser conocidos por <b class="text-dark">nuestro compromiso con el medio ambiente</b>, la <b class="text-dark">transparencia</b> y la <b class="text-dark">satisfacción del cliente</b>.</div> 
                                    <div class="lead lead-xl">Nuestra <b class="text-dark">visión</> es <b class="text-dark">ser</b> un <b class="text-dark">referente en la industria</b>, marcando la pauta en prácticas comerciales éticas y sostenibles.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-body shadow-none bg-transparent animation-fall-down" style="--delay:1200ms">
                    <div class="row g-6 py-5 justify-content-center">
                        <div class="col-12 col-md-8">
                            <div class="mb-4 text-center">
                                <div class="h1 mb-n1 text-success">Valores</div>

                                <span class="divider bg-success"></span>
                            </div>

                            <div class="text-center">
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1">1. ⁠Sustentabilidad:</span>
                                    <div class="lead lead-xl">Creemos en el cuidado del medio ambiente y promovemos prácticas que minimicen nuestro impacto en el planeta.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1">2.⁠ ⁠Transparencia:</h4>
                                    
                                    <div class="lead lead-xl">Nos regimos por un alto nivel de honestidad en todas nuestras operaciones y comunicaciones. Trabajamos para garantizar que nuestros clientes estén bien informados y seguros en cada decisión de inversión.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1">3.⁠ ⁠Respeto:</h4>
                                    
                                    <div class="lead lead-xl">Valoramos la diversidad y promovemos el respeto y la inclusión en todas nuestras interacciones.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1">4.⁠ ⁠Responsabilidad:</h4>
                                    
                                    <div class="lead lead-xl">Asumimos la responsabilidad de nuestras acciones y decisiones y nos esforzamos por cumplir con nuestras promesas.</div>
                                </div>
                                <div class="lead lead-xl">
                                    <h4 class="mb-n1">5.⁠ ⁠Innovación:</h4>
                                    
                                    <div class="lead lead-xl">Estamos constantemente buscando formas de mejorar y ofrecer soluciones creativas a nuestros clientes.</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <img src="../../src/img/valores.jpg" alt="about" title="about" class="w-100 rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AboutViewer }