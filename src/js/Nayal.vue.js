import NayalViewer from '../../src/js/NayalViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            NayalViewer
        },
    })
    app.mount('#app')
}

init()