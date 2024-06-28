import { User } from '../../src/js/user.module.js?v=1.0.1'   
import { Translator } from '../../src/js/translator.module.js?v=1.0.1'   

const DummieaccountViewer = {
    name : 'dummieaccount-viewer',
    data() {
        return {
            User: new User,
            busy: false,
            account: null,
            CATALOG_BROKER : {
                BRIDGE: 1,
                EXMA: 2
            },
        }
    },
    watch: {
    },
    methods : {
        addExmaAccount()
        {
            let alert = alertCtrl.create({
                title: "Importante",
                subTitle: `<div class="text-center mb-3">Añade tu número de cuenta a continuación</div>`,
                inputs: [
                    {
                        type: 'text',
                        placeholder: 'Número de cuenta',
                        id: 'account',
                        name: 'account',
                    }
                ],
                buttons: [
                    {
                        text: "Añadir cuenta",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {

                            this.User.addExmaAccount({account:data.account},(response)=>{
                                if(response.s == 1)
                                {
                                    this.getDummieAccount()
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal);
        },
        getDummieAccount()
        {
            this.User.getDummieAccount({catalog_broker_id:this.catalog_broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.account = response.account
                } else {
                    this.account = false
                }
            })
        },
        createDummieAccount()
        {
            this.busy = true
            this.User.createDummieAccount({catalog_broker_id:this.catalog_broker_id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-check"></i>',
                        message: '¡Gracias, Hemos creado tu cuenta!',
                        _class:'bg-gradient-success text-white'
                    })

                    this.getDummieAccount()
                }
            })
        }
    },
    mounted() 
    {       
        this.catalog_broker_id = this.CATALOG_BROKER.EXMA

        this.getDummieAccount()
    },
    template : `        
        <div v-if="account" class="row justify-content-center mt-5">
            <div class="col-12 col-xl-6">
                <div class="card card-body rounded text-center">
                    <div class="h4 mb-3">
                        Ingresa a DummieTrading
                    </div>
                    <div class="lead mb-3">
                        Da click en el siguiente enlace
                    </div>

                    <a class="btn btn-round btn-lg btn-primary mb-0 shadow-none" :href="account.loginUrl" target="_blank">Ingresar a tu cuenta</a>
                </div>
            </div>
        </div>
        <div v-else-if="account == false" class="row justify-content-center mt-5">
            <div class="col-12 col-xl-6">
                <div class="card card-body rounded overflow-hidden text-center"  style="background-image:url(../../src/img/bg-colorfull.png)">
                    <span class="mask"></span>
                    
                    <div class="position-relative z-index-1">
                        <div class="h4 mb-3">
                            Crea tu cuenta en
                        </div>
                        <div class="h3 mb-3">
                            DummieTrading
                        </div>

                        <button :disabled="busy" @click="createDummieAccount" class="btn btn-round btn-lg btn-primary mb-0 shadow-none" target="_blank">
                            <span v-if="busy">
                                <div class="spinner-grow spinner-grow-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else>
                                Crear mi cuenta
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    `
}

export { DummieaccountViewer }