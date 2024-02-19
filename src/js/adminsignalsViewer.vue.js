import { UserSupport } from '../../src/js/userSupport.module.js?v=2.4.3'

const AdminsignalsViewer = {
    name : 'adminsignals-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            signals: null,
            signalsAux: null,
            busy: false,
            query: null,
            status : null,
            columns: { 
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                email: {
                    name: 'email',
                    desc: false,
                    alphabetically: true,
                },
                balance: {
                    name: 'balance',
                    desc: false,
                },
                account: {
                    name: 'account',
                    desc: false,
                },
                profits: {
                    name: 'profits',
                    desc: false,
                },
            },
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.signals.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.signals = this.signalsAux
            this.signals = this.signals.filter((signal) => {
                return signal.message.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        createTradingSignal() {
            const alert = alertCtrl.create({
                title: "Añadir señal",
                subTitle: ``,
                size: 'modal-fullscreen',
                html: `
                    <div class="row justify-content-center">
                       <div class="col-12">
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="🔵" name="signal" id="forex">
                                    <label class="form-check-label" for="forex">
                                        🔵 Señal Forex
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="🟣" name="signal" id="crypto" checked>
                                    <label class="form-check-label" for="crypto">
                                        🟣 Señal Crypto
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" value="🟢" name="signal" id="syntetics" checked>
                                    <label class="form-check-label" for="syntetics">
                                        🟢 Señal Sintéticos
                                    </label>
                                </div>
                            </div>
                            <div class="form-floating">
                                <textarea id="message" class="form-control" placeholder="mensage" style="height: 300px"></textarea>
                                <label for="floatingTextarea2">Mensaje</label>
                            </div>
                        </div>
                    </div>
                `,
                buttons: [
                    { 
                        text: 'Enviar',
                        handler: data => {
                            console.log($("[name=signal]:checked").val())

                            if($("body #message").val())
                            {
                                const signal = $("[name=signal]:checked").val()
                                let message = $("body #message").val()
                                message = `${signal} \n ${message}`
                               
                                this.UserSupport.createTradingSignal({message:message}, (response) => {
                                    if (response.s == 1) {

                                        alert.modal.dismiss();

                                        this.getAllTradingSingalsMain()

                                        alertInfo({
                                            icon:'<i class="bi bi-ui-checks"></i>',
                                            message: 'Mensaje enviado',
                                            _class:'bg-gradient-success text-white'
                                        })
                                    }
                                })
                            }
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal)
        },
        getAllTradingSingalsMain() {
            this.getAllTradingSingals().then((signals)=>{
                this.signals = signals
                this.signalsAux = signals
            }).catch((err)=>{
                this.signals = false
                this.signalsAux = false
            })
        },
        getAllTradingSingals() {
            this.busy = true
            return new Promise((resolve,reject) => {
                this.busy = false 

                this.UserSupport.getAllTradingSingals({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.signals)
                    }

                    reject()
                })
            })
        },
    },
    mounted() {
        this.getAllTradingSingalsMain()
    },
    template : `
        <div v-if="signals" class="card">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <span class="badge text-secondary p-0">Total {{signals.lenght}}</span>
                        <div class="fs-4 fw-semibold text-dark">
                            Señales enviadas
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button :disabled="busy" class="btn btn-primary mb-0 shadow-none" @click="createTradingSignal">
                            <span v-if="busy">
                                ...
                            </span>
                            <span v-else-if="busy == false">
                                Añadir señal
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr class="text-center align-middle text-xs">
                            <th>#</th>
                            <th>Dado de alta por</th>
                            <th>mensaje</th>
                            <th>Enviado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(signal,index) in signals" class="align-middle text-center text-xs">
                            <td>{{index+1}}</td>
                            <td>{{signal.names}}</td>
                            <td>{{signal.message}}</td>
                            <td>{{signal.create_date.formatFullDate()}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="signals == false" class="card">
            <div class="card-body justify-content-center text-center">
                <button class="btn btn-primary mb-0 shadow-none" @click="createTradingSignal">Añadir señal</button>
            </div>
        </div>
    `,
}

export { AdminsignalsViewer } 