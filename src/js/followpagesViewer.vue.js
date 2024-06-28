import { UserSupport } from './userSupport.module.js?v=1.0.1'   

const FollowpagesViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            pages: null,
            total : 0
        }
    },
    watch : {
        banner : {
            handler() {
              this.filled = this.banner.title && this.banner.link.isValidLink() && this.banner.image
            },
            deep: true
        },
    },
    methods: {
        getFollowPages(user_login_id) 
        {
            this.UserSupport.getFollowPages({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.pages = response.pages
                    response.pages.map((page)=>{
                        this.total += page.visits
                    })
                }
            })
        },
    },
    mounted() 
    { 
        if(getParam("ulid"))
        {
            this.getFollowPages(getParam("ulid"))
        } 
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl"> 
                        <span class="h5">Páginas visitadas</span>
                    </div>
                    <div class="col-12 col-xl-auto text-end"> 
                        <div class="text-xs text-secondary">Total de visitas</div>
                        <div class="h5">{{total}}</div>
                    </div>
                </div>
            </div>
            <div v-if="pages">
                <div v-for="page in pages" class="card card-body">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <div class="text-xs text-secondary">Página</div>
                            <div class="h5">
                                {{page.page}}
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="text-xs text-secondary">Ruta</div>
                            <div class="h5 text-primary text-decoration-underline">
                                {{page.route}}
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="text-xs text-secondary">Tipo</div>
                            <div class="h5">
                                {{page.description}}
                            </div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <div class="text-xs text-secondary">Fecha</div>
                            <div class="h5">
                                {{page.create_date.formatFullDate()}}
                            </div>
                        </div>
                        <div class="col-12 col-xl text-end">
                            <div class="text-xs text-secondary">Visitas</div>
                            <div class="h5">
                                {{page.visits}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { FollowpagesViewer } 