import { User } from '../../src/js/user.module.js?v=1.1.6'   

const AcademyinfoViewer = {
    name : 'academyinfo-viewer',
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
        <div class="row align-items-top">
            <div class="col-12 col-xl-6">
                <div class="row justify-content-start">
                    <div class="col-12">
                        <img src="../../src/img/Site-academy.png" alt="Academy" title="Academy" class="w-100"/>
                    </div>
                </div>
                <div class="card rounded card-body bg-secondary text-white">
                    <div class="lead">
                        <div class="mb-3">
                            <strong>Academia de trading gratuita</strong>, que te ofrece una amplia gamma de oportunidades para mejorar tus habilidades en los mercados financieros
                        </div>
                        <div>
                            Aprende a construir comunidades y tener un <b>impacto positivo en la vida de otros</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-6">
                <div class="ratio ratio-16x9 d-none">
                    <iframe class="rounded shadow-xl" width="560" height="315" src="https://www.youtube.com/embed/bcmYoWVtP4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="my-3 text-center">
                    <p class="lead fw-semibold text-dark">Únete al canal de Site Academy y accede a clases en vivo y operativa de Índices sintéticos.</p>

                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg shadow-none mb-3"><i class="bi me-2 bi-telegram"></i>Unirse al canal</button>
                    </div>

                    <p class="lead fw-semibold text-dark">Únete al canal de Site y disfruta de las predicciones del mercado de nuestros mentores.</p>
                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg shadow-none mb-0"><i class="bi me-2 bi-telegram"></i> Canal de señales de forex</button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AcademyinfoViewer } 