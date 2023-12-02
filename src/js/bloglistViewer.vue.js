import { User } from '../../src/js/user.module.js?v=2.3.7'   

const BloglistViewer = {
    name : 'bloglist-viewer',
    data() {
        return {
            User: new User,
            entries: null,
            entriesAux: null,
            query: null
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods : {
        filterData()
        {
            this.entries = this.entriesAux
            this.entries = this.entries.filter((entry) =>{
                return entry.title_sanitized.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        goToBlog(entry)
        {
            window.location.href = `../../apps/blog/?bid=${entry.blog_id}`
        },
        getBlogEntries()
        {
            this.User.getBlogEntries({},(response)=>{
                if(response.s == 1)
                {
                    this.entries = response.entries
                    this.entriesAux = response.entries
                }
            })
        }
    },
    mounted() 
    {       
        this.getBlogEntries()
    },
    template : `
        <section class="bg-repeat py-5 expand" style="--delay:500ms" id="section-2">
            <div class="container">
                <div class="card card-body px-5 bg-dark text-white">
                    <div class="row justify-content-center py-5">
                        <div class="col-12 col-xl">
                            <div class="h2 mb-n1 text-uppercase text-white">Nuestro <strong class="text-success">blog</strong></div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input v-model="query" type="text" class="form-control" placeholder="Buscar...">
                        </div>
                    </div>

                    <div v-if="entries">
                        <ul class="list-group bg-transparent list-group-flush">
                            <li v-for="(entry,index) in entries" :class="index < entries.length-1 ? 'border-bottom border-secondary' : ''" class="list-group-item bg-transparent list-item-entry py-3">
                                <div class="row align-items-center">
                                    <div class="col-12 col-md-2">
                                        <img :src="entry.image" :alt="entry.title_sanitized" :alt="entry.title_sanitized" class="w-100 rounded border border-secondary"/>
                                    </div>
                                    <div class="col-12 col-md">
                                        <h3 class="text-white fw-semibold">{{entry.title_sanitized}}</h3>
                                        <div class="mt-3">
                                            <span class="me-5">
                                                {{entry.category}}
                                            </span>
                                            <span class="me-5">
                                                {{entry.time}}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-auto">
                                        <button @click="goToBlog(entry)" class="btn shadow-none mb-0 text-success">Leer Más</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `
}

export { BloglistViewer }