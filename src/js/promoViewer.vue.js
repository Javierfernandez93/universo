import { Translator } from '../../src/js/translator.module.js?v=1.0.1'   

const PromoViewer = {
    data() {
        return {
            Translator: new Translator,
            showing : false
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
        init()
        {
            window.onscroll = () => {
                if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                    $(this.$refs.promo).addClass("show-from-bottom")
                } else {
                    $(this.$refs.promo).removeClass("show-from-bottom")
                    $(this.$refs.promo).addClass("hide-from-bottom")
                }
            }
        },
        toggle()
        {
            this.showing = !this.showing

            $(this.$refs.promoContainer).toggleClass("show-from-bottom")
        }
    },
    mounted() 
    {       
        this.init()
    },
    template : `
        <div ref="promo" class="position-fixed start-0 bottom-0 mx-3 mb-5">
            <div :class="showing ? 'd-none' : ''" @click="toggle">
                <img src="../../src/img/nayal-thumbnail.png" alt="Nayal" class="img-fluid rounded">
            </div> 
        </div>

        <div ref="promoContainer" class="position-fixed start-0 bottom-0 mx-3 mb-5 hide-from-bottom">
            <div class="card card-body">
                <img src="../../src/img/promo/nayal.png" alt="Nayal" class="img-fluid img-thumbnail">
            </div>

            <div class="my-4 fs-1 text-white text-center cursor-pointer" @click="toggle"><i class="bi bi-x-circle"></i></div>
        </div>
    `
}

export { PromoViewer }