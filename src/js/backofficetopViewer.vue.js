const BackofficetopViewer = {
    name : 'backofficetop-viewer',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() 
    {   
        
    },
    template : `
        <div class="row justify-content-center mb-5">
           <div class="col-12">
                <div @click="openLinkBanner(Banner.getLinkBanner(1))" class="card overflow-hidden cursor-pointer">
                    <img :src="Banner.getSourceBanner(1)"/>

                    <span class="position-absolute text-xs p-2 shadow bg-light text-secondary rounded-bottom start-0 ms-2">Anuncio</span>
                </div>
            </div>
        </div>
    `,
}

export { BackofficetopViewer } 