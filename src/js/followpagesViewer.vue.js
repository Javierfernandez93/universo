import { UserSupport } from './userSupport.module.js?v=1.0.3'   
import LoaderViewer from './loaderViewer.vue.js?v=1.0.3'

const FollowpagesViewer = {
    components : {
        LoaderViewer
    },
    data() {
        return {
            UserSupport : new UserSupport,
            busy : false,
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
            this.busy = true
            this.UserSupport.getFollowPages({user_login_id:user_login_id},(response)=>{
                this.busy = false
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
        <LoaderViewer :busy="busy"/>

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
            <ul v-if="pages" class="list-group list-group-flush">
                <li v-for="page in pages" class="list-group-item">
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