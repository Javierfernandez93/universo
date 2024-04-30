
import { MultilevelViewer } from '../../src/js/multilevelViewer.vue.js?v=1.0.5'
import { WidgetlandingViewer } from '../../src/js/widgetlandingViewer.vue.js?v=1.0.5'

Vue.createApp({
    components : { 
        MultilevelViewer, WidgetlandingViewer
    },
}).mount('#app')