const BackViewer = {
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            window.history.back()
        },
    },
    mounted() {
        
    },
    /* html */
    template : `
        <button @click="goBack" class="btn btn-sm btn-dark shadow-none mb-0 px-3">
            <i class="fas fa-arrow-left"></i>
        </button>
    `,
}

export { BackViewer } 