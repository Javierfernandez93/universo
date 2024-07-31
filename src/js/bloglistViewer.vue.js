import { User } from '../../src/js/user.module.js?v=1.1.1'   

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
        <section class="py-6 expand" style="--delay:500ms" id="section-2">
            <div class="container">
                <div class="row align-items-center justify-content-center py-5">
                    <div class="col-12 col-xl">
                        <div class="maldives h2 mb-n1 text-uppercase text-white">Nuestro <strong class="text-success">blog</strong></div>
                    </div>
                    <div class="col-12 col-xl-4">
                        <input :disabled="busy" v-model="query" type="text" class="form-control bg-transparent border-0 lead text-white text-end" placeholder="Buscar por título...">
                    </div>
                </div>
                <div class="card card-body p-0 bg-dark text-white">
                    <div v-if="entries">
                        <ul class="list-group bg-transparent list-group-flush">
                            <li v-for="(entry,index) in entries" :class="index < entries.length-1 ? 'border-bottom border-secondary' : ''" class="list-group-item border-0 bg-transparent list-item-entry mb-3">
                                <div class="row align-items-center">
                                    <div class="col-12 col-md-2">
                                        <img :src="entry.image" :alt="entry.title_sanitized" class="w-100 rounded border border-secondary"/>
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
                                        <button @click="goToBlog(entry)" class="btn shadow-none btn-success mb-0">Leer Más</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="entries" class="text-white p-3">
                    Entradas totales en el blog  {{entries.length}}
                </div>
            </div>
        </section>
    `
}

export { BloglistViewer }