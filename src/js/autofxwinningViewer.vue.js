import { Fxwinning } from './fxwinning.module.js?v=1.1.3'   

const AutofxwinningViewer = {
    name : 'autofxwinning-viewer',
    props: ['backoffice'],
    data() {
        return {
            Fxwinning : new Fxwinning,
            filled: true,
            account: null,
            document: null,
            canvas: null,
            sending: false,
            pelData: null,
            signaturePad: null,
            remote: {
                url: null,
                sign_code: null
            },
            loading: false,
            user: {
                sponsor: null,
                title: '',
                email: null,
                names: null,
                month: 3,
                percentage: 35,
                signature: null,
                investor: {
                    number: null
                }
            },
        }
    },
    watch : {
        user : {
            handler() {
              this.filled = this.user.title != null && this.user.names != null && this.user.investor.number != null 
            },
            deep: true
        },
    },
    methods: {
        copyLink(url,target) 
        {
            navigator.clipboard.writeText(url).then(() => {
                target.innerText = 'Copiado'
            });
        },
        sendWhatsApp(url) 
        {
            window.open(`😊 Hola, por favor firma tu documento LPOA dando click aquí 👉 ${url}`.getWhatsappLink())
        },
        sendWhatsAppSupport(url) 
        {
            window.open(`😊 Hola, por favor firma tu documento LPOA dando click aquí 👉 ${url}`.getWhatsappLink())
        },
        generateLinkForSignature() 
        {
            this.Fxwinning.generateLinkForSignature({},(response)=>{
                if(response.s == 1)
                {
                    this.remote.url = response.url
                    this.remote.sign_code = response.sign_code
                }
            })
        },
        getUserSignature() 
        {
            this.Fxwinning.getUserSignature({sign_code:this.remote.sign_code},(response)=>{
                if(response.s == 1)
                {
                    this.user.signature = response.signature
                }
            })
        },
        uploadFile() 
        {
            $(".progress").removeClass("d-none")

            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.Fxwinning.uploadImageSign(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.user.signature = response.target_path
              }
            });
        },
        makeFxWinninDocument() 
        { 
            this.Fxwinning.makeFxWinninDocument(this.user,(response)=>{
              if(response.s == 1)
              {
                this.document = response.path
                this.pelData = response.pelData
              }
            });
        },
        sendPelForEmail() 
        { 
            this.sending = true
            this.Fxwinning.sendPelForEmail(this.pelData,(response)=>{
                this.sending = false

                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: `Hemos enviado su documento correctamente`,
                        _class:'bg-gradient-success text-white'
                    })
                }
            });
        },
        resizeCanvas() {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            
            this.canvas.width = this.canvas.offsetWidth * ratio;
            this.canvas.height = this.canvas.offsetHeight * ratio;
            this.canvas.getContext("2d").scale(ratio, ratio);

            this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
        },        
        clearSignature() 
        {
            this.signaturePad.clear();
        },
        saveSignature() 
        {
            const image = this.signaturePad.toDataURL('image/png');
            
            this.Fxwinning.uploadImageSignAsString({image:image},(response)=>{
                if(response.s == 1)
                {
                    this.user.signature = response.target_path
                }
            })
        },
        initSignature() 
        {
            this.canvas = document.getElementById('signature-pad')

            this.signaturePad = new SignaturePad(this.canvas, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: 'rgb(0, 0, 0)'
            });
        },
        init() 
        {
            setTimeout(()=>{
                this.initSignature()
        
                // window.addEventListener("resize", this.resizeCanvas());
    
                // this.resizeCanvas()
            },1000)
        },
        getSponsorFxWinning(landing) 
        { 
            return new Promise((resolve) => {
                this.Fxwinning.getSponsorFxWinning({landing:landing},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response)
                    } else if(response.r == "NOT_ACCOUNT") {
                        alertInfo({
                            icon:'<i class="bi bi-x"></i>',
                            message: `Primero debes de crear una cuenta en BRIDGE`,
                            _class:'bg-gradient-danger text-white'
                        })
                    }
                })
            })
        },
    },
    mounted() 
    {   
        const landing = getLastUrlPart() ? getLastUrlPart() : 'Site'

        this.getSponsorFxWinning(landing).then((response)=>{
            this.user.sponsor = response.sponsor
            this.user.names = response.account.first_name + ' ' + response.account.last_name
            this.user.email = response.account.email
            this.user.investor.number = response.account.account
            this.user.percentage = response.account.catalog_mam_account_id == 1 ? 20 : 35

            this.init()
        })
    },
    template : `
        <div v-if="user.sponsor" class="row justify-content-center">
            <div v-if="user.sponsor" class="col-12 col-xl-6 animate__animated animate__bounceInRight">
                <div class="row justify-content-center text-center">
                    <div class="col-11 col-xl-10">
                        <div class="card bg-transparent shadow-none text-start shadow p-3">
                            <div class="card-header pb-0 text-left bg-transparent">
                                <div>
                                    <a class="btn btn-outline-primary mb-3" href="../../apps/backoffice">volver a backoffice</a>
                                </div>
                                <h4 class="font-weight-bolder">Genera tu documento LPOA</h4>
                                <h3 class="d-none font-weight-bolder text-info text-gradient">Regístrate con {{user.sponsor.names}}</h3>
                                <h3 class="d-none text-secondary text-xs">(*) campos requeridos</h3>
                            </div>
                            <div class="card-body">
                            {{account}}
                                <div class="row">
                                    <div class="col-12 col-xl-12 mb-3">
                                        <div class="form-floating">
                                            <input 
                                                :class="user.names ? 'is-valid' : 'is-invalid'"
                                                :autofocus="true" id="names" type="text" ref="names" v-model="user.names" class="form-control" @keydown.enter.exact.prevent="$refs.title.focus()" placeholder="Escribe aquí" aria-label="Escribe aquí" aria-describedby="basic-addon1">
                                            <label for="names">* Nombre completo</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-12 mb-3">
                                        <div class="form-floating">
                                            <input 
                                                :class="user.title ? 'is-valid' : 'is-invalid'"
                                                :autofocus="true" id="title" type="text" ref="title" v-model="user.title" class="form-control" @keydown.enter.exact.prevent="$refs.id_number.focus()" placeholder="Escribe aquí" aria-label="Escribe aquí" aria-describedby="basic-addon1">

                                            <label for="title">* Titulo</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-xl-12 mb-3">
                                        <div class="form-floating">
                                            <input 
                                                :class="user.investor.number ? 'is-valid' : 'is-invalid'"
                                                :autofocus="true" id="account" type="number" ref="number" v-model="user.investor.number" class="form-control" @keydown.enter.exact.prevent="$refs.phone.focus()" placeholder="Escribe aquí" aria-label="Escribe aquí" aria-describedby="basic-addon1">

                                            <label for="account">* Account Number (MT5):</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-12 mb-3">
                                        <div class="text-xs text-secondary my-3">El plazo aceptado para la gestión de mi cuenta será:</div>
                                        <div class="form-check">
                                            <input v-model="user.month" class="form-check-input" type="radio" name="month" id="3" value="3" checked>
                                            <label class="form-check-label" for="3">
                                                3 meses
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="user.month" class="form-check-input" type="radio" name="month" id="6" value="6">
                                            <label class="form-check-label" for="6">
                                                6 meses
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="user.month" class="form-check-input" type="radio" name="month" id="12" value="12">
                                            <label class="form-check-label" for="12">
                                                12 meses
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-12 col-xl-12 mb-3 mb-xl-0">
                                        <div class="text-xs text-secondary my-3">El riesgo máximo aceptado para la gestión de mi cuenta será</div>
                                        <div class="form-check">
                                            <input v-model="user.percentage" class="form-check-input" type="radio" name="percentage" id="20" value="20" checked>
                                            <label class="form-check-label" for="20">
                                                20 % (FOREX)
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="user.percentage" class="form-check-input" type="radio" name="percentage" id="35" value="35">
                                            <label class="form-check-label" for="35">
                                                35 % (BTC)
                                            </label>
                                        </div>
                                    </div>
                                </div>


                                <div v-show="filled">
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Hacer firma dígital</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button @click="generateLinkForSignature" class="nav-link" id="pills-remote-tab" data-bs-toggle="pill" data-bs-target="#pills-remote" type="button" role="tab" aria-controls="pills-remote" aria-selected="false">Firma remota</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Subir imagen</button>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <div class="card shadow-none">
                                                
                                                <div class="card-body px-0 d-flex justify-content-center">
                                                    <canvas :class="user.signature ? 'border-success' : 'border-primary'"  class="border rounded-2" id="signature-pad"></canvas>
                                                </div>

                                                <div class="text-center text-xs text-secondary">Dibuja tu firma dentro del recuadro lo más parecido a tu firma oficial</div>

                                                <div class="card-footer">
                                                    <div class="row">
                                                        <div class="col">
                                                            <button @click="saveSignature" class="btn btn-primary btn-sm shadow-none w-100">Guardar firma</button>
                                                        </div>
                                                        <div v-if="user.signature" class="col">
                                                            <button @click="clearSignature" class="btn btn-danger btn-sm shadow-none w-100">Volver a firmar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>
                                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <div class="border rounded-2 text-center cursor-pointer position-relative p-3 mb-3">
                                                <div class="fw-semibold text-dark">
                                                    <span v-text="user.signature ? 'Cambiar firma' : 'Sube tu firma aquí'"></span>
                                                </div>

                                                <div class="text-xs">* formato JPEG con fondo blanco</div>
                                                
                                                <input class="opacity-0 cursor-pointer bg-dark w-100 h-100 start-0 top-0 position-absolute" ref="file" @change="uploadFile($event)" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="pills-remote" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <div v-if="remote.url" class="row align-items-center mb-3">
                                                <div class="col-8">
                                                    <div class="badge text-secondary p-0">Liga para firma remota</div>
                                                    <a :href="remote.url" target="_blank">{{ remote.url }}</a>
                                                </div>
                                                <div class="col-2 d-grid">
                                                    <button @click="copyLink(remote.url,$event.target)" class="btn btn-outline-primary px-3 btn-sm">Copiar</button>
                                                </div>
                                                <div class="col-2 d-grid">
                                                    <button @click="sendWhatsApp(remote.url)" class="btn btn-outline-success px-3 btn-sm"><i class="bi fs-5 bi-whatsapp"></i></button>
                                                </div>
                                            </div>

                                            <div class="alert alert-light text-center">
                                                <div class="mb-3"><strong>¿Ya realizaste tu firma con la liga remota?</strong></div>
                                                <button @click="getUserSignature" class="btn btn-outline-primary px-3 btn-sm">Da click aquí para actualizar</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="user.signature">
                                        <div class="alert alert-info text-center fw-semibold text-white">
                                            <strong>Importante</strong>
                                            <div>
                                                esta será tu firma. Si necesitas cambiarla por favor, intenta de nuevo.
                                            </div>
                                        </div>
                                        <div class="justify-content-center text-center">
                                            <img :src="user.signature.getFullImageSrc()" class="img-fluid img-thumbnail border-primary" title="signature" />
                                        </div>
                                    </div>

                                    <div class="card-footer text-center fw-semibold text-dark">
                                        ¿Tienes dudas? por favor contáctanos <strong @click="sendWhatsAppSupport">aquí</strong>
                                    </div>

                                    <div v-if="user.signature" class="row">
                                        <div class="col">
                                            <button :disabled="!filled || loading" class="btn bg-primary btn-lg shadow-none text-white w-100 mb-0" @click="makeFxWinninDocument" id="button">
                                                <span v-if="!loading">
                                                    Generar documento
                                                </span>
                                                <span v-else>
                                                    <div class="spinner-border" role="status">
                                                        <span class="sr-only"></span>
                                                    </div>
                                                </span>
                                            </button>
                                        </div>
                                        <div v-if="document" class="col">
                                            <a :href="document.getFullDocSrc()" targert="_blank" download class="btn btn-success btn-lg shadow-none text-white w-100 mt-4 mb-0" id="button">
                                                Descargar Archivo
                                            </a>
                                            <button :disabled="sending" @click="sendPelForEmail" class="btn btn-success btn-lg shadow-none text-white w-100 mt-4 mb-0" id="button">
                                                <span v-if="sending">...</span>
                                                <span v-else>
                                                    Enviar por correo
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AutofxwinningViewer } 