import NuuktalViewer from '../../src/js/NuuktalViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            NuuktalViewer
        },
    })
    app.mount('#app')
}

init()