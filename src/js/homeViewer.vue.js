import { Translator } from '../../src/js/translator.module.js?v=2.3.8'   
import { Guest } from '../../src/js/guest.module.js?v=2.3.8'   

const HomeViewer = {
    name : 'home-viewer',
    data() {
        return {
            Guest: new Guest,
            Translator: new Translator,
            language_code: null,
            stats: {
                experience: 0,
                real_state: 0,
                sales: 0,
                families: 0,
            },
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
        getConfigVarsStats() {
            this.Guest.getConfigVarsStats({},(response)=>{
                if(response.s == 1)
                {
                    this.stats = response.stats
                }
            })
        }
    },
    mounted() 
    {       
        window.onload = function(){
            setTimeout(()=>{
                $('#preloader').addClass("showout");
            },1200)

            const elementsToExpand = document.querySelectorAll(".expand")
    
            let expansionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        entry.target.classList.add("animation-fall-down");
                    } else {
                        entry.target.classList.remove("animation-fall-down");
                    }
                })
            })

            elementsToExpand.forEach(element => {
                expansionObserver.observe(element)
            })
        };

        this.getConfigVarsStats()
    },
    template : `
        <section id="section-1" class="d-flex vh-100 align-items-center">
            <div class="container">
                <div class="row align-items-center v-100">
                    <div class="col-10 col-md-6 col-xl-4 text-center text-dark">
                        <img src="../../src/img/logo.svg" class="w-100" alt="logo" title="logo" />
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-repeat py-5 animate-section" id="section-2">
            <div class="container">
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12 col-md-7 mb-3 mb-md-0">
                        <div class="card cursor-pointer z-zoom-element card-body card-jade card-jade-video d-flex justify-content-center align-items-center">
                            <span class="btn-play d-flex justify-content-center align-items-center"><i class="bi fs-1 bi-play-fill text-white"></i></span>
                        </div>
                    </div>
                    <div class="col-12 col-md-5">
                        <div class="card card-body bg-dark bg-repeat-circles p-0 p-md-5 card-jade">
                            <div class="d-flex h-100 justify-content-center align-items-center">
                                <div class="row w-1000">
                                    <div class="col-12">
                                        <div class="text-uppercase text-white h2">Conoce <strong class="text-success">Nuestra Visión</strong></div>
                                        <p class="text-white my-xl-5 my-2">No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset".</p>

                                        <button class="btn btn-success px-5 py-3">SOMOS</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 mb-n1 text-white">Nuestros</div>
                            <div class="h1 text-success">Proyectos</div>
                        </div>
                        <div class="row g-5 mb-5">
                            <div class="col-12 reveal-item col-md-8">
                                <div class="card card-property z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/nayal.png);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Tixkokob, Yucatán.</div>
                                            <div class="text-white h2">Nayal: Visión entre sueños</div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md-4">
                                <div class="card card-property z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/playaClara.png);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Santa Clara, Yucatán.</div>
                                            <div class="text-white h2">Playa Clara</div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class="row g-5">
                            <div class="col-12 reveal-item col-md-4">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/otoch.png);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Telchac Pueblo, Yucatán.</div>
                                            <div class="text-white h2">Otoch</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md-4">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/pandorah.png);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Chicxulub, Yucatán.</div>
                                            <div class="text-white h2">Pandorah</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md-4">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/kelaya.png);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Chicxulub, Yucatán.</div>
                                            <div class="text-white h2">Kelaya</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 mb-n1 text-white">Nuestra</div>
                            <div class="h1 text-success">Experiencia</div>
                        </div>
                        <div class="card card-body px-5 bg-dark text-center text-white">
                            <div class="row align-items-center border-bottom">
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div class="display-2 sans fw-bold">{{stats.experience}}</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div class="display-2 sans fw-bold">{{stats.real_state}}</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div class="display-2 sans fw-bold">{{stats.sales}}</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div class="display-2 sans fw-bold">{{stats.families}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div>Años de</div>
                                        <div>experiencia</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div>Desarrollos</div> 
                                        <div>Inmobiliarios</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div>Terrenos</div> 
                                        <div>Vendidos</div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="card card-body bg-transparent p-0 p-md-5">
                                        <div>Familias</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 mb-n1 text-white">Nuestros</div>
                            <div class="h1 text-success">Afiliados</div>
                        </div>
                        <div class="card card-body px-5 bg-dark text-center text-white">
                           <img class="w-100" src="../../src/img/home/afilliates.png" alt="afiliados" title="afiliados"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-dark expand" style="--delay:500ms">
            <div class="container py-5">
                <div class="row align-items-center w-100">
                    <div class="col-12 col-md-6">
                        <p class="text-white lead">Descubre nuestra presencia global en bienes raíces con un enfoque especial en los cautivadores terrenos de Yucatán.</p>
                    </div>
                    <div class="col-12 col-md-6">
                        <img src="../../src/img/home/world.png" class="w-100" alt="world" title="world"/>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-repeat py-5 expand" style="--delay:500ms">
            <div class="container">
                <div class="row justify-content-center py-5">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 mb-n1 text-white"><strong class="text-success">Testimonios</strong> de</div>
                            <div class="h1 text-white">nuestros Clientes / Asesores</div>
                        </div>
                    </div>
                </div>
                <div class="container bg-dark">
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="row carousel-container align-items-center justify-content-center">
                                    <div class="col-10 col-md-6">   
                                        <div class="d-flex justify-content-center mb-5">
                                            <div class="avatar avatar-xl">
                                                <img src="../../src/img/testimonial-1.png" class="avatar border-3 border border-white avatar-xl rounded-circle"/>
                                            </div>
                                        </div>
                                        <div class="lead text-white lead-xl text-center">“Gene y yo de Reno NV queremos agradecer a Bridge Makers por mostrarnos nuestras propiedades y explicarnos también sobre las comunidades circundantes. Tuvimos un día muy agradable y apreciamos su profesionalismo su y disposición genuina.
                                        PD.Gracias”</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

    `
}

export { HomeViewer }