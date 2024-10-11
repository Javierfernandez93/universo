import SliderViewer from '../../src/js/SliderViewer.vue.js?v=1.1.1'

export default {
    data() {
        return {
            imagesSlider : [
                {
                    title: 'Image 1',
                    className : 'slide-animation-zoom-1',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/nuuktal/1.png',
                },
                 {
                    title: 'Image 2',
                    className : 'slide-animation-zoom-2',
                    sloganClass : 'text-success',
                    path : '../../src/img/slider/nuuktal/2.png',
                 },
                 {
                    title: 'Image 3',
                    className : 'slide-animation-zoom-3',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/nuuktal/3.png',
                },
                {
                    title: 'Image 3',
                    className : 'slide-animation-zoom-3',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/nuuktal/4.png',
                },
                {
                    title: 'Image 3',
                    className : 'slide-animation-zoom-3',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/nuuktal/5.png',
                },
                {
                    title: 'Image 3',
                    className : 'slide-animation-zoom-3',
                    sloganClass : 'text-white',
                    path : '../../src/img/slider/nuuktal/6.png',
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