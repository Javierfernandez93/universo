import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.4.9'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.4.9'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')