import ImagesSliderModel from '../../src/js/models/imagesSlider.module.js?v=1.1.1'

Vue.createApp({
    components: {
        
    },
    data() {
        return {
            intervalTime : 4000, // 4 seconds
            imagesSlider : ImagesSliderModel,
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
        await this.init()
        
        this.initSlider()

    },
}).mount('#app')