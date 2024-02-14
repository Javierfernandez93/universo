import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.3.9'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.3.9'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')