import { User } from '../../src/js/user.module.js?v=2.3.4'   

const ChatViewer = {
    name : 'chat-viewer',
    data() {
        return {
            User: new User,
            bot_name: '',
            SENDER : {
                USER : 1,
                BOT : 2,
            },
            message : {
                message: null,
                create_date: null,
                sender: null,
                items: [],
            },
            messages : [],
            open : false
        }
    },
    methods: {
        init() {
            this.message = {
                message: null,
                create_date: null,
                sender: null,
            }
        },
        getProfitStats() {
            this.User.getProfitStats({},(response)=>{
                if(response.s == 1)
                {
                    this.balance = {...response.balance}
                }
            })
        },
        getChatIaFirstMessage() {
            this.User.getChatIaFirstMessage({},(response)=>{
                if(response.s == 1)
                {
                    this.messages.push({
                        sender: this.SENDER.BOT,
                        create_date: Date.now(),
                        message: response.message.message,
                        items: response.message.items
                    })
                }
            })
        },
        sendMessageAuto(message) {
            this.message.message = message
            this.sendMessage()
        },
        sendMessage() {
            if(this.message.message)
            {
                this.messages.push({
                    sender: this.SENDER.USER,
                    create_date: Date.now(),
                    message: this.message.message
                })

                this.User.getIntentReply({message:this.message.message},(response)=>{
                    this.init()

                    if(response.s == 1)
                    {
                        this.messages.push({
                            sender: this.SENDER.BOT,
                            create_date: Date.now(),
                            message: response.response
                        })
                    }
                    
                    
                    setTimeout(()=>{
                        let message_box = document.getElementById("message_box");
                        message_box.scrollTop = message_box.scrollHeight;
                    },250)
                })
            } else {
                this.$refs.message.focus()
            }
        },
        getProfileShort() {
            return new Promise((resolve,reject) => {
                this.User.getProfileShort({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.profile)
                    }

                    reject()
                })
            })
        },
        getBotName() {
            this.User.getBotName({},(response)=>{
                if(response.s == 1)
                {
                    this.bot_name = response.bot_name
                }
            })
        },
    },
    mounted() 
    {   
        this.getBotName()
        this.getChatIaFirstMessage()
    },
    template : `
        <div class="position-fixed end-0 bottom-0 mb-3 me-3 z-index-3">
            <div v-if="open" class="card rounded chat-ia-box">
                <div class="card-body">
                    <div class="card-header border-bottom">
                        <div class="row align-items-center">
                            <div class="col-auto rounded-circle">
                                <img src="../../src/img/user/user.png" class="avatar avatar" alt="bot" title="bot"/>
                            </div>
                            <div class="col fs-5 fw-sembold text-primary">
                                {{bot_name}}
                            </div>
                            <div class="col-auto">
                                <button @click="open = !open"  class="btn btn-sm px-3 btn-outline-danger shadow-none mb-0"><i class="bi fs-5 bi-x"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body list-messages overflow-scroll" id="message_box">
                        <ul class="list-group list-group-flush">
                            <li v-for="message in messages" class="list-group-item border-0 py-3 animation-fall-down" style="--delay: 500ms;">
                                <div class="d-flex" :class="message.sender == SENDER.BOT ? 'justify-content-start' : 'justify-content-end'">                                
                                    <div class="rounded p-3" :class="message.sender == SENDER.BOT ? 'bg-light text-start text-dark' : 'bg-primary text-end fw-semibold text-white'">
                                        <span class="text-message" v-html="message.message">
                                        </span>
                                    </div>
                                </div>
                                <div v-if="message.items" clas="py-3">
                                    <ul class="list-group list-group-flush">
                                        <li v-for="item in message.items" class="list-group-item text-decoration-underline fw-semibold text-primary text-cursor zoom" @click="sendMessageAuto(item.message)">
                                            {{item.message}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="rounded p-3" :class="message.sender == SENDER.BOT ? 'text-start' : 'text-end'" class="text-xs text-secondary">{{message.create_date.formatFullDate()}}</div>
                                
                                <div class="text-xs text-center text-decoration-underline text-secondary cursor-pointer zoom" v-if="message.sender == SENDER.BOT" @click="sendMessageAuto('Hablar con un experto')">
                                    ¿No fue útil?
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col">
                                <input @keypress.enter.exact="sendMessage" ref="message" type="text" v-model="message.message" :class="message.message ? 'is-valid' : 'is-invalid'" class="form-control"/>
                            </div>
                            <div class="col-auto">
                                <button @click="sendMessage" class="btn mb-0 shadow-none btn-primary">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div @click="open = !open" class="py-3 px-4 zoom cursor-pointer bg-primary shadow rounded text-white">
                    Necesitas ayuda
                </div>
            </div>
        </div>
    `,
}

export { ChatViewer } 