import { User } from '../../src/js/user.module.js?v=1.0.6'   

const AdvicewidgetViewer = {
    data() {
        return {
            User: new User,
            banners: null
        }
    },
    methods : {
        getBanners(blog_id)
        {
            this.User.getBanners({blog_id:blog_id},(response)=>{
                if(response.s == 1)
                {
                    this.banners = response.banners
                }
            })
        }
    },
    mounted() 
    {       
        this.getBanners()
    },
    template : `
        <div v-if="banners" id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div v-for="(banner,index) in banners" :class="index == 0 ? 'active':''" class="carousel-item">
                    <img :src="banner.image" class="d-block w-100" alt="..." class="item-fixed">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `
}

export { AdvicewidgetViewer }