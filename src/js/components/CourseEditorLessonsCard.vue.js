import CourseEditorLessonItem from './CourseEditorLessonItem.vue.js'
import { isLessonType } from '../utils/courseEditorUtils.js';

const CourseEditorLessonsCard = {
    props: ["courseData"],
    emits: ['onAddSubLesson', 'onDeleteLesson', 'onEditLesson'],
    components: {
        CourseEditorLessonItem,
    },
    methods: {
        addLesson(parentId){
            this.$emit('onAddSubLesson',parentId)
        },
        deleteLesson(lessonId, parentId){
            this.$emit('onDeleteLesson', lessonId, parentId)
        },
        editLesson(lesson){
            this.$emit('onEditLesson',lesson)
        },
        countLessons(){
             const resume = (this.courseData?.sessions ?? []).reduce((prev, curr) => {
                if(isLessonType(curr.catalog_multimedia_id,'module')){
                    return {
                        lessons: prev.lessons + curr.sessions.length,
                        modules: prev.modules + 1,
                    };
                }

                return {...prev, lessons: prev.lessons + 1};
            }, {lessons: 0, modules: 0});
            
            if(resume.modules){
                return resume.modules + ' modulos, ' + resume.lessons + ' lecciones';
            }
            return resume.lessons + ' lecciones';
        },
    },
    template: `
        <div class="d-flex row justify-content-center mt-3">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                Lecciones del curso ({{ countLessons() }})
                            </div>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li v-for="(lesson, index) in courseData.sessions" class="list-group-item">
                            <CourseEditorLessonItem 
                                :lesson="lesson" 
                                @onAddSubLesson="addLesson"
                                @onDelete="deleteLesson" 
                                @onEdit="editLesson" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
};

export default CourseEditorLessonsCard;