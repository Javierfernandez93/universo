import KelayaViewer from '../../src/js/KelayaViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            KelayaViewer
        },
    })
    app.mount('#app')
}

init()