import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.3.8'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.3.8'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')