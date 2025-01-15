import SliderViewer from '../../src/js/SliderViewer.vue.js?v=1.1.1'
import ImagesSliderModel from '../../src/js/models/imagesSlider.module.js?v=1.1.1'

export default {
    data() {
        return {
            imagesSlider : ImagesSliderModel
        }
    },
    components : { 
        SliderViewer
    },
    /* html */
    template : `
        <SliderViewer logo="../../src/img/logos/nayal-logo-dark.png" :imagesSlider="imagesSlider"/>
    `
}