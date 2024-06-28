export default {
    props: ['busy','title','size','theme'],
    data() {
        return {
            modal: null,
            myTheme : 'white'
        }
    },
    methods: {
        loadModal() {
            if(!this.modal) {
                this.modal = new bootstrap.Modal(this.$refs.modal)
            }
        },
        show() {
            this.loadModal()
            this.modal.show()
        },
        hide() {
            this.loadModal()
            this.modal.hide()
        }
    },
    mounted() {       
        
    },
    template : `
        <Teleport to="body">
            <div class="modal fade" ref="modal" :class="theme == 'dark' ? 'bg-dark' : 'bg-white'" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div :class="size" class="modal-dialog" :class="theme == 'dark' ? 'bg-dark' : 'bg-white'">
                    <div class="modal-content" :class="theme == 'dark' ? 'bg-dark' : 'bg-white'">
                        <div class="modal-header border-0" :class="theme == 'dark' ? 'bg-dark' : 'bg-white'">
                            <h5 class="modal-title" :class="theme == 'dark' ? 'text-white' : 'text-dark'" id="exampleModalLabel">{{title}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x-lg" :class="theme == 'dark' ? 'text-white' : 'text-dark'"></i>
                            </button>
                        </div>
                        <div class="modal-body" :class="theme == 'dark' ? 'bg-dark' : 'bg-white'">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    `,
}