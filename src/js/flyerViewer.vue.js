import { User } from '../../src/js/user.module.js';

const FlyerViewer = {
    name : 'flyer-viewer',
    data() {
        return {
            User : new User,
            banners: null,
        }
    },
    methods: {
        goToEvent(banner) {
            window.open(banner.link)
        },
        getBanners() {
            this.User.getBanners({},(response)=>{
                this.banners = response.banners
            })
        }
    },
    mounted() {
        this.getBanners()
    },
    template : `
        <div class="flyer-container gx-0 row justify-content-center mb-5 flyer-container gx-0 row rounded overflow-hidden">
           <div @click="goToEvent(banner)" v-for="banner in banners" class="col-12 col-xl-6 cursor-pointer">
                <img :src="banner.image" class="img-fluid">
            </div>
        </div>
    `,
}

export { FlyerViewer } 