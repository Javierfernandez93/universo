import { User } from '../../src/js/user.module.js?v=2.3.6'   

const AcademyViewer = {
    name : 'academy-viewer',
    data() {
        return {
            User: new User,
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
            this.courses = this.coursesAux

            this.courses = this.courses.filter((course) => {
                return course.title.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        goToSessions(course_id) {
            window.location.href = `../../apps/academy/lesson?cid=${course_id}`
        },
        getCoursesList() {
            return new Promise((resolve,reject) => {
                this.User.getCoursesList({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.courses)
                    }

                    reject()
                })
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
        this.getCoursesList().then((courses)=>{
            this.courses = courses
            this.coursesAux = courses
        })
    },
    template : `
        <div class="card bg-transparent shadow-none card-body mb-3">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-xl-6">
                    <span class="badge bg-primary">total cursos {{coursesAux.length}}</span>
                    <h4>Cursos de Business Academy</h4>
                </div>
                <div class="col-12 col-xl-6">
                    <input v-model="query" type="text" class="form-control" placeholder="Buscar curso por nombre"/>
                </div>
            </div>
        </div>
        <div class="row g-5 align-items-center">
            <div class="col-12 col-xl-4" v-for="course in courses">
                <div class="card rounded zoom-element card-cover mb-3 min-height-300 border-radius-2xl overflow-hidden">
                    <div v-if="course.blocked" class="mask z-index-1 bg-dark d-flex justify-content-center align-items-center">
                        <div class="col-12 text-white text-center">
                            <div class="h4 text-white">
                                Curso bloqueado
                            </div>
                            <div class="lead">
                                Debes de completar <b>{{course.attach_to_course}}</b> primero para poder continuar
                            </div>
                        </div>
                    </div>
                    <img :src="course.image" class="card-img-top">

                    <div class="card-body row align-items-end text-dark">
                        <div class="col-12">
                            <div class="row">
                                <div class="col">
                                    <div>
                                        <span class="badge sans fw-semibold border mb-3" :class="course.catalog_course_type_id != CATALOG_COURSE_TYPE.STANDAR ? 'bg-danger text-dark border-danger' :'bg-light text-dark'">
                                            <span v-if="course.catalog_course_type_id != CATALOG_COURSE_TYPE.STANDAR"><i class="bi bi-star-fill"></i></span>
                                            Academia {{course.type}}
                                        </span>
                                    </div>
                                    <div class="h4 fw-semibold">
                                        {{course.title}} 
                                    </div>
                                    <div>{{course.name}}</div>
                                </div>
                                <div class="fw-semibold my-3"><i class="bi bi-person-circle"></i> {{course.names}}</div>
                                <div v-if="course.hasLessonTaked" class="row pt-3">
                                    <div class="col-12 text-light-50 text-center">
                                        Ultima lección tomada <span class="text-dark fw-semibold">{{course.lastCourse.title}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div v-if="!course.isEnrolled" class="d-grid">
                                        <button @click="enrollInCourse(course.course_id)" class="btn btn-outline-primary mb-0">Enrollarse en curso</button>
                                    </div>
                                    <div v-else>
                                        <div v-if="course.hasLessonTaked" class="d-grid">
                                            <button @click="goToSessions(course.course_id)" class="btn btn-success shadow-none mb-0">Continuar</button>
                                        </div>
                                        <div v-else class="d-grid">
                                            <button @click="goToSessions(course.course_id)" class="btn btn-primary shadow-none mb-0">Continuar</button>
                                        </div>
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