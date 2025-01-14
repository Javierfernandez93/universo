import SliderViewer from '../../src/js/SliderViewer.vue.js?v=1.1.1'

export default {
    data() {
        return {
            imagesSlider : [
                {
                    title: 'Image 1',
                    className : 'slide-animation-zoom-1',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/kelaya/1.png',
                },
                 {
                    title: 'Image 2',
                    className : 'slide-animation-zoom-2',
                    sloganClass : 'text-success',
                    path : '../../src/img/slider/kelaya/2.png',
                 },
                 {
                    title: 'Image 3',
                    className : 'slide-animation-zoom-3',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/kelaya/3.png',
                }
            ]
        }
    },
    components : { 
        SliderViewer
    },
    template : `
        <SliderViewer logo="../../src/img/logos/nuuktal.png" :imagesSlider="imagesSlider"/>
    `
}