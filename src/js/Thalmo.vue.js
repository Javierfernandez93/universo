import ThalmoViewer from '../../src/js/ThalmoViewer.vue.js?v=1.1.1'

async function init() {
    const app = Vue.createApp({
        components : { 
            ThalmoViewer
        },
    })
    app.mount('#app')
}

init()