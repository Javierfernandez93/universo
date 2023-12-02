import { AdviceViewer } from '../../src/js/adviceViewer.vue.js?v=2.3.6'

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
                <div class="col-12 col-md-2">
                    <img src="../../src/img/logo-black.png" alt="logo" title="logo" class="w-100" />
                </div>
            </div>
            <div class="py-5">
                <div class="h2 text-success">Somos</div>
                <div class="lead lead-xl">Somos la fusión armoniosa entre la antigua sabiduría maya y la moderna innovación. En cada diseño, llevamos la esencia de la naturaleza y la rica cultura de Yucatán. Nuestro compromiso con la calidad y la sostenibilidad se refleja en cada detalle, creando no solo productos, sino experiencias que cuentan la historia de nuestra conexión con la tierra y sus tradiciones.</div>
                <img src="../../src/img/about.png" alt="about" title="about" class="w-100 rounded mt-5"/>
            </div>
            <div class="py-5">
                <div class="h2 text-success">Visión</div>
                <div class="lead lead-xl">Somos la fusión armoniosa entre la antigua sabiduría maya y la moderna innovación. En cada diseño, llevamos la esencia de la naturaleza y la rica cultura de Yucatán. Nuestro compromiso con la calidad y la sostenibilidad se refleja en cada detalle, creando no solo productos, sino experiencias que cuentan la historia de nuestra conexión con la tierra y sus tradiciones.</div>
                <img src="../../src/img/about.png" alt="about" title="about" class="w-100 rounded mt-5"/>
            </div>
            <div class="py-5">
                <div class="h2 text-success">Nuestra Comunidad</div>
                <div class="lead lead-xl">Somos la fusión armoniosa entre la antigua sabiduría maya y la moderna innovación. En cada diseño, llevamos la esencia de la naturaleza y la rica cultura de Yucatán. Nuestro compromiso con la calidad y la sostenibilidad se refleja en cada detalle, creando no solo productos, sino experiencias que cuentan la historia de nuestra conexión con la tierra y sus tradiciones.</div>
                <img src="../../src/img/about.png" alt="about" title="about" class="w-100 rounded mt-5"/>
            </div>
        </div>
    `
}

export { AboutViewer }