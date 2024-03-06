import { User } from '../../src/js/user.module.js?v=2.4.9'   

const MarketingfeedbackViewer = {
    name : 'marketingfeedback-viewer',
    data() {
        return {
            User: new User,
            marketingFields: null,
        }
    },
    methods: {
        getAllMarketingFeedBacks() {
            return new Promise((resolve,reject) => {
                this.User.getAllMarketingFeedBacks({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.marketingFields)
                    }

                    reject()
                })
            })
        },
        getAllMarketingFeedBacksMain() {
            this.getAllMarketingFeedBacks().then((marketingFields)=>{
                this.marketingFields = marketingFields
            }).catch(() => {
                this.marketingFields = false
            })
        },
    },
    mounted() {
        this.getAllMarketingFeedBacksMain()
    },
    template : `
        <div v-if="marketingFields">
            <div v-for="field in marketingFields">
                <div class="row align-items-center mb-3 border-bottom">
                    <div class="col-12 col-xl">
                        <div class="fs-4 fw-semibold text-primary">{{field.title}}</div>
                    </div>
                    <div class="col-12 col-xl">
                        <img :src="field.feedback" :alt="field.title" :title="field.title" class="img-fluid img-thumbnail"/>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <div class="d-flex">
                            <a class="btn btn-primary mb-3 shadown-noe" download :href="field.feedback">Descargar</a>
                        </div>
                        <div class="d-flex">
                            <a class="btn btn-primary mb-3 shadown-noe" :href="field.feedback">Visualizar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="marketingFields == false" class="alert text-white alert-danger text-center fw-semibold">
            Aún no hemos realizado tus imagenes, vuelve más tarde
        </div>
    `,
}

export { MarketingfeedbackViewer } 