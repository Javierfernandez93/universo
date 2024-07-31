import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.1'

const PropertywidgetViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            property: null,
        }
    },
    methods: {
        getPropertyUserInfo(property_id) {
            this.UserSupport.getPropertyUserInfo({property_id:property_id}, (response) => {
                if (response.s == 1) {
                    this.property = response.property
                }
            })
        },
    },
    mounted() {
        if(getParam("pid")) 
        {
            this.getPropertyUserInfo(getParam("pid"))
        }
    },
    template: `
        <div v-if="property" class="card card-body mb-3">
            <div class="row justify-content-center">
                <div class="col-12 col-md">
                    <div class="text-xs">Propiedad</div>
                    <div class="h4">
                        {{property.title}}
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="text-xs">Propietario</div>
                    <div class="h5 text-capitalize">
                        {{property.names}}
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="text-xs">Desarrolladora</div>
                    <div class="h5 text-capitalize">
                        {{property.real_state}}
                    </div>
                </div>
                <div class="col-12 col-md">
                    <div class="text-xs"># Último pago realizado</div>
                    <div class="h5 text-capitalize">
                        {{property.last_payment_number}}
                    </div>
                </div>
            </div>
        </div>
    `
}

export { PropertywidgetViewer }