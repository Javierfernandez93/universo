import { TestViewer } from '../../src/js/testViewer.vue.js?v=1.0.6'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=1.0.6'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')