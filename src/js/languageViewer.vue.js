import { Translator } from '../../src/js/translator.module.js?v=1.3.0'   

const LanguageViewer = {
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
        selectLanguage(language) {
            this.Translator.changeLanguage(language).then(()=>{
                location.reload()
            })
        }
    },
    async mounted() 
    {       
        await this.Translator.init()
    },
    template : `
        <div class="dropdown">
            <button type="button" class="btn btn-primary mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

            </button>
            <ul class="dropdown-menu shadow">
                <li><button @click="selectLanguage('es')" class="dropdown-item">Spanish</button></li>
                <li><button @click="selectLanguage('en')" class="dropdown-item">English</button></li>
                <li><button @click="selectLanguage('po')" class="dropdown-item">Portugues</button></li>
            </ul>
        </div>
    `
}

export { LanguageViewer }