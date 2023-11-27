import { Translator } from '../../src/js/translator.module.js?v=2.3.4'   

const BlogwidgetViewer = {
    name : 'blogwidget-viewer',
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
        <section class="bg-repeat py-5" id="section-2">
            <div class="container">
                <div class="card card-body px-5 bg-dark text-white">
                    <div class="row justify-content-center py-5">
                        <div class="col-12">
                            <div class="h2 mb-n1 text-uppercase text-white">Nuestro <strong class="text-success">blog</strong></div>
                        </div>
                    </div>

                    <div v-if="entries">
                        <ul class="list-group bg-transparent list-group-flush">
                            <li v-for="(entry,index) in entries" :class="index < entries.length-1 ? 'border-bottom border-secondary' : ''" class="list-group-item bg-transparent list-item-entry py-3">
                                <div class="row align-items-center">
                                    <div class="col-12 col-md-auto">
                                        <img :src="entry.image" :alt="entry.title" :alt="entry.title" class="w-100"/>
                                    </div>
                                    <div class="col-12 col-md">
                                        <h3 class="text-white fw-semibold">{{entry.title}}</h3>

                                        <div class="mt-3">
                                            <span class="me-5">
                                                {{entry.category}}
                                            </span>
                                            <span class="me-5">
                                                {{entry.time}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-auto">
                                        <button class="btn shadow-none mb-0 text-success">Leer Más</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `
}

export { BlogwidgetViewer }