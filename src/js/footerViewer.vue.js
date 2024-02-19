import { Translator } from '../../src/js/translator.module.js?v=2.4.2'   

const FooterViewer = {
    name : 'footer-viewer',
    data() {
        return {
            Translator: new Translator,
            language_code: null,
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
            entries : [
                {
                    title: 'Apertura - Nueva etapa',
                    image: '../../src/img/entry/1.png',
                    category: 'Desarrollos',
                    time: '09.12.2023'
                },
                {
                    title: 'Como funciona un Biodigestor',
                    image: '../../src/img/entry/1.png',
                    category: 'Desarrollos',
                    time: '09.12.2023'
                },
                {
                    title: 'Tren maya Diciembre',
                    image: '../../src/img/entry/1.png',
                    category: 'Desarrollos',
                    time: '09.12.2023'
                },
                {
                    title: 'Festival de sabores - Yucatán',
                    image: '../../src/img/entry/1.png',
                    category: 'Desarrollos',
                    time: '09.12.2023'
                }
            ]
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
        
    },
    mounted() 
    {       
        
    },
    template : `
        <footer class="bg-dark py-5 expand" style="--delay:500ms">
            <div class="pb-4 mb-4 border-bottom border-secondary">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-8">
                            <div class="h1 text-white pb-5">
                                <div class="">Descubre la magia del jade.</div>
                                <div class="">y sumérgete en nuestro universo</div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 text-end">
                            <a href="../../apps/home/about" class="btn btn-success px-5 py-3">SOMOS</a>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-12 col-md-8">
                            <div class="row gx-5">
                                <div class="col-12 col-md-auto">
                                    <div class="text-secondary text-xs">CONTACTO </div>
                                    <div class="text-white">+52 999 999 99 99</div>
                                </div>
                                <div class="col-12 col-md">
                                    <div class="text-secondary text-xs">EMAIL</div>
                                    <div class="text-white">INFO@UNIVERSODEJADE.COM</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 text-end">
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12 col-md-8">
                        <div class="row gx-5">
                            <div class="col-12 col-md-auto">
                                <div class="text-white">CONTÁCTANOS</div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="text-white">POLITICA DE PRIVACIDAD</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 text-end text-white">
                        Universo de Jade <n class="text-secondary">- Todos los derechos reservados</n>
                    </div>
                </div>
            </div>
        </footer>
    `
}

export { FooterViewer }