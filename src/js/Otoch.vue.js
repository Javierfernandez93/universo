import OtochViewer from '../../src/js/OtochViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            OtochViewer
        },
    })
    app.mount('#app')
}

init()