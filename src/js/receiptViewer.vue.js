import { Receipt } from './receipt.module.js?v=1.1.1'   

const ReceiptViewer = {
    props: ['backoffice'],
    data() {
        return {
            Receipt : new Receipt,
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
                file: null,
                title: '',
                email: null,
                names: null,
                commission_per_user_id: 0,
                signature: null
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
            this.Receipt.generateLinkForSignature({},(response)=>{
                if(response.s == 1)
                {
                    this.remote.url = response.url
                    this.remote.sign_code = response.sign_code
                }
            })
        },
        getUserSignature() 
        {
            this.Receipt.getUserSignature({sign_code:this.remote.sign_code},(response)=>{
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
          
            this.Receipt.uploadImageSign(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.user.signature = response.target_path
              }
            });
        },
        signCommissionFile() 
        { 
            this.Receipt.signCommissionFile(this.user,(response)=>{
              if(response.s == 1)
              {
                alertInfo({
                    icon:'<i class="bi bi-ui-checks"></i>',
                    message: `Ha firmado su recibo correctamente. Gracias, redireccionado`,
                    _class:'bg-gradient-success text-white'
                })

                setTimeout(()=>{
                    window.location.href = `../../apps/commissions/`
                },3000)
              }
            });
        },
        sendPelForEmail() 
        { 
            this.sending = true
            this.Receipt.sendPelForEmail(this.pelData,(response)=>{
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
            
            this.Receipt.uploadImageSignAsString({image:image},(response)=>{
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
            },1000)
        },
        getCommissionReceipt(commission_per_user_id) 
        {
            return new Promise((resolve)=>{
                this.Receipt.getCommissionReceipt({commission_per_user_id:commission_per_user_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.file)
                    }
                })
            })
        },
    },
    mounted() 
    {   
        if(getParam("cpuid"))
        {
            this.getCommissionReceipt(getParam("cpuid")).then((file)=>{
                this.user.commission_per_user_id = getParam("cpuid")
                this.user.file = file

                this.init()
            })
        }
    },
    template : `
        <div v-if="user" class="row justify-content-center">
            <div v-if="user.file" class="col-12 col-xl-6 animate__animated animate__bounceInRight">
                <div class="row justify-content-center text-center">
                    <div class="col-11 col-xl-10">
                        <div class="card bg-transparent shadow-none text-start shadow p-3">
                            <div class="card-header pb-0 text-left bg-transparent">
                                <div>
                                    <a class="btn btn-primary px-3 shadow-none mb-3" href="../../apps/backoffice">volver a oficina virtual</a>
                                </div>
                                <h4 class="font-weight-bolder">Firma tu recibo</h4>

                                <img :src="user.file" class="img-fluid">
                            </div>
                            <div class="card-body">
                                <div>
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

                                    <div v-if="user.signature" class="mt-3">
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
                                            <button :disabled="loading" class="btn bg-primary btn-lg shadow-none text-white w-100 mb-0" @click="signCommissionFile" id="button">
                                                <span v-if="!loading">
                                                    Firmar recibo
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

export { ReceiptViewer } 