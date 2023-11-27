import { Translator } from '../../src/js/translator.module.js?v=2.3.5'   
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.5'   
import { RangewidgetViewer } from '../../src/js/rangewidgetViewer.vue.js?v=2.3.5'   
import { PaybusinesswidgetViewer } from '../../src/js/paybusinesswidgetViewer.vue.js?v=2.3.5'   
import { NextlevelwidgetViewer } from '../../src/js/nextlevelwidgetViewer.vue.js?v=2.3.5'   
import { LandingViewer } from '../../src/js/landingViewer.vue.js?v=2.3.5'   
import { MembershipwidgetViewer } from '../../src/js/membershipwidgetViewer.vue.js?v=2.3.5'   
import { ProfitViewer } from '../../src/js/profitViewer.vue.js?v=2.3.5'   
import { MapViewer } from '../../src/js/mapViewer.vue.js?v=2.3.5'   
import { DailyViewer } from '../../src/js/dailyViewer.vue.js?v=2.3.5'   
import { IncomeViewer } from '../../src/js/incomeViewer.vue.js?v=2.3.5'   
import { TeamselectorViewer } from '../../src/js/teamselectorViewer.vue.js?v=2.3.5'   

Vue.createApp({
    components : { 
        ProfitViewer,
        FlyerViewer,
        RangewidgetViewer,
        PaybusinesswidgetViewer,
        NextlevelwidgetViewer,
        LandingViewer,
        MembershipwidgetViewer,
        MapViewer,
        DailyViewer,
        IncomeViewer,
        TeamselectorViewer
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