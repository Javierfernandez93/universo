import { User } from '../../src/js/user.module.js?v=1.1.8'   

const RecordViewer = {
    name : 'record-viewer',
    data() {
        return {
            User: new User,
            query: null,
            classesAux: null,
            classes: null,
        }
    },
    watch: {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods : {
        filterData(_class) {
            this.classes = this.classesAux
            this.classes = this.classes.filter((_class)=>{
                return _class.title.toLowerCase().includes(this.query.toLowerCase()) || _class.speaker.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getIntoClass(_class) {
            window.location.href = _class.link
        },
        getRecordClasses() {
            this.User.getRecordClasses({},(response)=>{
                if(response.s == 1)
                {
                    this.classesAux = response.classes
                    this.classes = response.classes
                } else {
                    this.classes = false
                }
            })
        }
    },
    mounted() 
    {       
        this.getRecordClasses()
    },
    /* html */
    template : `
        <div v-if="classes">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-xl">
                            <h3>Clases grabadas</h3>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input type="search" v-model="query" class="form-control" placeholder="Buscar aquí..."/>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="list-group">
                <li v-for="_class in classes" class="list-group-item">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl-auto">
                            <i class="bi h1 bi-laptop-fill"></i>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="h4">
                                {{_class.title}} con {{_class.speaker}}
                            </div>
                            <div class="lead">
                                {{_class.create_date.formatFullDate()}}
                            </div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button @click="getIntoClass(_class)" class="btn mb-0 shadow-none btn-primary">
                                Ingresar
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else-if="classes == false" class="row justify-content-center text-center">
            <div class="col-12 col-xl-4">
                <div class="card card-body">
                    <div class="h4">Aún tenemos no información</div>
                    <div class="h3">Vuelve más tarde</div>
                </div>
            </div>
        </div>
    `
}

export { RecordViewer }