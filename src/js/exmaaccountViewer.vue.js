import { User } from '../../src/js/user.module.js?v=2.4.7'   
import { Translator } from '../../src/js/translator.module.js?v=2.4.7'   

const ExmaaccountViewer = {
    name : 'exmaaccount-viewer',
    data() {
        return {
            User: new User,
            userAccounts: null,
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
                                    this.getAllUserBridgeAccounts()
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
        getAllUserBridgeAccounts()
        {
            this.User.getAllUserBridgeAccounts({catalog_broker_id:this.catalog_broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.userAccounts = response.userAccounts
                }
            })
        }
    },
    mounted() 
    {       
        this.catalog_broker_id = this.CATALOG_BROKER.EXMA

        this.getAllUserBridgeAccounts()
    },
    template : `
        <div class="alert alert-primary text-white text-center">
            <div class="text-white h4">
                ¿Ya tienes cuenta en Exma Trading?
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-xl-9">
                    <div class="row">
                        <div class="col-12 col-xl">
                            <button @click="addExmaAccount" type="button" class="btn btn-light mb-0 shadow-none">Registra tu cuenta</button>
                        </div>
                        <div class="col-12 col-xl">
                            <a href="../../apps/exma/sign" type="button" class="btn btn-light mb-0 shadow-none">Abre tu cuenta</a>
                        </div>
                        <div class="col-12 col-xl">
                            <a href="../../apps/store/package?cptid=5" type="button" class="btn btn-light mb-0 shadow-none">Depositar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="userAccounts" class="mt-5">
            <div class="h3 mb-3">Cuentas en Exma</div>
            <table class="table table-bordered">
                <thead>
                    <tr class="text-center">
                        <th>#Cuenta</th>
                        <th>Producto</th>
                        <th>Saldo USD</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="account in userAccounts" class="text-center lead align-middle">
                        <td>{{account.account}}</td>
                        <td>{{account.type}}</td>
                        <td class="fw-bold">$ {{account.balance}} USD </td>
                        <td>
                            <div>
                                <a href="../../apps/aof/" class="btn btn-primary mb-1 shadow-none">Firmar AOF</a>
                            </div>
                            <div class="d-none">
                                <button class="btn btn-success mb-0 shadow-none">Ver mi AOF</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    `
}

export { ExmaaccountViewer }