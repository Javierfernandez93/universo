import { UserSupport } from '../../src/js/userSupport.module.js?v=2.5.0'   

const AdminblogViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            entries: null,
            entriesAux: null,
            query: null,
            columns: { // 0 DESC , 1 ASC 
                blog_id : {
                    name: 'blog_id',
                    desc: true,
                },
                title : {
                    name: 'title',
                    desc: false,
                    alphabetically: true,
                },
                notice : {
                    name: 'notice',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    methods : {
        getAdminBlogs(blog_id)
        {
            this.entries = null
            this.entriesAux = null

            this.UserSupport.getAdminBlogs({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    this.entries = response.entries
                    this.entriesAux = response.entries
                } else {
                    this.entries = false
                    this.entriesAux = false

                }
            })
        },
        setEntryStatusAs(blog,status) {
            this.UserSupport.setEntryStatusAs({blog_id:blog.blog_id,status:status}, (response) => {
                if (response.s == 1) {
                    blog.status = status

                    if(blog.status == '1')
                    {
                        toastInfo({
                            message: 'Blog publicado',
                        })
                    } else if(blog.status == '0') {
                        toastInfo({
                            message: 'Blog despublicado',
                        })
                    } else if(blog.status == '-1') {
                        toastInfo({
                            message: 'Blog eliminado',
                        })
                    }
                }
            })
        },
    },
    mounted() 
    {       
        this.getAdminBlogs(getParam("bid"))
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="blogs" class="badge text-secondary p-0">Total {{blogs.length}}</span>
                                <div class="h4">
                                    Blog
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div><a href="../../apps/admin-blog/add" type="button" class="btn shadow-none mb-0 btn-success btn-sm">Añadir entrada</a></div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>
                    </div>
                    <div v-if="entries" class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th @click="sortData(columns.blog_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.blog_id">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">ID</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.title)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Título</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="entry in entries">
                                        <td class="align-middle text-center text-sm">
                                            <p class="font-weight-bold mb-0">{{entry.blog_id}}</p>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <div>
                                                        <span class="badge bg-gradient-success text-xxs" v-if="entry.status == '1'">Publicada</span>
                                                        <span class="badge bg-gradient-secondary text-xxs" v-else-if="entry.status == '0'">Sin publicar</span>
                                                    </div>

                                                    <h6 class="mb-0 text-sm">
                                                        <span v-html="entry.title.removeHtmlTags()"></span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-xs text-dark mb-0">{{entry.create_date.formatDate()}}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-dark mb-0 shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li v-if="entry.status == '1'">
                                                        <button class="dropdown-item" @click="setEntryStatusAs(entry,1)">Habilitar entrada</button>
                                                    </li>
                                                    <li v-if="entry.status == '2'">
                                                        <button class="dropdown-item" @click="setEntryStatusAs(entry,0)">Deshabilitar entrada</button>
                                                    </li>
                                                
                                                    <li>
                                                        <button class="dropdown-item" @click="setEntryStatusAs(entry,-1)">Eliminar</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else-if="entries == false" class="card-body">
                        <div class="alert alert-secondary text-white text-center">
                            <div>No tenemos News aún</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdminblogViewer }