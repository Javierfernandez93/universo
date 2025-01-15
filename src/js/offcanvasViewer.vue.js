const OffCanvasViewer = {
    props: ['busy','title'],
    data() {
        return {
        }
    },
    methods: {
        async loadCanvas()
        {
            if(!this.canvas)
            {
                await sleep (250)
                this.canvas = new bootstrap.Offcanvas(this.$refs.intertnalOffcanvas)
            }
        },
        async show()
        {
            await this.loadCanvas()

            this.canvas.show()
        },
        async hide() {
            await this.loadCanvas()

            this.canvas.hide()
        }
    },
    mounted() 
    {       
        
    },
    /* html */
    template : `
        <Teleport to="body">
            <div class="offcanvas offcanvas-end" ref="intertnalOffcanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">{{title}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <i class="bi bi-x-lg text-dark"></i>
                    </button>
                </div>
                <div class="offcanvas-body">
                    <slot></slot>
                </div>
            </div>
        </Teleport>
    `,
}

export default OffCanvasViewer 