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
            <div class="row justify-content-center">
                <div class="col-9 col-md-2">
                    <img src="../../src/img/logo-black.png" alt="logo" title="logo" class="w-100" />
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

                                    <div class="lead lead-xl mb-3">Nuestra misión en Universo de Jade es proporcionar a nuestros clientes oportunidades de inversión seguras y rentables en desarrollos sustentables. </div>
                                    <div class="lead lead-xl mb-3">Nos comprometemos a ofrecer un servicio de alta calidad, basado en la transparencia y cumplimiento de las normas legales, garantizando la satisfacción y tranquilidad de nuestros clientes. </div>
                                    <div class="lead lead-xl">Creemos en la construcción de relaciones a largo plazo, basadas en la confianza y el respeto mutuo.</div>
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

                                    <div class="lead mb-3 lead-xl">En Universo de Jade, aspiramos a ser reconocidos a nivel nacional e internacional como líderes en la venta de Bienes Raíces con un concepto de sustentabilidad y conexión.</div>
                                    <div class="lead mb-3 lead-xl">Queremos ser conocidos por nuestro compromiso con el medio ambiente, la transparencia y la satisfacción del cliente.</div> 
                                    <div class="lead lead-xl">Nuestra visión es ser un referente en la industria, marcando la pauta en prácticas comerciales éticas y sostenibles.</div>
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