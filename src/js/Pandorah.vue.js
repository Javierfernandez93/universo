import PandoraViewer from '../../src/js/PandoraViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            PandoraViewer
        },
    })
    app.mount('#app')
}

init()