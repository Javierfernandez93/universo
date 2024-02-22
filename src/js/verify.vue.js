import { VerifyViewer } from '../../src/js/verifyViewer.vue.js?v=2.4.6'   
import { Translator } from '../../src/js/translator.module.js?v=2.4.6'   

Vue.createApp({
    components : { 
        VerifyViewer
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