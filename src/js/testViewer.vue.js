import { User } from '../../src/js/user.module.js?v=2.5.0'   

const TestViewer = {
    name : 'test-viewer',
    data() {
        return {
            User : new User,
            status : null,
            INTERVAL_TIMER : 15000,
            interval : null,
            STATUS : {
                0 : {
                    text: '<strong>Importante</strong> Actualmente estamos esperando a que se configure todo de nuestra parte. Por favor ten paciencia.',
                    _class: 'alert-secondary text-white',
                },
                1 : {
                    text: '<strong>Importante</strong> Actualmente estás realizando las pruebas pertinentes para liberar tu cuenta <b>Real</b>. La cual se enviará por WhatsApp y correo electrónico.',
                    _class: 'alert-success text-white',
                },
                2 : {
                    text: '<strong>¡Felicidades!</strong> Ahora tienes una cuenta real, para ir a tu cuenta real por favor da clic <a href="../../apps/full">aquí</a>',
                    _class: 'alert-success text-center text-white',
                },
                3 : {
                    text: 'Expirado',
                    _class: 'alert-danger',
                },
                4 : {
                    text: 'Expirado',
                    _class: 'alert-danger',
                }
            }
        }
    },
    methods: {
        assignStatus() {
            this.status.statusInfo = this.STATUS[this.status.status]
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Done a portapapeles'
            })
        },
        open(url) {
            window.open(url)
        },
        getTestStatus() {
            this.User.getTestStatus({},(response)=>{
                if(response.s == 1)
                {
                    this.status = response.status
                    this.assignStatus()
                } else {
                    this.status = false
                }
            })
        },
    },
    mounted() {
        this.getTestStatus()

        this.interval = setInterval(()=>{
            this.getTestStatus()
        },this.INTERVAL_TIMER)
    },
    template : `
        <div v-if="status">
            <div class="alert" :class="status.statusInfo._class">
                <span v-html="status.statusInfo.text"></span>
            </div>
            <div v-if="status.statusInfo == STATUS[1]" class="card bg-primary">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="mb-3">
                            <span class="badge text-white p-0">Datos de acceso para tu cuenta</span>
                        </div>
                        <div class="mb-3 mb-xl-0 col-6 col-xl">
                            <span class="text-white">{{status.user_name}}</span>
                            <button @click="copy(status.user_name,$event.target)" class="btn ms-2 mb-0 btn-sm shadow-none btn-light px-3">Copy</button>
                        </div>
                        <div class="mb-3 mb-xl-0 col-6 col-xl">
                            <span class="text-white">{{status.password}}</span>
                            <button @click="copy(status.password,$event.target)" class="btn ms-2 mb-0 btn-sm shadow-none btn-light px-3">Copy</button>
                        </div>
                        <div class="mb-3 mb-xl-0 col-12 col-xl-auto">
                            <span class="text-white">{{status.url}} </span>
                            <button @click="open(status.url)" class="btn ms-2 mb-0 btn-sm shadow-none btn-light px-3">Abrir</button>
                            <button @click="copy(status.password,$event.target)" class="btn ms-2 mb-0 btn-sm shadow-none btn-light px-3">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="status == false" class="card">
            <div class="card-body text-center">
                <div>
                    <strong>Aviso</strong>
                </div>
                <div class="mb-3">Aún no tienes ninguna prueba, para comenzar por favor configura tu paquete. </div>
                <a class="btn btn-primary" href="../../apps/store/package">Configurar tu paquete </a>
            </div>
        </div>
    `,
}

export { TestViewer } 