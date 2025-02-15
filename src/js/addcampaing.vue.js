/* vue */
import { AddcampaignViewer } from '../../src/js/addcampaignViewer.vue.js?v=1.1.8'
import { CountryViewer } from '../../src/js/countryViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        AddcampaignViewer, CountryViewer
    },
    data() {
        return {
            viewcountries: false
        }
    },
    watch: {
    },
    methods: {
        toggleViewCountries: function()
        {
            this.viewcountries = !this.viewcountries
        },
        addCountry: function(country)
        {
            this.$refs.campaign.addCountry(country)
        },
        deleteCountry: function(country)
        {
            this.$refs.campaign.deleteCountry(country)
        },
        goToAddCampaign: function()
        {
            window.location.href = '../../apps/banner/addCampaign'
        }
    },
    mounted() {
    },
}).mount('#app')