import { SignupViewer } from '../../src/js/signupViewer.vue.js?v=2.3.8'   
import { Translator } from '../../src/js/translator.module.js?v=2.3.8'   

Vue.createApp({
    components : { 
        SignupViewer
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