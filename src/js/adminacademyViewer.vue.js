import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.0'
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.1.0'

const AdminacademyViewer = {
    components: {
        LoaderViewer
    },
    data() {
        return {
            UserSupport : new UserSupport,
            busy: false,    
            query : null,
            courses : null,
            coursesAux: null,
            grid : false
        }
    },
    watch : {
        query(){
            this.courses = this.coursesAux.filter((course) => {
                return course.title.toLowerCase().includes(this.query.toLowerCase()) || course.price.toString().includes(this.query)
            })
        },
    },
    methods: {
        toggleGrid() {
            this.grid = !this.grid
        },
        toggleEditingRoute(sheet) {
            sheet.editingRoute = !sheet.editingRoute
        },
        setCourseStatusAs(course,status) {
            this.busy = true    
            this.UserSupport.setCourseStatusAs({course_id:course.course_id,status:status},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    course.status = status

                    toastInfo({
                        message: `Actualizamos tu curso ${course.title}`,
                    })

                    if(status == -1)
                    {
                        this.getCourses()
                    }
                }
            })
        },
        getCourses() {
            this.busy = true
            this.coursesAux = null  
            this.courses = null

            this.UserSupport.getCourses({},(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    this.courses = response.courses
                    this.coursesAux = response.courses
                }

                console.log(this.courses)
            })
        }
    },
    mounted() 
    {   
        this.getCourses()
    },
    template : `
        <LoaderViewer :busy="busy"/>

        <div class="card card-body mb-3">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl">
                    <span class="text-xxs text-secondary">
                        {{courses ? courses.length : 0}} cursos 
                    </span>
                    <div class="h4">Lista de cursos</div>
                </div>
                <div class="col-12 col-xl-auto">
                    <input :disabled="busy" :autofocus="true" v-model="query" type="search" class="form-control" placeholder="Buscar curso por nombre o precio...">
                </div>

                <div class="col-12 col-xl-auto">
                    <button @click="getCourses" class="btn btn-light mb-0 shadow-none">
                        <i class="bi bi-arrow-repeat"></i>
                    </button>
                </div>
                <div class="col-12 col-xl-auto">
                    <a href="../../apps/admin-academy/add" class="btn btn-dark mb-0 shadow-none">
                        Añadir
                    </a>
                </div>
            </div>
        </div>

        <div class="card card-body">
            <div v-if="courses">
                <ul class="list-group list-group-flush list-group-focus">
                    <li v-for="course in courses" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <div class="avatar">
                                    <span class="avatar bg-dark">C</span>
                                </div>
                            </div>
                            <div class="col-12 col-xl">
                                <div>
                                    <span class="badge text-xxs border border-secondary text-secondary me-2">Creado hace {{course.create_date.timeSince()}}</span>

                                    <span v-text="course.status == 1 ? 'Publicado' : 'Despublicado'" :class="course.status == 1 ? 'border border-success text-success' : 'border border-secondary text-secondary'" class="badge text-xxs me-2"></span>
                                    
                                    <span v-if="course.price > 0" class="badge bg-gradient-success me-2">
                                        {{ course.currency }} $ {{ course.price.numberFormat(2) }}
                                    </span>
                                    <span v-else class="badge text-xxs border border-primary text-primary me-2">
                                        Gratis
                                    </span>
    
    
                                    <span class="badge text-xxs border border-dark text-dark">
                                        {{course.type}}
                                    </span>
                                </div>

                                <div class="h4 text-dark">
                                    {{course.title}} 
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="row">
                                    <div class="col">
                                        <i class="bi bi-hand-thumbs-up"></i>
                                        <div class="h4">{{course.like}}</div>
                                    </div>

                                    <div class="col">
                                        <i class="bi bi-chat"></i>
                                        <div class="h4">{{course.comment}}</div>
                                    </div>
                                    
                                    <div class="col">
                                        <i class="bi bi-person"></i>
                                        <div class="h4">{{course.user}}</div>
                                    </div>

                                    <div class="col">
                                        <i class="bi bi-eye"></i>
                                        <div class="h4">{{course.visit}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-dark shadow-none btn-sm px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                    </button>
                                    <ul class="dropdown-menu shadow">
                                        <li><a class="dropdown-item" :href="'../../apps/academy/lesson.php?cid='+course.course_id">Ver previo</a></li>
                                        <li><a class="dropdown-item" :href="'../../apps/admin-academy/edit.php?cid='+course.course_id">Editar</a></li>
                                        <li v-if="course.status == 1"><button class="dropdown-item"@click="setCourseStatusAs(course,0)">Despublicar</button></li>
                                        <li v-if="course.status == 0"><button class="dropdown-item"@click="setCourseStatusAs(course,1)">Publicar</button></li>
                                        <li><button class="dropdown-item"@click="setCourseStatusAs(course,-1)">Eliminar</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
}

export { AdminacademyViewer } 