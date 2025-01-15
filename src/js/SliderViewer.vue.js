export default {
    props : ['imagesSlider','logo'],
    data() {
        return {
            intervalTime : 4000, // 4 seconds
            imagesShowed : [],
            currentImage : {},
        }
    },
    methods: {
        async init() {            
            const elementsToExpand = document.querySelectorAll(".expand")
    
            let expansionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        entry.target.classList.add("animation-fall-down");
                    } else {
                        entry.target.classList.remove("animation-fall-down");
                    }
                })
            })

            elementsToExpand.forEach(element => {
                expansionObserver.observe(element)
            })
        },
        showRandonImage() {
            // if imagesShowed is full then restart 
            if(this.imagesShowed.length >= this.imagesSlider.length) {
                this.imagesShowed = []
            }

            // generating randon int between 0 and imagesSlider.length
            let index = Math.floor(Math.random() * this.imagesSlider.length)

            // validate if index is not already in imagesShowed
            if(this.imagesShowed.includes(index)) {
                this.showRandonImage()
            }

            let image = this.imagesSlider[index]
            
            this.currentImage = image
            console.log(this.currentImage)

            this.imagesShowed.push(index)
        },
        async initSlider() {
            this.showRandonImage()

            setInterval(() => {
                this.showRandonImage()
            
            }, this.intervalTime);
        },
    },
    async mounted() {
        if(this.imagesSlider)
        {
            await this.init()
        
            this.initSlider()
        }
    },
    /* html */
    template : `
        <section class="hero-section m-5 drop-filter-from-top d-flex align-items-end justify-content-start rounded-3 overflow-hidden" :class="currentImage.className" :style="{'background-image':'url('+currentImage.path+')'}">
            <div class="overlay filter-in-top"></div>
            <div class="ms-4 mb-4 mb-xl-6 ms-xl-6 position-absolute">
                <div style="--delay:600ms" class="animation-fall-left text-white display-1 mb-1 mb-xl-n3">
                    <img :src="logo" alt="logo" class="w-25 invert-image">
                </div>
                <div style="--delay:820ms" class="animation-fall-left fw-bold display-6" :class="currentImage.sloganClass"></div>
            </div>
        </section>
    `
}