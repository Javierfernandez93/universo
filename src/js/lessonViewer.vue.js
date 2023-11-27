import { User } from '../../src/js/user.module.js?v=2.3.4'   

const LessonViewer = {
    name : 'lesson-viewer',
    data() {
        return {
            User: new User,
            fullMode: false,
            sessions: null,
            progress: {
                total: 0,
                percentage: 0,
                taked: 0
            },
            SENTIMENT: {
                POSITIVE : 1,
                NEGATIVE : 0,
            },
            comment: {
                course_id: null,
                comment: null,
            },
            course: null,
            STATUS : {
                UNPUBLISHED: 0,
                PUBLISHED: 1
            },
            CATALOG_MULTIMEDIA : {
                TEXT: 1,
                AUDIO: 2,
                VIDEO: 3,
                HTML: 4,
            }
        }
    },
    methods: {
        filterData() {
            this.courses = this.campaignsAux

            this.courses = this.courses.filter((campaign) => {
                return campaign.name.toLowerCase().includes(this.query.toLowerCase()) 
            })
        },
        getProgress() {
            let taked = 0
            
            if(this.sessions.length > 0) 
            {
                this.sessions.map((session)=>{
                    if(session.sessionTaked != false)
                    {
                        taked ++;
                    }
                })
            }

            this.progress = {
                total: this.sessions.length,
                finished: this.sessions.length == taked,
                percentage: Math.round((taked*100) / this.sessions.length),
                taked: taked
            }
        },
        getSessionPerCourse(session_take_by_user_per_course_id) {
            return new Promise((resolve,reject) => {
                this.User.getSessionPerCourse({session_take_by_user_per_course_id:session_take_by_user_per_course_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.course)
                    }

                    reject()
                })
            })
        },
        getSession(order_number) {
            return this.sessions.filter(session => {
                return session.order_number == order_number
            })[0]
        },
        selectSession(session) {
            this.course.session = session

            if(this.course.session.catalog_multimedia_id == this.CATALOG_MULTIMEDIA.VIDEO)
            {
                if(this.course.session.course.isValidVimeoUrl())
                {
                } else if(this.course.session.course.isValidYoutubeUrl()) {

                } else {
                    this.$refs.video.load();
                }
            }
        },
        nextSesssion() {
            this.setSessionAsTaked(this.course.session).then((sessionTaked) => {
                if(sessionTaked)
                {
                    let session = this.getSession(this.course.session.order_number)

                    session.sessionTaked = sessionTaked
                }

                const nextOrder = this.course.order_number+1 <= this.sessions.length ? this.course.order_number+1 : this.course.order_number

                this.selectSession(this.getSession(nextOrder))

                this.getProgress()
            })
        },
        showCourseFinished(course) {
            alertInfo({
                icon:'<i class="bi bi-ui-checks"></i>',
                size: 'modal-fullscreen',
                message: `
                    <div class="h3 text-white">¡Felicidades!</div>
                    <div class="lead">Has terminado el curso</div>
                    <div class="h1 text-white">${course.title}</div>
                    <div class="mt-3"><a href="../../apps/academy/">Vuelve a tu academia</a></div>
                `,
                _class:'bg-gradient-success text-white'
            })
        },
        setSessionAsTaked(session) {
            return new Promise((resolve) => {
                this.User.setSessionAsTaked({session_per_course_id:session.session_per_course_id,course_id:this.course.course_id}, (response) => {
                    if (response.s == 1) {
                        if(response.finished) {
                            this.showCourseFinished(this.course)
                        }

                        resolve(response.sessionTaked)
                    } else {
                        resolve(false)
                    }
                })
            })
        },
        getSessionsCourse(course_id) {
            return new Promise((resolve,reject) => {
                this.User.getSessionsCourse({course_id:course_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.sessions)
                    }

                    reject()
                })
            })
        },
        rankCourse(positive) {
            this.User.rankCourse({positive:positive,course_id:this.course.course_id}, (response) => {
                if (response.s == 1) {
                    this.course.hasRank = true
                }
            })
        },
        commentCourse() {
            this.User.commentCourse(this.comment, (response) => {
                if (response.s == 1) {
                    this.course.hasComment = true
                }
            })
        },
        getCourse(course_id) {
            return new Promise((resolve,reject) => {
                this.User.getCourse({course_id:course_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.course)
                    }

                    reject()
                })
            })
        },
        getLastOrder() {
            let order_number = 1
            this.sessions.map((session) => {
                if(session.sessionTaked)
                {
                    order_number = session.order_number
                }
            })

            return order_number
        },
    },
    mounted() {
        this.getCourse(getParam("cid")).then((course)=>{
            this.course = course
            this.comment.course_id = this.course.course_id
            
            this.getSessionsCourse(course.course_id).then((sessions)=>{
                this.sessions = sessions
                
                this.course.order_number = this.getLastOrder()
                this.selectSession(this.getSession(this.course.order_number))

                this.getProgress()
            })
        })
    },
    template : `
        <div v-if="course" class="row align-items-top">
            <div class="col-12 order-1 animation-fall-down" style="--delay:200ms" :class="fullMode ? 'mb-3' : 'col-xl-8'">
                <div class="card overflow-hidden mb-3">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <div v-if="course.session" class="h4 text-dark fw-semibold">
                                    <span v-if="course.session.sessionTaked" class="me-2"><i class="bi bi-check-circle"></i></span>
                                    {{course.session.title}}
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto" v-if="course.session.aviable">
                                <button v-if="!course.session.sessionTaked"  @click="nextSesssion($event.target)" class="btn btn-outline-secondary me-2">
                                    Terminé este módulo
                                </button>
                                <button @click="fullMode = !fullMode" class="btn btn-outline-secondary">
                                    <span v-text="fullMode ? 'Pantalla normal' : 'Pantalla completa'">
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="course.session" class="card-body bg-white">
                        <div v-if="course.session.aviable">
                            <div v-if="course.session.catalog_multimedia_id == CATALOG_MULTIMEDIA.TEXT">
                                TEXT
                            </div>
                            <div v-else-if="course.session.catalog_multimedia_id == CATALOG_MULTIMEDIA.AUDIO">
                                AUDIO
                            </div>
                            <div v-else-if="course.session.catalog_multimedia_id == CATALOG_MULTIMEDIA.VIDEO">
                                <div v-if="course.session.course.isValidYoutubeUrl()">
                                    <span v-if="course.session.course.getYoutubeVideoFrame()">
                                        <span v-html="course.session.course.getYoutubeVideoFrame()"></span>
                                    </span>
                                    <span v-else>
                                        <span v-html="course.session.course"></span>
                                    </span>
                                </div>
                                <div v-else>
                                    <video style="width:100%" controls ref="video" class="rounded shadow-xl border border-5 border-dark">
                                        <source :src="course.session.course" type="video/mp4">
                                    </video>
                                </div>
                            </div>
                            <div v-else-if="course.session.catalog_multimedia_id == CATALOG_MULTIMEDIA.HTML">
                                <div v-html="course.session.course"></div>
                            </div>
                        </div>
                        <div v-else class="fs-5 text-secondary fw-semibold text-center">
                            <div class="fs-4"><i class="bi bi-clock"></i></div>
                            Esta lección estará disponible próximamente
                        </div>
                    </div>
                </div>
                <div class="card overflow-hidden mb-3">
                    <div v-if="!course.hasComment">
                        <div class="card-header">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-xl">
                                    <div class="lead sans fw-semibold">Deja tu comentario del curso</div>
                                </div>
                                <div class="col-12 col-xl-auto">
                                    <button @click="course.viewComment = !course.viewComment" type="button" class="btn btn-primary mb-0 shadow-none"><i class="bi bi-chat-left-heart-fill"></i></button>
                                </div>
                            </div>
                        </div>
                        <div v-if="course.viewComment" class="card-body">
                            <div class="form-floating">
                                <textarea v-model="comment.comment" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                                <label for="floatingTextarea2">Deja un comentario sobre este curso</label>
                            </div>

                            <div class="d-flex justify-content-end">
                                <button :disabled="!comment.comment" @click="commentCourse" class="btn mb-0 mt-3 shadow-none btn-secondary">Guardar comentario</button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card-body text-center">
                        ¡Gracias! Comentaste este curso
                    </div>
                </div>

                <div class="card card-body">
                    <div v-if="!course.hasRank" class="d-flex align-items-center justify-content-between">
                        <div class="lead sans fw-semibold">¿Te ha gustado este curso?</div>

                        <div class="d-flex">
                            <button @click="rankCourse(SENTIMENT.POSITIVE)" class="btn shadow-none mb-0 btn-success me-2"><i class="bi bi-hand-thumbs-up-fill"></i></button>
                            <button @click="rankCourse(SENTIMENT.NEGATIVE)" class="btn shadow-none mb-0 btn-danger"><i class="bi bi-hand-thumbs-down-fill"></i></button>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        ¡Gracias! Rankeaste este curso
                    </div>
                </div>
            </div>
            <div v-if="sessions" class="col-12 col-xl-4 animation-fall-down" style="--delay:500ms">
                <div class="card bg-transparent shadow-none overflow-scroll border-radius-xl" style="max-height:50rem">
                    <div class="card-header bg-transparent">
                        <div class="row align-items-center">
                            <div class="col h4 mb-0 fw-semibold">
                                {{course.title}}

                                <div class="text-xs text-secondary">
                                    {{progress.taked}} de {{progress.total}} modulos tomados
                                </div>
                            </div>
                        </div>
                        <div class="progress progress-sm mt-2" style="height:1rem">
                            <div class="progress-bar" role="progressbar" style="height:1rem" :style="{'width': progress.percentage+'%'}" aria-valuenow="29" aria-valuemin="0" aria-valuemax="100">
                                {{progress.percentage}}%
                            </div>
                        </div>
                    </div>

                    <ul class="list-group list-group-flush" v-if="course.session">
                        <li v-for="session in sessions" class="list-group-item rounded border-0 list-group-item-action cursor-pointer" :class="course.session.session_per_course_id == session.session_per_course_id ? 'bg-info': 'bg-transparent'">
                            <div @click="selectSession(session)" class="row align-items-center">
                                <div class="col-auto">
                                    <span class="badge fs-5 border" :class="course.session.session_per_course_id == session.session_per_course_id ? 'text-white border-white': 'text-secondary border-secondary'"><i class="bi bi-collection-play"></i></span>
                                </div>
                                <div class="col">
                                    <div v-if="session.order_number > 0" class="fs-6 fw-semibold">
                                        <span class="badge p-0" :class="course.session.session_per_course_id == session.session_per_course_id ? 'border-white text-white': 'border-secondary text-secondary'">Módulo {{session.order_number}}</span>
                                        
                                        <span v-if="!session.aviable" class="badge border text-xxs ms-2" :class="course.session.session_per_course_id == session.session_per_course_id ? 'border-white text-white': 'border-warning text-warning'">Próximamente</span>
                                    </div>
                                    <div class="h4 fw-semibold" :class="course.session.session_per_course_id == session.session_per_course_id ? 'text-white': ''">
                                        <span v-if="session.sessionTaked" class="me-2">
                                            <i class="bi bi-check-circle"></i>
                                        </span>

                                        {{session.title}}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
}

export { LessonViewer } 