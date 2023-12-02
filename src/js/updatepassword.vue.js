import { UpdatepasswordViewer } from '../../src/js/updatepasswordViewer.vue.js?v=2.3.7'   
import { Translator } from '../../src/js/translator.module.js?v=2.3.7'   

Vue.createApp({
    components : { 
        UpdatepasswordViewer
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