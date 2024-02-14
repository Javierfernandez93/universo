import { LoginViewer } from '../../src/js/loginViewer.vue.js?v=2.3.9'   
import { Translator } from '../../src/js/translator.module.js?v=2.3.9'   

Vue.createApp({
    components : { 
        LoginViewer
    },
    data() {
        return {
            Translator: new Translator,
        }
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language
    }
}).mount('#app')