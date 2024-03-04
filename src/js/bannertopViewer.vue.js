import { User } from '../../src/js/user.module.js?v=2.4.7'   
import { Banner } from '../../src/js/banner.module.js?v=2.4.7'   

const BannertopViewer = {
    name : 'bannertop-viewer',
    props : [],
    emits : [],
    data() {
        return {
            User : new User,
            Banner : new Banner,
            banners : {},
        }
    },
    watch : {
        
    },
    methods: {
        openLinkBanner : function(link) {
            window.open(link)
        },
        getBannersTop : function() {
            return new Promise((resolve,reject) => {
                this.Banner.getBannersTop({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.banners)
                    }

                    reject()
                })
            })
        },
    },
    updated() {
    },
    mounted() 
    {   
        this.getBannersTop().then((banners)=>{
            this.Banner.setBanners(banners)
        })
    },
    template : `
        <div class="row justify-content-center mb-5">
            <div class="col-12">
                <div @click="openLinkBanner(Banner.getLinkBanner(1))" class="card overflow-hidden cursor-pointer">
                    <img :src="Banner.getSourceBanner(1)"/>
                </div>
            </div>
        </div>
    `,
}

export { BannertopViewer } 