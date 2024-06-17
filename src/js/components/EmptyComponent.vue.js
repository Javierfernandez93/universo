
const EmptyComponent = {
    props: [],
    emits: [],
    components: {
        // OtherComponentName,
    },
    data(){
        return {
            // myData: null,
        }
    },
    methods: {
        // newMethod() {},
    },
    mounted(){
        // add instructions here
    },
    template: `
        <div>
            My Empty Component
        </div>
    `,
};

export default EmptyComponent;