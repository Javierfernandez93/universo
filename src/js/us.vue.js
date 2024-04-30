import { FooterViewer } from '../../src/js/footerViewer.vue.js?v=1.0.5'

Vue.createApp({
    data() {
        return {
            showing: true,
        }
    },
    components : { 
        FooterViewer
    },
    methods: {
        viewVideo(video) {
            alertHtml(`
                <div class="ratio ratio-16x9">
                    <iframe class="embed-responsive-item" src="${video}" allowfullscreen></iframe>
                </div>`
            , 'video', 'modal-fullscreen')
        },
        playVideo()
        {
            console.log(1)
          this.showing = false
          document.getElementById('videoBoss').play();
        }
    },
}).mount('#app')