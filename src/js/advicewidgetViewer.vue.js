import { User } from '../../src/js/user.module.js?v=2.3.7'   

const AdvicewidgetViewer = {
    data() {
        return {
            User: new User,
            banner: null
        }
    },
    methods : {
        getBanners(blog_id)
        {
            this.User.getBanners({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    const random = Math.floor(Math.random() * response.banners.length);

                    this.banner = response.banners[random]
                }
            })
        }
    },
    mounted() 
    {       
        this.getBanners()
    },
    template : `
        <div class="card card-body shadow-none p-0 overflow-hidden">   
            <a :href="banner.link" target="_blank">   
                <img :src="banner.image" class="w-100"/>
            </a>
        </div>
    `
}

export { AdvicewidgetViewer }