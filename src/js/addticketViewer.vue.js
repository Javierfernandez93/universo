import { User } from '../../src/js/user.module.js?v=1.0.0'   

const AddticketViewer = {
    name : 'addticket-viewer',
    emits : ['maketicket'],
    data() {
        return {
            User: new User,
            catalogTopics: null,
            ticket: {
                catalog_topic_id: 1,
                subject: null,
                message: null
            },
            ticketComplete: false
        }
    },
    watch : {
        ticket: {
            handler() {
                this.ticketComplete = this.ticket.subject && this.ticket.message
            },
            deep: true,
        }
    },
    methods: {
        toggleMakeTicket()
        {
            this.$emit('togglemaketicket') 
        },
        initEditor()
        {
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'], 
            ];

            this.editor = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });

            this.editor.on('text-change', () => {
                this.ticket.message = this.editor.root.innerHTML
            });
        },
        getCatalogTopic() {
            return new Promise((resolve,reject) => {
                this.User.getCatalogTopic({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.catalogTopics)   
                    }

                    reject()
                })
            })
        },
        addTicket(target) {
            this.User.addTicket(this.ticket, (response) => {
                if (response.s == 1) {
                    target.innerText = 'Ticket creado. Redirgiendo en 3 segundos...'
                    
                    setTimeout(() => {
                        this.$emit('togglemaketicket') 
                    }, 3000);
                }
            })
        },
    },
    mounted() {
        this.initEditor()
        this.getCatalogTopic().then((catalogTopics)=>{
            this.catalogTopics = catalogTopics
        })
    },
    template : `
        <div class="card bg-transparent shadow-none">
            <div class="card-header bg-transparent">
                <div class="row">
                    <div class="col">
                        <button @click="toggleMakeTicket" class="btn btn-dark shadow-none mb-0"><i class="bi bi-arrow-left-short fs-5"></i></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col">
                        <div class="form-floating">
                            <input 
                                :autofocus="true"
                                :class="ticket.subject ? 'is-valid' : ''"
                                @keydown.enter.exact.prevent="$refs.description.focus()"
                                v-model="ticket.subject"
                                id="subject"
                                ref="subject"
                                placeholder="subject"
                                type="text" class="form-control"/>

                            <label for="subject">Asunto</label>
                        </div>
                    </div>
                    <div v-if="catalogTopics" class="col-auto">
                        <div class="form-floating">
                            <select class="form-select" v-model="ticket.catalog_topic_id" id="catalog_topic_id" aria-label="Selecciona tu país">
                                <option v-for="catalogTopic in catalogTopics" v-bind:value="catalogTopic.catalog_topic_id">
                                    {{ catalogTopic.name }}
                                </option>
                            </select>
                            <label for="country_id">Tema</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label>Describe tu problema</label>
                    <div id="editor" style="height:200px"></div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button 
                    :disabled="!ticketComplete"
                    ref="button"
                    class="btn btn-dark mb-0 shadow-none" @click="addTicket($event.target)">
                    Crear ticket
                </button>
            </div>
        </div>        
    `,
}

export { AddticketViewer } 