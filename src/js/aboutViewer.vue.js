
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

            <div class="row align-items-center justify-content-center text-center">
                <div class="row align-items-center justify-content-center text-center">
                    <div class="col-4 col-md-2 text-center text-dark animation-fall-down" style="--delay:300ms">
                        <img src="../../src/img/green-light-vertical.png" class="w-100" alt="logo" title="logo" />
                    </div>
                </div>
            </div>
            
            <div class="py-5 text-white">
                <div class="card card-body shadow-none bg-transparent animation-fall-down" style="--delay:500ms">
                    <div class="row gx-6 justify-content-center mb-5">
                        <div class="col-12">
                            <div class="row g-6 justify-content-center align-items-center">
                                <div class="col-12 col-md-8 text-center text-md-end pb-5 pb-md-0">
                                    <div class="mb-4">
                                        <div class="h2 maldives mb-n1 text-success">Misión</div>

                                        <span class="divider bg-success"></span>
                                    </div>

                                    <div class="lead lead-xl mb-3">Nuestra <b class="text-white">misión</b> en <b class="text-white">Universo de Jade</b> es proporcionar a nuestros clientes <b class="text-white">oportunidades de inversión seguras</b> y <b class="text-white">rentables</b> en <b class="text-white">desarrollos sustentables</b>. </div>
                                    <div class="lead lead-xl mb-3">Nos comprometemos a <b class="text-white">ofrecer un servicio de alta calidad</b>, basado en la <b class="text-white">transparencia</b> y <b class="text-white">cumplimiento de las normas legales</b>, garantizando la satisfacción y <b class="text-white">tranquilidad</b> de nuestros clientes. </div>
                                    <div class="lead lead-xl">Creemos en la construcción de <b class="text-white">relaciones a largo plazo</b>, basadas en la <b class="text-white">confianza</b> y el <b class="text-white">respeto mutuo</b>.</div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <img src="../../src/img/mision.jpg?t=3" alt="about" title="about" class="w-100 rounded"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card text-white bg-dark shadow-lg border border-light p-5 card-body animation-fall-down" style="--delay:600ms">
                    <div class="gx-6 justify-content-center">
                        <div class="col-12 col-md">
                            <div class="row g-6 justify-content-center align-items-center">
                                <div class="col-12 col-md-4 order-md-0 order-1">
                                    <img src="../../src/img/vision.jpg?t=3" alt="about" title="about" class="w-100 rounded"/>
                                </div>
                                <div class="col-12 col-md-8">
                                    <div class="mb-4">
                                        <div class="h2 maldives mb-n1 text-success">Visión</div>

                                        <span class="divider bg-success"></span>
                                    </div>

                                    <div class="lead mb-3 lead-xl">En <b class="text-white">Universo de Jade</b>, aspiramos a ser <b class="text-white">reconocidos a nivel nacional e internacional</b> como <b class="text-white">líderes en la venta de Bienes Raíces</b> con un concepto de sustentabilidad y conexión.</div>
                                    <div class="lead mb-3 lead-xl">Queremos ser conocidos por <b class="text-white">nuestro compromiso con el medio ambiente</b>, la <b class="text-white">transparencia</b> y la <b class="text-white">satisfacción del cliente</b>.</div> 
                                    <div class="lead lead-xl">Nuestra <b class="text-white">visión</> es <b class="text-white">ser</b> un <b class="text-white">referente en la industria</b>, marcando la pauta en prácticas comerciales éticas y sostenibles.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card text-white card-body shadow-none bg-transparent animation-fall-down" style="--delay:1200ms">
                    <div class="row g-6 py-5 justify-content-center">
                        <div class="col-12 col-md-8">
                            <div class="mb-4 text-center">
                                <div class="h2 maldives mb-n1 text-success">Valores</div>

                                <span class="divider bg-success"></span>
                            </div>

                            <div class="text-center ">
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1 text-white">1. ⁠Sustentabilidad:</span>
                                    <div class="lead lead-xl text-white">Creemos en el cuidado del medio ambiente y promovemos prácticas que minimicen nuestro impacto en el planeta.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1 text-white">2.⁠ ⁠Transparencia:</h4>
                                    
                                    <div class="lead lead-xl">Nos regimos por un alto nivel de honestidad en todas nuestras operaciones y comunicaciones. Trabajamos para garantizar que nuestros clientes estén bien informados y seguros en cada decisión de inversión.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1 text-white">3.⁠ ⁠Respeto:</h4>
                                    
                                    <div class="lead lead-xl">Valoramos la diversidad y promovemos el respeto y la inclusión en todas nuestras interacciones.</div>
                                </div>
                                <div class="lead lead-xl mb-3">
                                    <h4 class="mb-n1 text-white">4.⁠ ⁠Responsabilidad:</h4>
                                    
                                    <div class="lead lead-xl">Asumimos la responsabilidad de nuestras acciones y decisiones y nos esforzamos por cumplir con nuestras promesas.</div>
                                </div>
                                <div class="lead lead-xl">
                                    <h4 class="mb-n1 text-white">5.⁠ ⁠Innovación:</h4>
                                    
                                    <div class="lead lead-xl">Estamos constantemente buscando formas de mejorar y ofrecer soluciones creativas a nuestros clientes.</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <img src="../../src/img/valores.jpg?t=3" alt="about" title="about" class="w-100 rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AboutViewer }