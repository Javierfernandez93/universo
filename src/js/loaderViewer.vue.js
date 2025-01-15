const LoaderViewer = {
    props: ['busy'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() 
    {       
     
    },
    /* html */
    template : `
        <div v-if="busy" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>    
        </div>
    `,
}

export default LoaderViewer