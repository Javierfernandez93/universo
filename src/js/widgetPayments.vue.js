import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.6'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.6'
import PlaceHolder from '../../src/js/components/PlaceHolder.vue.js?v=1.1.6'
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.1.6' 
import Card from '../../src/js/components/Card.vue.js?v=1.1.6'
import ModalViewer from '../../src/js/modalViewer.vue.js?v=1.1.6'

const WidgetPayments = {
    components: {
        LoaderViewer,
        PlaceHolder,
        HighLigth,
        ModalViewer,
        Card
    },
    data() {
        return {
            UserSupport: new UserSupport,
            payments: [],
            payment: null,
        }
    },
    methods: {
        showPaymentsResume(catalog_payment_type_id) {
            this.$refs.myModal.show()

            this.getPaymentResumeExtend(catalog_payment_type_id)
        },
        getPaymentResumeExtend(catalog_payment_type_id) {
            this.busy = true
            this.UserSupport.getPaymentResumeExtend({catalog_payment_type_id:catalog_payment_type_id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.payment = response.payment
                } 
            })
        },
        getStatsPaymentsResume() {
            this.busy = true
            this.catalogPaymentTypes = []
            this.UserSupport.getStatsPaymentsResume({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.payments = response.payments
                } 
            })
        },
    },
    mounted() {
        this.getStatsPaymentsResume()
    },
    template: `
        <div v-if="payments.length > 0" class="row">
            <div v-for="payment in payments" class="col-12 col-md">
                <Card myClass="card-hover cursor-pointer" :title="payment.title ? payment.title : '-'" @click="showPaymentsResume(payment.catalog_payment_type_id)" :value="payment.total"/>
            </div>
        </div>

        <ModalViewer ref="myModal" size="modal-fullscreen" title="Resumen">
            <LoaderViewer :busy="busy"/>

            <div v-if="payment" class="container">
                <div v-for="affiliation in payment" class="card card-hover border border-light mb-3 overflow-hidden">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-xs">Afiliación</div>
                                <div class="h5 text-capitalize">
                                    {{affiliation.name}}
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto text-end">
                                <div class="text-xs text-xs">Total de clientes</div>
                                <div class="h5 text-capitalize">
                                    {{affiliation.total}} 
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-break-word table-borderless table-hover">
                        <thead>
                            <tr class="text-xs text-secondary">
                                <th class="border-end">
                                    <i class="bi text-dark bi-person-circle"></i>
                                    Vendedor
                                </th>
                                <th>
                                    <i class="bi text-dark bi-hash"></i>
                                    Afiliación
                                </th>
                                <th>
                                    <i class="bi text-dark bi-hash"></i>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="seller in affiliation.sellers" class="text-dark">
                                <td class="px-4 border-end fw-bold text-dark align-middle">
                                    <PlaceHolder empty="true" :value="seller.names" type="text" />
                                </td>
                                <td class="px-4 text-xs align-middle">
                                    <PlaceHolder empty="true" :value="seller.name" type="text" />
                                </td>
                                <td class="px-4 text-xs align-middle">
                                    <PlaceHolder empty="true" :value="seller.total" type="text" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ModalViewer>
    `
}

export { WidgetPayments }