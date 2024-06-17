import { isLessonType } from '../utils/courseEditorUtils.js';
import { UserSupport } from './../userSupport.module.js'

const CourseEditorLessonSidebar = {
    emits: ['onSave'],
    data(){
        return {
            canvas: null,
            editor: null,
            isComplete: false,
            lessonData: {},
            UserSupport : new UserSupport,
        }
    },
    methods: {
        getEmptyLessonData(){
            return {
                attach_session_per_course_id: this.parentId ?? 0,
                catalog_multimedia_id: 1,
                course: '',
                courseValue: '',
                sessions: [],
                title: null,
                unique_id: getUniqueIdSmall(),
            };
        },
        getLessonTypes(){
            return new Promise((resolve) => {
                this.UserSupport.getCatalogMultimedias({}, (response) => {
                  if (response.s == 1) {
                    this.lessonTypes = response.catalog_multimedias.map(el => ({
                        id: el.catalog_multimedia_id,
                        description: el.multimedia,
                    }));
                  }
        
                  resolve();
                });
              });
        },
        initEditor() {
            this.editor = new Quill(this.$refs.editor, {theme: "snow"});
            this.editor.on("text-change", () => this.lessonData.course = this.editor.root.innerHTML);
        },
        isCompleted(){
            const {course, courseValue, title} = this.lessonData;
            const isCompleted = (title !== null && title !== '')
                && (
                    this.isType('module')
                    || (course !== null  && course !== '')
                );
            return isCompleted;
        },
        isType(type){
            return isLessonType(this.lessonData.catalog_multimedia_id, type);
        },
        onSave(){
            if (this.isType('audio')) {
                this.lessonData.course = this.lessonData.video.youtubeParser();
            }

            this.$emit("onSave", this.lessonData);
    
            this.canvas.hide();
        },
        open(lessonData, parentId = null){
            this.parentId = parentId;
            this.lessonData = lessonData === null || lessonData === undefined
                    ? this.getEmptyLessonData()
                    : lessonData;
            this.canvas.show();
        },
    },
    mounted(){
        this.canvas = new bootstrap.Offcanvas(this.$refs.offcanvasRight);
        this.getLessonTypes().then(() => {
            this.initEditor();
          });
    },
    watch: {
        'lessonData.course': function(newVal) {
            if (this.editor) {
                const currentContent = this.editor.root.innerHTML;
                if (currentContent !== newVal) {
                    this.editor.root.innerHTML = newVal;
                }
            }
        },
        'lessonData.courseValue': async function(newVal) {
            if (newVal.isValidVimeoUrl()) {
                this.lessonData.course = await newVal.getVimeoFrame();
            } else if(newVal.isValidYoutubeUrl()) {
                this.lessonData.course = await newVal.getYoutubeVideoFrame()
            }
        },
    },
    template: `
        <div class="offcanvas offcanvas-end" tabindex="-1" ref="offcanvasRight" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Lección del curso</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="form-floating mb-3">
                    <input v-model="lessonData.title" :class="lessonData?.title ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.course.focus()" type="text" class="form-control" ref="title" placeholder="Título">
                    <label for="title">
                        <t>Título</t>
                    </label>
                </div>

                <div class="form-floating mb-3">
                    <select :class="lessonData?.catalog_multimedia_id ? 'is-valid' : ''" class="form-select" ref="lessonType" v-model="lessonData.catalog_multimedia_id" aria-label="Selecciona el tipo de sessión">
                        <option v-for="type in lessonTypes" :value="type.id">
                            {{ type.description }}
                        </option>
                    </select>
                    <label for="lessonType">
                        <t>Tipo de lecciön</t>
                    </label>
                </div>

                <div class="mb-3">
                    <div v-show="isType('text')">
                        <label for="course">
                            <t>Descripción</t>
                        </label>
                        <div ref="editor" style="height:120px;"></div>
                    </div>
                    <div v-if="isType('audio')" class="form-floating">
                        Audio
                    </div>
                    <div v-if="isType('video')">
                        <div class="form-floating mb-3">
                        <input v-model="lessonData.courseValue" :class="lessonData.courseValue ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.course.focus()" type="text" class="form-control" ref="video" placeholder="Video">
                        <label for="video">
                            <t>Video</t>
                        </label>
                        </div>
                        <span class="frame-video" v-html="lessonData?.course"></span>
                    </div>
                    <div v-if="isType('html')">
                        <textarea placeholder="Escribe el código HTML aquí" class="form-control" v-model="lessonData.course" style="height:400px">
                        </textarea>
                    </div>
                </div>

                <button :disabled="!isCompleted()" class="btn btn-dark" @click="onSave"><t>Guardar Lección</t></button>
            </div>
        </div>
    `,
};

export default CourseEditorLessonSidebar;