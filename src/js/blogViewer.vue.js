import { User } from '../../src/js/user.module.js?v=1.0.3'   

const BlogViewer = {
    name : 'blog-viewer',
    data() {
        return {
            User: new User,
            blog: null
        }
    },
    methods : {
        back()
        {
            window.history.back()
        },
        getBlog(blog_id)
        {
            this.User.getBlog({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    this.blog = response.blog
                }
            })
        }
    },
    mounted() 
    {       
        if(getParam("bid"))
        {
            this.getBlog(getParam("bid"))
        }
    },
    template : `
        <div v-if="blog" class="pb-5">
            <section class="d-flex bg-animated position-relative vh-75 align-items-center animate-section" :style="{'background-image':'url('+blog.image_bg+')','--delay':(index*250)+'ms'}">
                <div class="mask-bottom bottom-0 z-index-0 start-0 w-100 position-absolute"></div>
                <div class="container">
                    <div class="row position-relative z-index-1 align-items-end v-100 justify-content-center">
                        <div class="col-10 col-md-8 col-xl-8 text-center text-dark">
                            <div class="h2 text-white">
                                <span class="text-white" v-html="blog.title"></span>
                                <span class="text-white" v-html="blog.sub_title"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container mt-n5">
                <div class="card">
                    <div class="card-header">
                        <button @click="back()" class="btn btn-success shadow-none">Volver</button>
                    </div>
                    <div class="card-body p-5">
                        <span v-html="blog.content"></span>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { BlogViewer }