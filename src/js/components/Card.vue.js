export default {
    props: ['title','value','myClass'],
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
        <div :class="myClass" class="card card-body border border-light shadow-none">
            <div class="row">
                <div class="col-8">
                    <div class="numbers">
                        <p class="text-sm mb-0 text-capitalize font-weight-bold text-truncate">
                            {{title}}
                        </p>
                        <h5 class="font-weight-bolder mb-0">
                            {{value.numberFormat(0)}}
                        </h5>
                    </div>
                </div>
                <div class="col-4 text-end">
                    <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true" ></i>
                    </div>
                </div>
            </div>
        </div>
    `,
}