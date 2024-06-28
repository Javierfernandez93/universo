import { Translator } from '../../src/js/translator.module.js?v=1.0.2'   
import { Guest } from '../../src/js/guest.module.js?v=1.0.2'   
import ModalViewer from '../../src/js/modalViewer.vue.js?v=1.0.2'   

const HomeViewer = {
    components : {
        ModalViewer
    },
    data() {
        return {
            Guest: new Guest,
            Translator: new Translator,
            showing: true,
            language_code: null,
            currentAffiliate: null,
            members: null,
            stats: {
                experience: 0,
                real_state: 0,
                sales: 0,
                families: 0,
            },
            testimonials : null,
            testimonialsAux : [
                {
                    name: 'Hiram García / Veracruz',
                    image : '../../src/img/testimonials/1.png',
                    text : `<p class="lead">Fueron muy atentos al recogernos en el lugar en el que nos encontrábamos. Y durante el camino me pareció interesante que nos ibas explicando detalles de las zonas en las que íbamos pasando. Además, de dar información de Mérida en general. Llegando al lugar, la explicación fue clara abordando los beneficios de la zona. Siempre muy atentos y amables al llevarnos a la notaría y esperarnos y al final acompañarnos al lugar en dónde nos íbamos a quedar. Muchas gracias</p>`,
                    time : '1:27 PM - Feb 17'
                },
                {
                    name: 'Jocelyn Lopez / Estado de México',
                    image : '../../src/img/testimonials/2.png',
                    text : `<p class="lead">Hacer este viaje fue una gran experiencia estuvo lleno de aprendizaje y Diversion, Esperamos pronto volvamos a Repetir esta agradable aventura</p>`,
                    time: '2:23 PM - Feb 16'
                },
                {
                    name: 'Luis Martín Tomas / Guadalajara',
                    image : '../../src/img/testimonials/3.png',
                    text : `<p class="lead">Una gran experiencia. La explicación de los avances y planes a futuro fue muy detallada, además de un trato muy amable y atento por parte del equipo ZUKUM. La atención fue muy personalizada.</p>`,
                    time : '2:23 PM - Feb 10'
                },
                {
                    name: 'Gene / Reno Nevada',
                    image : '../../src/img/testimonials/4.png',
                    text : `<p class="lead">Would like to thank with Bridge Makers for showing us our properties and explaining to us as well about the surrounding communities.We had a very nice day and appreciate her professionalism yet her genuine disposition.</p>
                    <p class="lead">PS.Thank you</p>`,
                    time: '2:23 PM - Feb 8'
                },
                {
                    name: 'Jack Reader / Reno Nevada',
                    image : '../../src/img/testimonials/5.png',
                    text : `<p class="lead">Tawnya and I would like to thank with Bridge Makers for showing us our properties and explaining to us as well about the surrounding com-munities.We had a very nice day and appreciate her professionalism yet her genuine disposition.</p>
                    <p>PS.Thank you</p>`,
                    time: '2:23 PM - Feb 7'
                },
                {
                    name: 'Jose Antonio Pensamiento / CDMX',
                    image : '../../src/img/testimonials/6.png',
                    text : `<p class="lead">Ir a conocer el proyecto en persona fue genial! Una cosa es tener un contrato con obligaciones y promesas y dar dinero cada mes para pagar un terreno que nunca has visto, y otra muy diferente verlo en persona.
                    Enciende la pasión y te anima a seguir adelante. Además de que el recorrido fue muy bonito. Ver la semilla e imaginar el enorme árbol en el que se convertirá es increíble. Gracias por todo!</p>`,
                    time: '2:23 PM - Feb 5'
                },
                {
                    name: 'Tony y Paola / Reno Nevada',
                    image : '../../src/img/testimonials/7.png',
                    text : `<p class="lead">Hermosa experiencia en Yucatán donde recibimos la mejor atención, informacion y sugerencias de nuestros guias en el recorrido de nuestra inversión en Nayal y Playa Clara.
                    Podimos entender mas afondo los beneficios que se obtentrian de nuestra inversión. Nos quedamos satisfechos y con anticipación de ver florecer nuestra Aventura en Yucatán. Este hermos estado nos dio una Aventura sin igual donde podimos experimentar lo calido del Mar en Puerto Progresso, Las piramides de Chichen Itza, disfrutar de la hermosa cuidad de Merida y ver de primera mano la hermosura de los cenotes! Todo al alcanze de Nayal y Playa Clara! Gracias especiales a Daysi que nos hizo sentir bienvenidos a todo momento y nuestras asesoras Olga y Ofelia de Bridge Makers Reno, NV</p>`,
                    time: '2:23 PM - Feb 28'
                },
                {
                    name: 'César David Ávila / Guanajuato',
                    image : '../../src/img/testimonials/8.png',
                    text : `<p class="lead">Yo fui a visitar en el mes de septiembre soy de Guanajuato
                    La explicacion de el recorrido fue muy clara el recorrido estuvo muy bien y Yucatán es muy bonito les recomiendo mucho visitar esta muy bonito.</p>`,
                    time: '2:23 PM - Feb 25'
                },
                {
                    name: 'Luis Díaz Carbajal / CDMX',
                    image : '../../src/img/testimonials/9.png',
                    text : `<p class="lead">¡Buen día! en lo referente a mi experiencia en Yucatán le puedo decir que fue una hermosa visión de futuro ya que como capitalismo ver un lugar tan hermoso y saber que pronto podré hacerlo mío, y gracias a su compromiso, guía y supervisión pude disfrutar de mi viaje a ese hermoso lugar de lo cual les estoy muy agradecido espero en algún momento volverlos a contactar gracias y repito buen dia</p>`,
                    time: '3:34 PM - Feb 15'
                },
                {
                    name: 'Hiram García / Veracruz',
                    image : '../../src/img/testimonials/10.png',
                    text : `<p class="lead">Tuve una visita muy grata a los dos Proyectos, a "NAYAL" y a "PLAYA CLARA", ya que se disiparon muchas dudas de su ubicación y de su plusvalía, confirmando que es buena oportunidad de inversión y que el crecimiento de la zona es hacía esos lugares, dejándome un buen sabor de boca para mis inversiónes</p>`,
                    time: '12:47 PM - Ene 12'
                },
            ],
            affiliatesList : {
                lets_get_it : [
                    {
                        name : 'KASS Y FER',
                        image : '../../src/img/sponsors/10.png',
                        text : `<p class="text-sm mb-0">Formar parte de este gran movimiento ha sido toda una aventura, pertenecer a Bridge Makers ha significado en nuestra vida crecimiento, apoyo, certeza y evolución. 
                        <p class="text-sm mb-0">En esta estructura hemos encontrado a una familia que remamos hacia el mismo lugar sin importar las diferentes opiniones con las que podemos encontrarnos. </p>
                        <p class="text-sm mb-0">Bridge Makers además de permitirme darle una vuelta al juego de nuestra vida ha representado la oportunidad perfecta para encontrar la forma de brindarle apoyo a miles de personas a través de nuestra fuerza de ventas “Let’s Get It”. </p>
                        <p class="text-sm mb-0">Hoy nos sentimos agradecidas, no solo del crecimiento personal y laboral que hemos tenido en estos años, sino, también de toda la confianza que cada familia ha puesto en nosotras.</p>`,
                    },
                ],
                aztek_ : [
                    {
                        name : 'ROBERTO',
                        image : null,
                        text : `<p class="lead"></p>`,
                    },
                ],
                bm_reno : [

                    {
                        name : 'OFELIA ZIESSE',
                        image : '../../src/img/sponsors/8.png',
                        text : `
                            <p class="lead">Soy la gerente de oficina Bridge MakersReno, una apasionada de la industria en Bienes Raíces. Con años de experiencia en Estados Unidos y en México. Mi propósito es poder aportar a la comunidad Mexicana en USA y lograr ahora que cumplan el Sueño Mexicano. Estoy comprometida a proveer a la comunidad con una asesoría personalizada, honesta y de valor siempre cuidando el beneficio para ellos.</p>
                            <p class="lead">Estoy inmensamente agradecida por la confianza que nuestros clientes depositan en nosotros a través de sus inversiones. Gracias!.</p>
                        `,
                    },
                ],
                wayak : [
                    {
                        name : 'DIANA JIMENDI',
                        image : '../../src/img/sponsors/4.png',
                        text : `
                            <p class="lead mb-3">Pertenecer a este movimiento transformó por completo mi concepto de lo que era mi concepto de éxito. Normalmente yo venia persiguiendo el éxito representado en dinero, a costa de la verdadera riqueza que es el tiempo. Bridge-makers me enseñó que el éxito es integral y en ese entendimiento puede multiplicar mis ingresos de manera inteligente y no esclavizando mi vida para tener dinero.</p>
                            <p class="lead">Eres el promedio de las 5 personas más cercanas a ti, Bridgemakers es una comunidad de personas que nos empujamos a romper creencias y desafiar lo imposible juntos.</p>
                        `,
                    },
                ],
                estrellas_inmobiliarias : [
                    {
                        name : 'PABLO CANTO',
                        image : '../../src/img/sponsors/9.png',
                        text : `
                            <p class="lead mb-3">Ser parte de Bridge Makers ha significado una nueva forma de trabajo en equipo, ofreciendo valor agregado desde el asesoramiento al cliente hasta el desarrollo humano. Garantizamos la seguridad jurídica en la comercialización de propiedades ubicadas en zonas de alto rendimiento en Yucatán, con amenidades disruptivas en el mercado inmobiliario local.</p>
                            <p class="lead">Gracias a cada inversionista que ha confiado y que ha decidido ver su luz en tierras Yucatecas.</p>
                        `,
                    },
                ],
                bm_california : [
                    {
                        name : 'MAYRA ALVARÉZ',
                        image : '../../src/img/sponsors/7.png',
                        text : `
                            <p class="lead">Mi experiencia en Bridge Makers ha sido una renovacion total en mi forma de pensar y vivir mi vida. Bridge Makers me guió en el camino para regresar a Mexico y poder compartir lo que para mi es una oportunidad de crecer en mi País. Gracias a todos mis clientes por confiar en la vision y saber que estoy aqui para brindarles siempre lo mejor de mi.</p>
                        `,
                    },
                ],
                bm_virtual : [
                    {
                        name : 'GUSTAVO GONZÁLEZ',
                        image : '../../src/img/sponsors/5.png',
                        text : `
                            <p class="lead">Bridge mackers es una forma de vivir construye do una comunidad conciente de inversión y de posibilidades de un futuro seguro.</p>
                        `,
                    },
                ],
                bm_centro : [
                    {
                        name : 'IRVING GOMEZ',
                        image : '../../src/img/sponsors/6.png',
                        text : `
                            <p class="lead">Pertenecer a Bridge Makers Corp. ha sido transformador. He crecido personalmente, adoptando una perspectiva positiva y enfrentando desafíos que antes consideraba inalcanzables. He aprendido a tomar decisiones conscientes y a disfrutar el proceso de crecimiento. Esta comunidad me ha ayudado a superar miedos y encontrar la felici-dad. Reconozco mi potencial como agente de cambio junto a mis compañeros. Estoy agradecido por esta experiencia.</p>
                        `,
                    },
                ],
                flamingo : [
                    {
                        name : 'ALBERTO LÓPEZ',
                        image : '../../src/img/sponsors/2.png',
                        text : `
                            <p class="lead mb-3">Pertenecer a BM ha logrado que no importa cual sea la meta que me proponga, es 100% alcanzable. Me encanta que somos una empresa que se preocupa en el crecimiento personal, individual y en equipo</p>
                            <p class="lead">El apoyar y servir a mis clientes genera una satisfacción personal porque, como siempre les digo, mi visión es coincidir en un lugar tan hermoso como lo es Yucatán disfrutando del resultado de tantos años de esfuerzo y sacrificio de vivir en Estados Unidos.</p>
                        `,
                    },
                ],
                aa_capital : [
                    {
                        name : 'ANGEL GUERRERO',
                        image : '../../src/img/sponsors/1.png',
                        text : `<p class="lead">Es una oportunidad que cambio mi forma de ver la vida en todos los sentidos, cuando más necesitaba un cambio de aires llegó la oportunidad y las cosas comenzaron a ser mejores en todos los aspectos. No solo en la parte económica que realmente es buena se puede ganar mucho dinero, pero lo más importante en quien me he convertido a partir de pertenecer a este grupo de seres humanos extraordinarios. Simplemente !GRACIAS!.</p>`,
                    },
                ],
                conexion : [
                    {
                        name : 'ALEJANDRA BARAJAS',
                        image : '../../src/img/sponsors/3.png',
                        text : `
                            <p class="lead mb-3">Mi experiencia en Bridge Makers ha sido una renovacion total en mi forma de pensar y vivir mi vida. Bridge Makers me guió en el camino para regresar a Mexico y poder compartir lo que para mi es una oportunidad de crecer en mi País.</p>
                            <p class="lead">Gracias a todos mis clientes por confiar en la vision y saber que estoy aqui para brindarles siempre lo mejor de mi.</p>
                        `,
                    },
                ]
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
        getSponsors(affilliateName) {
            this.currentAffiliate = this.affiliatesList[affilliateName] ? shuffle(this.affiliatesList[affilliateName]) : []

            if(this.currentAffiliate.length == 0)
            {
                toastInfo({
                    message: 'No hay afiliados para mostrar',
                })

                return 
            }
            
            this.$refs.myModal.show()
        },
        viewVideo(video) {
            alertHtml(`
                <div class="ratio ratio-16x9">
                    <iframe class="embed-responsive-item" src="${video}" allowfullscreen></iframe>
                </div>`
            , 'video', 'modal-fullscreen')
        },
        getConfigVarsStats() {
            this.Guest.getConfigVarsStats({},(response)=>{
                if(response.s == 1)
                {
                    this.stats = response.stats
                }
            })
        },
        getUsersByInternet(internet) {
            let user = this.members.find((member) => {
              return member.country.internet == internet;
            });
      
            return user != undefined ? user.total : 0;
          },
          getTopCountries() {
            this.Guest.getTopCountries({}, (response) => {
              if (response.s == 1) {
                this.members = response.members;
                
                let countries = {}
        
                response.members.map((member) => {
                    countries[member.country.internet] = 'Jade'
                })
      
                this.initMap(countries);
              } else {
                this.initMap([]);
              }
      
      
            });
          },
          initMap(_countries) {
            let _this = this;
            var countries = {
              scales: {
                Jade: "#28A97D",
              },
              values: _countries
            };
      
            var map = new jsVectorMap({
              map: "world",
              zoomMax: 1,
              zoomMin: 1,
              draggable: false,
              selector: "#map",
              series: {
                regions: [
                  {
                    attribute: "fill",
                    scale: countries.scales,
                    values: countries.values,
                    legend: {
                      vertical: true,
                    },
                  },
                ],
              },
              regionsSelectable: true,
              markersSelectable: true,
              labels: {
                markers: {
                  render(marker) {
                    return marker.name;
                  },
                },
              },
              onRegionSelected(index, isSelected, selectedRegions) {
                console.log(index, isSelected, selectedRegions);
              },
              onRegionTooltipShow(event, tooltip, index) {
                let usersTotal = _this.getUsersByInternet(index);
                console.log(tooltip, index);
                tooltip
                  .css({ backgroundColor: "#28a97d" })
                  .text(tooltip.text() + ` territorio Jade`);
              },
              onMarkerSelected(code, isSelected, selectedMarkers) {
                console.log(code, isSelected, selectedMarkers);
              },
              onMarkerTooltipShow(event, tooltip, code) {
                tooltip.text(tooltip.text() + " (Hello World (marker))");
              },
            });
          },
          playVideo(element)
          {
            console.log(element)
            this.showing = false
            document.getElementById('videoBoss').play();
          },
          async init() {            
            $('#preloader').addClass("showout");

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
          }
    },
    async mounted() 
    {       
        await this.init()   

        this.testimonials = shuffle(this.testimonialsAux)

        this.getTopCountries();
        this.getConfigVarsStats()
    },
    template : `
        <section id="section-1" class="d-flex vh-100 align-items-center">
            <video ref="videoIntro" width="320" height="240" class="video-floating" controls autoplay muted loop>
                <source src="../../src/files/video/home.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <div class="d-none d-flex align-items-center justify-content-center w-100 h-100 z-zoom-element z-index-1">
                <span @click="playVideo($refs.videoIntro)" class="btn-pla cursor-pointer z-zoom-element"><i class="bi fs-1 bi-play-fill text-white"></i></span>
            </div>

            <div class="mask bg-dark-translucid"></div>
        </section>

        <section class="py-5 animate-section" id="section-2">
            <div class="container">
                <div class="row align-items-center justify-content-center g-5 py-5 expand" style="--delay:500ms">
                    <div class="col-12 col-md-12 col-xl-7 position-relative mb-3 mb-md-0">
                        <div @click="playVideo($refs.videoPromotional)" v-show="showing" class="mask cursor-pointer z-zoom-element bg-dark rounded opacity-total z-index-1" style="background-image:url(../../src/img/home/video.png)">
                            <div class="justify-content-center d-flex align-items-center h-100">
                                <span class="btn-play d-flex justify-content-center align-items-center cursor-pointer z-zoom-element"><i class="bi fs-1 bi-play-fill text-white"></i></span>
                            </div>
                        </div>
                        <video id="videoBoss" ref="videoPromotional" class="rounded overflow-hidden" style="width:100%;height:30rem" poster="../../src/img/home/video.png" controls>
                            <source src="../../src/files/video/video.mp4" type="video/mp4">
            
                            <object data="../../src/files/video/video.mp4" width="470" height="255">
                            </object>
                        </video>
                    </div>
                    <div class="col-12 col-md-12 col-xl-5">
                        <div class="card card-body p-5 bg-dark bg-repeat-circles">
                            <div class="text-uppercase mb-3 text-white maldives h3">¿Cómo se define <strong class="text-success fw-bold">Universo de Jade?</strong></div>
                            <p class="text-white lead my-2">Universo de jade es un concepto que abraza una serie de desarrollos con la unión de la naturaleza y lo sustentable creando un entorno amigable con el medio ambiente.</p>

                            <a href="../../apps/home/about" class="btn btn-success btn-lg mt-3 mb-0 px-5 py-3">SOMOS</a>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 maldives mb-n1 text-white">Nuestros</div>
                            <div class="h1 maldives text-success">Proyectos</div>
                        </div>
                        <div class="row g-5 mb-5">
                            <div class="col-12 reveal-item col-md-8">
                                <div class="card card-property overflow-hidden z-zoom-element cursor-pointer" style="background-image:url(../../src/img/home/nayal.png?t=1);">
                                    <div class="mask opacity-100">
                                        <video width="320" class="video-floating" height="240" controls autoplay muted loop>
                                            <source src="../../src/files/video/bg/nayal.mp4" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <div class="h-100 d-flex justify-content-center align-items-center w-100 position-absolute">
                                        <img src="../../src/img/nayal.png?t=1" style="height:20rem" class="opacity-5" alt="wathermark" title="wathermark"/>
                                    </div>

                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white text-xs">Tixkokob, Yucatán.</div>
                                            <div class="text-white h4">Nayal: Visión entre sueños</div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md">
                                <div class="card card-property overflow-hidden z-zoom-element position-relative cursor-pointer" style="background-image:url(../../src/img/home/playaClara.png?t=1);">
                                    <div class="mask opacity-100">
                                        <video class="video-floating" width="320" height="240" controls autoplay muted loop>
                                            <source src="../../src/files/video/bg/playa-clara.mp4" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <div class="h-100 d-flex justify-content-center align-items-center w-100 position-absolute">
                                        <img src="../../src/img/playa-clara.png?t=1" style="height:20rem" class="opacity-5" alt="wathermark" title="wathermark"/>
                                    </div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white text-xs">Santa Clara, Yucatán.</div>
                                            <div class="text-white h4">Conoce Playa Clara</div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class="row g-5">
                            <div class="col-12 reveal-item col-md">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer"  style="background-image:url(../../src/img/home/otoch.png?t=1);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Telchac Pueblo, Yucatán.</div>
                                            <div class="text-white h2">Otoch</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer"  style="background-image:url(../../src/img/home/pandorah.png?t=1);">
                                    <div class="mask bg-gradient-darkx"></div>
                                    <div class="d-flex align-content-end h-100 z-index-3 position-absolute flex-wrap">
                                        <div class="card-body">
                                            <div class="text-white">Chicxulub, Yucatán.</div>
                                            <div class="text-white h2">Pandorah</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 reveal-item col-md">
                                <div class="card overflow-hidden card-property z-zoom-element cursor-pointer"  style="background-image:url(../../src/img/home/kelaya.png?t=1);">
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
            </div>
        </section>


        <section class="animate-section" id="section-2">
            <div class="container">
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12 py-5">
                        <div class="py-5">
                            <div class="h1 maldives mb-n1 text-white">Nuestros</div>
                            <div class="h1 maldives text-success">Afiliados</div>
                        </div>
                        <div class="card overflow-hidden position-relative card-body p-5 bg-dark text-center text-white">
                            <div class="row g-5 align-items-center justify-content-center mb-5">
                                <div class="col-12 col-md-4 animation-fall-down" style="--delay:500ms">
                                    <img src="../../src/img/afilliates/boss.png" class="img-thumbnail rounded" alt="Boss" title="Boss"/>
                                </div>
                                <div class="col-12 col-md-8 animation-fall-down" style="--delay:500ms">
                                    <div class="maldives text-uppercase mb-3 text-white h3">¿Qué nos hace <strong class="text-success">únicos?</strong></div>
                                    <p class="text-white lead my-2">En Universo de Jade, nos destacamos por fomentar el desarrollo personal en nuestra comunidad y ofrecer oportunidades de crecimiento dentro de la empresa basadas en resultados extraordinarios.</p>
                                    <p class="text-white lead my-2">Valoramos el aprendizaje continuo y premiamos el esfuerzo y la dedicación. Además, ofrecemos la posibilidad real de convertirse en un asociado de la empresa para aquellos que demuestran un liderazgo excepcional. </p>
                                    <p class="text-white lead mb-3">Únete a nosotros y sé parte de una empresa que no solo construye desarrollos inmobiliarios excepcionales, sino que también construye carreras y futuros brillantes.</p>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 col-md-4">
                                    <img class="w-100" src="../../src/img/afilliates/back.png" alt="afiliados" title="afiliados"/>
                                </div>
                            </div>
                            <div class="row g-3 justify-content-center mb-3">
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('lets_get_it')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/1.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('aztek')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/2.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('wayak')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/5.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('estrellas_inmobiliarias')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/6.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>

                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('flamingo')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/12.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('aa_capital')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/13.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3 justify-content-center mb-3">
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bm_california')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/7.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 d-none z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bridge')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/8.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bm_virtual')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/9.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bm_centro')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/10.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2 d-none">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/11.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>

                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bm_reno')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/3.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                                <div class="col-6 z-zoom-element cursor-pointer col-md-2" @click="getSponsors('bm_centro')">
                                    <div class="card card-body bg-gray">
                                        <img class="w-100" src="../../src/img/afilliates/4.png" alt="afiliados" title="afiliados"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center py-5 expand" style="--delay:500ms">
                    <div class="col-12">
                        <div class="py-5">
                            <div class="h1 maldives mb-n1 text-white">Nuestra</div>
                            <div class="h1 maldives text-success">Experiencia</div>
                        </div>
                        <div class="card card-body px-5 bg-dark text-center text-white">
                            <div class="row align-items-center text-center">
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.experience}}</div>
                                        
                                        <div class="mt-3">
                                            <div>Años de</div>
                                            <div>experiencia</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.real_state}}</div>

                                        <div class="mt-3">
                                            <div>Desarrollos</div> 
                                            <div>Inmobiliarios</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.sales}}</div>

                                        <div class="mt-3">
                                            <div>Terrenos</div> 
                                            <div>Vendidos</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.countries}}</div>

                                        <div class="mt-3">
                                            <div>Paises</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.families}}</div>

                                        <div class="mt-3">
                                            <div>Familias</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="card card-body bg-transparent p-0 p-md-5 shadow-none">
                                        <div class="h1 text-white sans fw-bold">{{stats.people}}</div>

                                        <div class="mt-3">
                                            <div>Personas impactadas por el movimiento</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
        <section class="bg-dark expand" style="--delay:500ms">
            <div class="container py-5">
                <div class="row align-items-center w-100">
                    <div class="col-12 col-md-6">
                        <p class="text-white h4">Descubre el territorio Jade, nuestra presencia global en Bienes Raíces y los países que han confiado en nosotros.</p>
                    </div>
                    <div class="col-12 col-md-6">
                        <div id="map" style="width: 600px; height: 350px"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5 expand" style="--delay:500ms">
            <div class="container">
                <div class="row justify-content-center py-5">
                    <div class="col-11 col-md-12">
                        <div class="py-5">
                            <div class="h1 maldives mb-n1 text-white"><strong class="text-success">Conoce la opinión</strong> de</div>
                            <div class="h1 maldives text-white">nuestros Clientes</div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div v-for="(testimonial,index) in testimonials" class="carousel-item" :class="index == 0 ? 'active' : ''">
                                <div class="row carousel-container align-items-center justify-content-center">
                                    <div class="col-11">   
                                        <div class="row justify-content-end">   
                                            <div class="col-12 col-md-10 position-relative">   
                                                <div class="position-absolute avatar-floating z-index-1 d-none d-md-block">
                                                    <div class="avatar avatar-xxl">
                                                        <img :src="testimonial.image" class="avatar border-6 avatar-floating border border-white rounded-circle"/>
                                                    </div>
                                                </div>
                                                <div class="d-none d-sm-block d-md-none mb-n5 position-relative z-index-1">
                                                    <div class="d-flex justify-content-center">
                                                        <div class="col-auto">
                                                            <div class="avatar avatar-xl">
                                                                <img :src="testimonial.image" class="avatar avatar-xl border border-white boder-5 rounded-circle"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card card-body bg-dark-image bg-transparent rounded shadow-lg p-5">   
                                                    <div class="row justify-content-end align-items-center">
                                                        <div class="col-12 col-md-11">
                                                            <div class="text-center">
                                                                <h3 class="text-success mb-3">{{testimonial.name}}</h3>
                                                                <div class="mb-5 text-white">
                                                                    <span v-html="testimonial.text"></span>
                                                                </div>
                                                            </div>

                                                            <p class="text-white">{{testimonial.time}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev w-auto" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next w-auto" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <ModalViewer ref="myModal" theme="dark" size="modal-fullscreen" title="Afiliados">
            <div v-if="currentAffiliate" class="position-absolute animation-fall-down d-flex align-items-center top-0 start-0 w-100 h-100 bg-dark-translucid-x text-white" style="--delay:100ms">
                <div id="carouselExampleControls" class="carousel carousel-sponsors w-100 slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div v-for="(affiliate,index) in currentAffiliate" class="carousel-item" :class="index == 0 ? 'active' : ''">
                            <div class="row carousel-container align-items-center justify-content-center">
                                <div class="col-10 col-md-4">   
                                    <div class="row justify-content-end">   
                                        <div class="col-12 position-relative">   
                                            <div class="card bg-transparent rounded overflow-hidden shadow-lg position-relative">   
                                                <img :src="affiliate.image" class="card-img-top"/>

                                                <button type="button" class="btn-close position-absolute top-0 end-0 m-3 mt-3" data-bs-dismiss="modal" aria-label="Close">
                                                    <i class="bi bi-x-lg text-white"></i>
                                                </button>
                                                
                                                <div class="card-body bg-sponsor">   
                                                    <h3 class="text-success mb-1">{{affiliate.name}}</h3>
                                                    <div class="text-white">
                                                        <span v-html="affiliate.text"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="d-none carousel-control-prev w-auto" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="d-none carousel-control-next w-auto" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </ModalViewer>
    `
}

export { HomeViewer }