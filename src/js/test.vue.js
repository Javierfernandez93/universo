import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.5.0'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.5.0'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')