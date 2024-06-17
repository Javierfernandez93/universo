import { User } from '../../src/js/user.module.js?v=1.3.8'   

const AcademyViewer = {
    data() {
        return {
            User: new User,
            busy: false,
            query: null,
            courses: null,
            coursesAux: null,
            STATUS : {
                UNPUBLISHED: 0,
                PUBLISHED: 1
            },
            CATALOG_COURSE_TYPE : {
                STANDAR: 1,
                ELITE: 2,
                AGENCY: 3,
            }
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            if (this.query) {
                this.courses = this.coursesAux.filter((course) => {
                    return course.title.toLowerCase().includes(this.query.toLowerCase())
                })
            } else {
                this.courses = this.coursesAux
            }
        },
        goToSessions(course_id) {
            window.location.href = `../../apps/academy/lesson?cid=${course_id}`
        },
        getCoursesList() {
            this.busy = true    
            this.courses = null
            this.coursesAux = null

            this.User.getCoursesList({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.courses = response.courses
                    this.coursesAux = response.courses
                } else {
                    this.courses = false
                    this.coursesAux = false
                }
            })
        },
        enrollInCourse(course_id) {
            this.User.enrollInCourse({course_id:course_id}, (response) => {
                if (response.s == 1) {
                    this.goToSessions(course_id)
                }
            })
        },
    },
    mounted() {
        this.getCoursesList()
    },
    template : `
        
        <div class="card bg-transparent shadow-none card-body mb-3">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl-6">
                    <span v-if="courses" class="badge bg-primary">total cursos {{courses.length}}</span>
                    <h3>Cursos grabados</h3>
                </div>
                <div class="col-12 col-xl-6">
                    <input v-model="query" type="text" class="form-control" placeholder="Buscar curso por nombre"/>
                </div>
            </div>
        </div>
        <div v-if="busy" class="d-flex justify-content-center py-3">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-if="courses" class="row">
            <div class="col-12 col-xl-4" v-for="course in courses">
                <div class="card rounded-normal card-cover mb-3 min-height-300 border-radius-2xl overflow-hidden" :style="{ 'background-image': 'url(' + course.image + ')' }">
                    <div class="card-body row align-items-end text-white">
                        <div class="col-12">
                            <span class="mask opacity-6" :class="course.catalog_course_type_id == CATALOG_COURSE_TYPE.ELITE ? 'bg-primary' :'bg-dark'"></span>
                            
                            <div class="row position-relative" style="z-index:2">
                                <div class="col">
                                    <div>
                                        <span class="badge fw-semibold border mb-3"
                                        :class="course.catalog_course_type_id != CATALOG_COURSE_TYPE.STANDAR ? 'bg-danger text-white border-danger' :'text-light border-light'">
                                            <span v-if="course.catalog_course_type_id != CATALOG_COURSE_TYPE.STANDAR"><i class="bi bi-star-fill"></i></span>
                                            Academia {{course.type}}
                                        </span>
                                    </div>
                                    <div class="fs-5 fw-semibold">
                                        {{course.title}} 
                                    </div>
                                    <div class="fw-semibold"><i class="bi bi-person-circle"></i> {{course.names}}</div>
                                </div>
                                <div class="col-auto d-flex align-items-end">
                                    <div class="row">
                                        <div class="col-12">
                                            <div v-if="!course.isEnrolled">
                                                <button @click="enrollInCourse(course.course_id)" class="btn btn-outline-light mb-0">Unirse a curso</button>
                                            </div>
                                            <div v-else>
                                                <div v-if="course.hasLessonTaked">
                                                    <button @click="goToSessions(course.course_id)" class="btn btn-success mb-0">Continuar</button>
                                                </div>
                                                <div v-else>
                                                    <button @click="goToSessions(course.course_id)" class="btn btn-primary mb-0">Comenzar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="course.hasLessonTaked" class="row pt-3">
                                    <div class="col-12 text-light-50 text-center">
                                        Ultima lección tomada <span class="text-white fw-semibold">{{course.lastCourse.title}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AcademyViewer } 