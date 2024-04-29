import { User } from '../../src/js/user.module.js?v=1.0.4'   

const AtiaccountViewer = {
    name : 'atiaccount-viewer',
    data() {
        return {
            User: new User,
            account: null,
            hasDerivAccount: true,
            CATALOG_BROKER : {
                BRIDGE: 1,
                EXMA: 2
            },
        }
    },
    watch: {
    },
    methods : {
        copyToClipboard(text,target) {   
            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Listo'
            })
        },
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
                                    this.getAtiAccount()
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
        addDerivAccount()
        {
            let alert = alertCtrl.create({
                title: "Importante",
                subTitle: `<div class="text-center mb-3">Añade tu número de cuenta a continuación</div>`,
                inputs: [
                    {
                        type: 'radio',
                        placeholder: 'Test',
                        id: 'test',
                        value: 'test',
                        name: 'deriv_server',
                        label: 'Test account',
                        placeholder: 'Test account',
                        text: 'Test account',
                    },
                    {
                        type: 'radio',
                        placeholder: 'Live',
                        id: 'live',
                        value: 'live',
                        name: 'deriv_server',
                        label: 'Live account',
                        placeholder: 'Live account',
                        text: 'Live account',
                    },
                    {
                        type: 'text',
                        placeholder: 'Login',
                        id: 'deriv_login',
                        name: 'deriv_login',
                    }
                ],
                buttons: [
                    {
                        text: "Añadir cuenta",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            data.deriv_server = $("input[name='deriv_server']:checked").val()

                            if(data.deriv_server)
                            {

                                if(data.deriv_login)
                                {
                                    this.User.addDerivAccount(data,(response)=>{
                                        if(response.s == 1)
                                        {
                                            this.hasDerivAccount = true
                                            this.getAtiAccount()
                                        }
                                    })
                                } else {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'Debes de ingresar un login',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            } else {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: 'Debes de ingresar un servidor',
                                    _class:'bg-gradient-danger text-white'
                                })
                            }
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
        getAtiAccount()
        {
            this.User.getAtiAccount({catalog_broker_id:this.catalog_broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.account = response.account
                    this.hasDerivAccount = response.hasDerivAccount
                }
            })
        }
    },
    mounted() 
    {       
        this.catalog_broker_id = this.CATALOG_BROKER.EXMA

        this.getAtiAccount()
    },
    template : `     

        <div v-if="!hasDerivAccount" class="alert alert-primary text-white text-center">
            <div class="text-white h4">
                ¿Ya tienes cuenta en Deriv?
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-xl-9">
                    <div class="row">
                        <div  class="col-12 col-xl">
                            <button @click="addDerivAccount" type="button" class="btn btn-light mb-0 shadow-none">Registra tu cuenta</button>
                        </div>
                        <div class="col-12 col-xl">
                            <a href="https://track.deriv.com/_bP3GOpozMaIv_52HWb4YL2Nd7ZgqdRLk/1/" target="_blank" type="button" class="btn btn-light mb-0 shadow-none">Abre tu cuenta</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
           
        <div class="row justify-content-center">
            <div class="col-12 col-xl-6">
                <img src="../../src/img/ati.png?v=1.3.6" class="w-100" alt="ati" title="ati"/>
            </div>
        </div>
        
        <div v-if="hasDerivAccount" class="text-center mt-3">
            <div class="card card-body rounded">
                <div class="h3">
                    Cuenta de Deriv registrada 
                </div>
                <div class="row">
                    <div class="col-12 col-xl">
                        <div class="text-xs">Server</div>
                        <div class="h3"> 
                            {{account.deriv_server}} 
                        </div>
                    </div>
                    <div class="col-12 col-xl">
                        <div class="text-xs">Login</div>
                        <div class="h3"> 
                            {{account.deriv_login}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="account" class="row mt-5">
            <div v-if="account.status == 2">
                <div class="h3 mb-3">
                    - Datos de la cuenta
                </div>
                <div class="col-12 col-xl mb-3 mb-xl-0">
                    <div class="card card-body p-4 rounded">
                        <div>
                            <h3>Credenciales VPS</h3>   
                        </div>

                        <div class="mb-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="text-xs">
                                        Usuario
                                    </div> 
                                    <span class="h4">{{account.user}}</span>
                                </div>
                                <div class="col-auto">
                                    <button @click="copyToClipboard(account.user,$event.target)" class="btn mb-0 btn-primary">Copiar</button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="text-xs">
                                    Contraseña
                                    </div> 
                                    <span class="h4">{{account.password}}</span>
                                </div>
                                <div class="col-auto">
                                    <button @click="copyToClipboard(account.password,$event.target)" class="btn mb-0 btn-primary">Copiar</button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="text-xs">
                                    IP
                                    </div> 
                                    <span class="h4">{{account.ip}}</span>
                                </div>
                                <div class="col-auto">
                                    <button @click="copyToClipboard(account.ip,$event.target)" class="btn mb-0 btn-primary">Copiar</button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <div class="text-xs">
                                    Serial key
                                    </div> 
                                    <span class="h4">{{account.serial_key}}</span>
                                </div>
                                <div class="col-auto">
                                    <button @click="copyToClipboard(account.serial_key,$event.target)" class="btn mb-0 btn-primary">Copiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 text-white">
                    <div class="h3 mb-3">
                        - Operan en 4 pasos
                    </div>
                    <div class="d-flex justify-content-center align-items-center mt-5">
                        <div class="progresses">
                            <div class="steps">
                                <span>1</span>
                            </div>

                            <span class="line"></span>

                            <div class="steps">
                                <span>2</span>
                            </div>

                            <span class="line"></span>
                            
                            <div class="steps">
                                <span class="font-weight-bold">3</span>
                            </div>

                            <span class="line"></span>

                            <div class="steps">
                                <span class="font-weight-bold">4</span>
                            </div>

                        </div>   
                    </div>

                    <div class="container row text-center justify-content-center">
                        <div class="col-12 col-xl mb-3 mb-xl-0">
                            <div class="card card-body bg-transparent shadow-none rounded">
                                <div class="lead text-dark fw-sembold">Ingresa al VPS</div>
                            </div>
                        </div>
                        <div class="col-12 col-xl mb-3 mb-xl-0">
                            <div class="card card-body bg-transparent shadow-none rounded">
                                <div class="lead text-dark fw-sembold">Ingresa al grupo de Telegram</div>
                            </div>
                        </div>
                        <div class="col-12 col-xl mb-3 mb-xl-0">
                            <div class="card card-body bg-transparent shadow-none rounded">
                                <div class="lead text-dark fw-sembold">Configura tu asistente</div>
                            </div>
                        </div>
                        <div class="col-12 col-xl mb-3 mb-xl-0">
                            <div class="card card-body bg-transparent shadow-none rounded">
                                <div class="lead text-dark fw-sembold">Comienza a operar</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row align-items-baseline mt-5">
                    <div class="h3 mb-3">
                        - Accesos directo
                    </div>
                    <div class="col-12 col-xl-6">
                        <div class="d-grid"><a href="https://t.me/c/1957081491/7" target="_blank" class="btn btn-lg btn-primary">Grupo Telegram Optimizaciones</a></div>
                        <div class="d-grid"><a href="../../apps/academy/lesson?cid=10" class="btn btn-lg btn-primary">Tutoriales a VPS</a></div>
                    </div>
                    <div class="col-12 col-xl-6">
                        <div class="d-grid"><a href="../../apps/academy/lesson?cid=10" target="_blank" class="btn btn-lg btn-success">Acceso LMS</a></div>
                        <div class="d-grid"><a href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader5.com&utm_campaign=download" target="_blank" class="btn btn-lg btn-success">Descargar MT5 Windows</a></div>
                        <div class="d-grid"><a href="https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.pkg.zip?utm_source=www.metatrader5.com&utm_campaign=download.mt5.macos" target="_blank" class="btn btn-lg btn-success">Descargar MT5 Apple</a></div>
                    </div>
                </div>
            </div>
        </div>

    `
}

export { AtiaccountViewer }