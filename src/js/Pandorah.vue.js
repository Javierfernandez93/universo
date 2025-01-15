import PandorahViewer from '../../src/js/PandorahViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            PandorahViewer
        },
    })
    app.mount('#app')
}

init()