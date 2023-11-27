
import { MultilevelViewer } from '../../src/js/multilevelViewer.vue.js?v=2.3.4'
import { WidgetlandingViewer } from '../../src/js/widgetlandingViewer.vue.js?v=2.3.4'

Vue.createApp({
    components : { 
        MultilevelViewer, WidgetlandingViewer
    },
}).mount('#app')