import { User } from '../../src/js/user.module.js?v=2.4.4'   

const CoursesViewer = {
    name : 'courses-viewer',
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
        }).catch(() => {
            this.courses = false
        })
    },
    template : `
        <div v-if="courses" class="row">
            <div class="card mb-3">
                <div class="card-header">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <span class="text-secondary">Total {{courses.length}}</span>
                            <div class="fs-4 fw-semibold text-primary">Listado de cursos</div>
                        </div>
                        <div class="col-12 col-xl-6">
                            <input v-model="query" :autofocus="true" type="seach" class="form-control" placeholder="Buscar el curso"/>
                        </div>
                    </div>
                </div>
            </div>

            <div v-for="course in courses" class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl-auto">
                            <div class="avatar avatar-xl">
                                <img :src="course.image" class="avatar avatar-xl" alt="Imagen"/> 
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div class="row position-relative" style="z-index:2">
                                <div class="col">
                                    <div class="h4">
                                        {{course.title}}
                                    </div>
                                    <div class="fw-semibold"><i class="bi bi-person-circle"></i> {{course.names}}</div>
                                </div>
                                <div class="col-auto d-flex align-items-end">
                                    <div class="row">
                                        <div class="col-12">
                                            <button @click="enrollInCourse(course.course_id)" class="btn shadow-none btn-primary mb-0">Ver</button>
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

export { CoursesViewer } 