const WidgetinfoViewer = {
    name : 'widgetinfo-viewer',
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() 
    {   
    },
    template : `
        <div class="card bg-gradient-primary rounded shadow">
            <div class="card-body p-0">
                <div class="row align-items-center">
                    <div class="col-12 col-xl p-5">
                        <img src="../../src/img/Site-academy-white.png" alt="image" title="image" class="img-fluid"/>

                        <h3 class="text-white mb-3">+ 500 Horas de clases de trading pregrabadas</h3>

                        <a href="../../apps/academy/academy" class="btn px-0 fs-5 text-lowercase text-white btn-lg mb-0 shadow-none">Descubre más <i class="bi ms-2 bi-arrow-right"></i> </a>
                    </div>
                    <div class="col-12 col-xl-auto d-none d-md-inline">
                        <img src="../../src/img/woman-academy.png" class="img-100 float" alt="telegram-floating" title="telegram-floating"/>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { WidgetinfoViewer } 