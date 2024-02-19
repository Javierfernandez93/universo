
import { MultilevelViewer } from '../../src/js/multilevelViewer.vue.js?v=2.4.3'
import { WidgetlandingViewer } from '../../src/js/widgetlandingViewer.vue.js?v=2.4.3'

Vue.createApp({
    components : { 
        MultilevelViewer, WidgetlandingViewer
    },
}).mount('#app')