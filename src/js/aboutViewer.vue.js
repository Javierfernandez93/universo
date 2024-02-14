import { AdviceViewer } from '../../src/js/adviceViewer.vue.js?v=2.3.8'

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
                <div class="row gx-6 justify-content-center">
                    <div class="col-12 col-md">
                        <div class="h2 text-success">Misión</div>
                        <div class="lead lead-xl">Nuestra misión en Universo de Jade es proporcionar a nuestros clientes oportunidades de inversión seguras y rentables en desarrollos sustentables. Nos comprometemos a ofrecer un servicio de alta calidad, basado en la transparencia y cumplimiento de las normas legales, garantizando la satisfacción y tranquilidad de nuestros clientes. Creemos en la construcción de relaciones a largo plazo, basadas en la confianza y el respeto mutuo.</div>
                        <img src="../../src/img/mision.jpg" alt="about" title="about" class="w-100 rounded mt-5"/>
                    </div>
                    <div class="col-12 col-md">
                        <div class="h2 text-success">Visión</div>
                        <div class="lead lead-xl">En Universo de Jade, aspiramos a ser reconocidos a nivel nacional e internacional como líderes en la venta de Bienes Raíces con un concepto de sustentabilidad y conexión. Queremos ser conocidos por nuestro compromiso con el medio ambiente, la transparencia y la satisfacción del cliente. Nuestra visión es ser un referente en la industria, marcando la pauta en prácticas comerciales éticas y sostenibles.</div>
                        <img src="../../src/img/vision.jpg" alt="about" title="about" class="w-100 rounded mt-5"/>
                    </div>
                </div>
                <div class="row g-6 py-5 justify-content-center">
                    <div class="col-12 col-md">
                        <div class="h2 text-success">Valores</div>
                        <div class="">
                            <div class="lead lead-xl">1. ⁠Sustentabilidad:Creemos en el cuidado del medio ambiente y promovemos prácticas que minimicen nuestro impacto en el planeta.</div>
                            <div class="lead lead-xl">2.⁠ ⁠Transparencia:Nos regimos por un alto nivel de honestidad en todas nuestras operaciones y comunicaciones. Trabajamos para garantizar que nuestros clientes estén bien informados y seguros en cada decisión de inversión.</div>
                            <div class="lead lead-xl">3.⁠ ⁠Respeto:Valoramos la diversidad y promovemos el respeto y la inclusión en todas nuestras interacciones.</div>
                            <div class="lead lead-xl">4.⁠ ⁠Responsabilidad:Asumimos la responsabilidad de nuestras acciones y decisiones y nos esforzamos por cumplir con nuestras promesas.</div>
                            <div class="lead lead-xl">5.⁠ ⁠Innovación:Estamos constantemente buscando formas de mejorar y ofrecer soluciones creativas a nuestros clientes.</div>
                        </div>
                        <img src="../../src/img/valores.jpg" alt="about" title="about" class="w-100 rounded mt-5"/>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AboutViewer }