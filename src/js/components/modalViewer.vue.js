const ModalViewer = {
    props: ['busy','title','size'],
    data() {
        return {
            modal: null,
        }
    },
    methods: {
        loadModal()
        {
            if(!this.modal)
            {
                this.modal = new bootstrap.Modal(this.$refs.modal)
            }
        },
        show()
        {
            this.loadModal()

            this.modal.show()
        },
        hide() {
            this.loadModal()

            this.modal.hide()
        }
    },
    mounted() 
    {       
        
    },
    /* html */
    template : `
        <Teleport to="body">
            <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div :class="size" class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x-lg text-dark"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    `,
}

export default ModalViewer