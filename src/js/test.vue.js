import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.3.6'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.3.6'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')