Vue.createApp({
    components: {
        
    },
    data() {
        return {
            
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
          }
    },
    async mounted() {
        await this.init()
    },
}).mount('#app')