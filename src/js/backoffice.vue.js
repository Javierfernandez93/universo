import { Translator } from '../../src/js/translator.module.js?v=1.0.5'   
import { SellerstatswidgetViewer } from '../../src/js/sellerstatswidgetViewer.vue.js?v=1.0.5'   
import { AdvicewidgetViewer } from '../../src/js/advicewidgetViewer.vue.js?v=1.0.5'   
import { SellerstatschartwidgetViewer } from '../../src/js/sellerstatschartwidgetViewer.vue.js?v=1.0.5'   

Vue.createApp({
    components : { 
        SellerstatswidgetViewer, SellerstatschartwidgetViewer, AdvicewidgetViewer
    },
    data() {
        return {
            Translator: new Translator,
            language_code: null
        }
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language
    },
}).mount('#app')