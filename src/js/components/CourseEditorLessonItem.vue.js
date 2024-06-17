import { isLessonType } from '../utils/courseEditorUtils.js';

const CourseEditorLessonItem = {
    props: ["lesson"],
    emits: ["onAddSubLesson", "onDelete", "onEdit"],
    methods: {
        isType(lesson, type){
            return isLessonType(lesson.catalog_multimedia_id, type);
        },
        onAddLesson(){
            this.$emit('onAddSubLesson',this.lesson.unique_id);
        },
    },
    template: `
        <div class="row align-items-center">
            <div class="col-auto text-gradient-primary">
                <span v-if="isType(lesson,'text')">
                    <i class="bi h3 bi-body-text"></i>
                </span>
                <span v-else-if="isType(lesson,'audio')">
                    <i class="bi h3 bi-camera-video"></i>
                </span>
                <span v-else-if="isType(lesson,'video')">
                    <i class="bi h3 bi-collection-play"></i>
                </span>
                <span v-else-if="isType(lesson,'html')">
                    <i class="bi h3 bi-code-slash"></i>
                </span>
                <span v-else-if="isType(lesson,'module')">
                    <i class="bi h3 bi-folder-fill"></i>
                </span>
            </div>
            <div class="col">
                <div class="fw-semibold">{{lesson.title}}</div>
                
                <div v-if="isType(lesson,'text')">
                    <span v-html="lesson.course"></span>
                </div>
                <div v-else-if="isType(lesson,'audio')">
                    <div class="row">
                        <div class="col-12 col-lg-4">
                            <img :src="lesson.course.youtubeThumbnail()" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-auto">
                <div class="d-grid">
                    <button class="btn btn-dark btn-sm mb-1" @click="$emit('onDelete',lesson.unique_id, null)">Borrar</button>
                </div>
                <div class="d-grid">
                    <button class="btn btn-dark btn-sm mb-1" @click="$emit('onEdit',lesson)">Editar</button>
                </div>
                <div v-if="isType(lesson,'module')" class="d-grid">
                    <button @click="onAddLesson" class="btn btn-dark btn-sm shadow-none">
                        Añadir lección
                    </button>
                </div>
            </div>
        </div>
        <div v-if="isType(lesson,'module')" class="p-3 bg-light rounded">
            <div v-if="(lesson.sessions?.length ?? 0) > 0">
                <div v-for="subLesson in lesson.sessions" class="row align-items-center">
                    <div class="col-auto text-gradient-primary">
                        <span v-if="isType(subLesson,'text')">
                            <i class="bi h3 bi-body-text"></i>
                        </span>
                        <span v-else-if="isType(subLesson,'audio')">
                            <i class="bi h3 bi-camera-video"></i>
                        </span>
                        <span v-else-if="isType(subLesson,'video')">
                            <i class="bi h3 bi-collection-play"></i>
                        </span>
                        <span v-else-if="isType(subLesson,'module')">
                            <i class="bi h3 bi-folder-fill"></i>
                        </span>
                    </div>
                    <div class="col">
                        <div class="fw-semibold">{{subLesson.title}}</div>
                    
                        <div v-if="isType(subLesson,'text')">
                            <span v-html="subLesson.course"></span>
                        </div>
                        <div v-else-if="isType(subLesson,'audio')">
                            <div class="row">
                                <div class="col-12 col-lg-4">
                                    <img :src="subLesson.course.youtubeThumbnail()" class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="d-grid">
                            <button class="btn btn-dark btn-sm mb-1" @click="$emit('onDelete',subLesson.unique_id, lesson.unique_id)">Borrar</button>
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-dark btn-sm mb-1" @click="$emit('onEdit',subLesson)">Editar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-secondary text-dark">
                <strong>Nota:</strong>
                <div>
                    Añade sesiones para éste modulo en "Añadir lección"
                </div>
            </div>
        </div>
    `,
};

export default CourseEditorLessonItem;