import { User } from '../../src/js/user.module.js?v=2.4.2'   
import { Cookie } from '../../src/js/cookie.module.js?v=2.4.2'

const AuthViewer = {
    name : 'auth-viewer',
    emits : ['authSuccess'],
    data() {
        return {
            User: new User,
            Cookie: new Cookie,
            requestQuery : null,
            key : null,
            canRequestNewToken: true,
            maxTryTimes: 3,
            tryTimes: 3,
            codes: null,
            status: null,
            STATUS: {
                NOT_TOKEN: {
                    code: -1,
                    text: 'Sin token'
                },
                NOT_VALID: {
                    code: 0,
                    text: 'Esperando por código'
                },
                WAITING_FOR_TYPE: {
                    code: 0,
                    _class: 'text-primary',
                    text: 'Enter the code we sent to WhatsApp and e-mail address'
                },
                VALID: {
                    code: 1,
                    _class: 'text-success',
                    text: 'Congratulations the code is valid. Wait a moment...'
                },
                WRONG_CODE: {
                    code: -2,
                    _class: 'text-wanger',
                    text: 'The code is invalid, try again...'
                },
            }
        }
    },
    methods: {
        requestNewAuth(requestQuery) {
            return new Promise((resolve, reject) => {
                this.User.getIpInfo({},(response)=>{
                    this.User.requestNewAuth({requestQuery: requestQuery, region: response.region, ip: response.ip},(response)=>{
                        if(response.s == 1) {
                            resolve(response.token)
                        }
    
                        reject()
                    })
                })
            })
        },
        setAuthToken(token) {
            this.key = token.key
            this.Cookie.setCookie(token.requestQuery, token.key)
        },
        getAuthPair(requestQuery) {
            return this.Cookie.getCookie(requestQuery)
        },
        focusNext(index) {
            if(index < this.codes.length)
            {
                $(`#${index}`).focus()
            } else if(index == this.codes.length) {
                this.validateCode()
            }
        },
        hasValidAuth(requestQuery) {
            console.log("hasValidAuth")

            return new Promise((resolve, reject) => {
                this.key = this.getAuthPair(requestQuery)
                this.requestQuery = requestQuery
    
                if(this.key)
                {
                    this.User.hasValidAuth({key:this.key},(response)=>{
                        if(response.s == 1)
                        {
                            resolve()
                        } else if(response.r == "NOT_VALID") {
                            reject(this.STATUS.NOT_VALID)
                        }
                    })
                } else {
                    reject(this.STATUS.NOT_TOKEN)
                }
            })
        },
        uncodeArray(request) {
            let result = []
            request.split(",").map((value)=>{
                const values = value.split(":")

                result[values[0]] = values[1]
            })

            return result
        },
        singleArray(request) {
            return `i:${request.i},v:${request.v},m:${request.m}`
        },
        codeValidated() { 
            this.status = this.STATUS.VALID
            
            setTimeout(() => {
                this.hideModal()
                this.$emit('authSuccess', {key:this.key,requestQuery:this.uncodeArray(this.requestQuery)})
            }, 2000);
        },
        validateCode() {
            this.User.validateCode({key:this.key,codes:this.codes},(response)=>{
                if(response.s == 1)
                {
                    this.codeValidated()
                } else {
                    this.tryTimes++;

                    if(this.tryTimes >= this.maxTryTimes)
                    {
                        this.canRequestNewToken = true
                    }

                    this.status = this.STATUS.WRONG_CODE
                    this.clearCodes()
                }
            })
        },
        clearCodes() {
            this.codes.map(code => code.value = null)
        },
        requestCode() {
            this.User.getLengthCode({},(response)=>{
                if(response.s == 1)
                {
                    this.codes = response.codes
                    
                    this.status = this.STATUS.WAITING_FOR_TYPE

                    this.showModal()
                }
            })
        },
        requestNewAuthAgain() {
            this.User.expireAuth({key:this.key}, (response) => {
                if(response.s == 1)
                {
                    this.Cookie.clearCookie(this.requestQuery)

                    this.requestAuth(this.requestQuery)
                }
            })
        },
        requestAuth(request) {
            const requestQuery = this.singleArray(request)

            this.hasValidAuth(requestQuery).then((response)=>{
                this.codeValidated()
            }).catch((error)=>{
                if(error == this.STATUS.NOT_TOKEN)
                {
                    this.requestNewAuth(requestQuery).then((token)=>{
                        this.setAuthToken(token)
                        this.requestCode()
                    })
                } else if(error == this.STATUS.NOT_VALID) {
                    this.requestCode()
                }
            })
        },
        hideModal() {
            $(this.$refs.modal).modal('hide')
        },
        showModal() {
            $(this.$refs.modal).modal('show')
        },
        filterData() {
            
        },
    },
    mounted() 
    {       
    },
    template : `
        <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ingresa el código enviado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div v-if="codes" class="modal-body">
                        <div class="row align-items-center vh-100 justify-content-center">
                            <div class="col-10 col-xl-6">
                                <div class="text-center mb-3"><i class="bi text-primary fs-1 bi-lock"></i></div>
                                <div class="row">
                                    <div v-for="(code,index) in codes" class="col">
                                        <input :autofocus="index == 0 ? 'true' : ''" @keyup="focusNext(index+1)" :class="code.value ? 'is-valid' : 'is-invalid'" :id="index" class="form-control form-control-lg fs-3 text-center" v-model="code.value" placeholder=""/>
                                    </div>
                                </div>
                                <div class="lead mt-3 fw-sembold">
                                    <div v-if="status == STATUS.VALID">
                                        <div :class="status._class" class="text-center">{{status.text}}</div>
                                    </div>
                                    <div v-else-if="status == STATUS.WAITING_FOR_TYPE">
                                        <div :class="status._class" class="text-center">{{status.text}}</div>
                                    </div>
                                    <div v-else-if="status == STATUS.WRONG_CODE">
                                        <div :class="status._class" class="text-center">
                                            {{status.text}}
                                            <button @click="requestNewAuthAgain" v-if="canRequestNewToken" class="btn btn-outline-primary ms-2">Request new token</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AuthViewer } 