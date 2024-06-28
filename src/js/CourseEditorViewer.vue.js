import CourseEditorBasicInfoCard from './components/CourseEditorBasicInfoCard.vue.js'
import CourseEditorCategoryCard from './components/CourseEditorCategoryCard.vue.js'
import CourseEditorHeader from './components/CourseEditorHeader.vue.js'
import CourseEditorLessonsCard from './components/CourseEditorLessonsCard.vue.js'
import CourseEditorLessonSidebar from './components/CourseEditorLessonSidebar.vue.js'
import CourseEditorUploadCoverCard from './components/CourseEditorUploadCoverCard.vue.js'
import { UserSupport } from './userSupport.module.js'
import { isLessonType } from './utils/courseEditorUtils.js';

const CourseEditorViewer = {
    props: [],
    components: {
        BasicInfoCard: CourseEditorBasicInfoCard,
        CategoryCard: CourseEditorCategoryCard,
        Header: CourseEditorHeader,
        LessonsCard: CourseEditorLessonsCard,
        LessonSidebar: CourseEditorLessonSidebar,
        UploadCoverCard: CourseEditorUploadCoverCard,
    },
    data(){
        return {
            courseID: null,
            deletedLessons: [],
            isDirty: true,
            isSaving: false,
            courseData: {},
            UserSupport : new UserSupport,
        }
    },
    methods: {
        addLesson(parentId = null) {
            this.openLessonPanel(null, parentId);
        },
        deleteLesson(lessonId, parentId){
            if (!isNaN(lessonId)) {
                this.deletedLessons.push(lessonId);
            }
            if(parentId !== null){
                const parentKey = this.findLessonByID(parentId);
                if (parentKey !== false) {
                    const childKey = this.findLessonByID(lessonId, this.courseData.sessions[parentKey]);
                    if(childKey !== false){
                        this.courseData.sessions[parentKey].sessions.splice(childKey, 1);
                        return;
                    }
                }
            }
            const lessonKey = this.findLessonByID(lessonId, this.courseData);
            if (lessonKey !== false){
                this.courseData.sessions.splice(lessonKey, 1);
            }
        },
        editLesson(lessonData) {
            this.openLessonPanel(lessonData);
        },
        getCourseForEditAsync(data) {
            return new Promise((resolve, reject) => {
                this.UserSupport.getCourseForEdit(data, (response) => {
                    if (response && response.s === 1) {
                        resolve(response.course);
                    } else {
                        reject(new Error("Failed to load course data"));
                    }
                });
            });
        },
        findLessonByID(id, dataSet = null) {
            const {sessions = []} = dataSet === null ? this.courseData : dataSet;
            for (let i = 0; i < sessions.length; i++){
                if (sessions[i].unique_id == id) {
                    return i;
                }
            }
            return false;
        },
        async loadCourseData(){
            try {
                const course = await this.getCourseForEditAsync({course_id: this.courseID});
                course.sessions = course.sessions.map(lesson => {
                    const newLesson = {
                        unique_id: lesson.session_per_course_id,
                        ...lesson
                    };
                    if(isLessonType(newLesson.catalog_multimedia_id, 'module')){
                        newLesson.sessions = (newLesson.sessions ?? []).map(subLesson => ({
                            unique_id: subLesson.session_per_course_id,
                            ...subLesson
                        }));
                    }
                    return newLesson;
                });
                this.courseData = {...course};
            } catch (error) {
                console.error("Error loading course data:", error);
            }
        },
        loadEmptyCourseData(){
            this.courseData = {
                catalog_course_id : 1,
                catalog_currency_id : null,
                duration : null,
                free : true,
                image : null,
                sessions : [],
                tag : null,
                target : -1,
                title : null,
            }
        },
        openLessonPanel(lessonData = null, parentId = null){
            this.$refs.sidebar.open(lessonData, parentId);
        },
        saveCourse() {
            this.courseData.tag = JSON.stringify(this.$refs.basicInfoCard.getTags());
            this.courseData.deleted_lessons = this.deletedLessons;

            this.UserSupport.updateCourse( this.courseData, (response) => {
                if(response.s == 1) {
                    if(this.courseID === null){
                        this.courseID = response.course_id;
                        this.courseData.course_id = response.course_id;
                    }
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: `Guardamos tu curso ${this.courseData.title}`,
                        _class:'bg-gradient-success text-white'
                    })
                } else {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: `Error guardando el curso ${this.courseData.title}`,
                        _class:'bg-gradient-error text-white'
                    })
                }
            });
        },
        saveLesson(lessonData){
            const { attach_session_per_course_id: parentId } = lessonData;
            const isChild = parentId != 0;

            if(isChild)
            {
                const parentKey = this.findLessonByID(parentId);

                if (parentKey !== false) {
                    const childKey = this.findLessonByID(lessonData.unique_id, this.courseData.sessions[parentKey]);
                    if(childKey !== false){
                        this.courseData.sessions[parentKey].sessions[childKey] = lessonData;
                    } else {
                        if(this.courseData.sessions[parentKey].sessions === undefined){
                            this.courseData.sessions[parentKey].sessions = [];
                        }
                        this.courseData.sessions[parentKey].sessions.push(lessonData);
                    }
                    return;
                }
            }

            const lessonKey = this.findLessonByID(lessonData.unique_id)
            if (lessonKey) {
                this.courseData.sessions[lessonKey] = lessonData;
            } else {
                this.courseData.sessions.push(lessonData);
            }
        },
        updateInfo(key, value){
            this.courseData[key] = value;
        },
    },
    async mounted(){
        this.courseID = parseInt(getParam("cid")) > 0 ? parseInt(getParam("cid")) : null;

        if(this.courseID !== null){
            await this.loadCourseData();
        } else {
            this.loadEmptyCourseData();
        }
    },
    template: `
        <div class="row justify-content-center">
            <div class="col-12 col-xl-10">
                <Header 
                    :isEditing="courseID !== null"
                    :isDisabled="!(isDirty || isSaving)"
                    @onAddLesson="addLesson"
                    @onSaveCourse="saveCourse"
                    />
                <div class="d-flex row justify-content-center">
                    <div class="col-12 col-xl-8">
                        <BasicInfoCard :courseData="courseData" ref="basicInfoCard" />
                        <LessonsCard 
                            :courseData="courseData" 
                            @onAddSubLesson="addLesson"
                            @onDeleteLesson="deleteLesson"
                            @onEditLesson="editLesson" />
                     </div>
                     <div class="col-12 col-xl-4">
                         <UploadCoverCard :courseData="courseData" @onUpdate="updateInfo" />
                         <CategoryCard :courseData="courseData" />
                     </div>
                </div>
            </div>
        </div>
        <LessonSidebar ref="sidebar" @onSave="saveLesson" />
    `,
};

export default CourseEditorViewer;