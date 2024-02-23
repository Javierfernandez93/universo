import { User } from '../../src/js/user.module.js?v=2.4.6.1'   

const MentoryViewer = {
    name : 'mentory-viewer',
    data() {
        return {
            User: new User
        }
    },
    methods: {
    },
    mounted() {
      
    },
    template : `
        <div class="row align-items-top">
            <div class="col-12 col-xl-6">
                <div class="row justify-content-start">
                    <div class="col-12">
                        
                    </div>
                </div>
                <div class="card rounded card-body bg-secondary text-white">
                    <div class="lead">
                        <div class="mb-3">
                            Descubre <strong>SiteMentory</strong>, un servicio para <strong>desarrollar tu mentailidad</strong>, hábitos de <strong>éxito</strong> y <strong>liderazgo</strong>. 
                        </div>
                        <div>
                            Aprende a construir comunidades y tener un <b>impacto positivo en la vida de otros</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <div class="ratio ratio-16x9">
                    <iframe class="rounded shadow-xl" width="560" height="315" src="https://www.youtube.com/embed/bcmYoWVtP4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `,
}

export { MentoryViewer } 