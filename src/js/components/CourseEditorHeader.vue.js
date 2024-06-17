
const CourseEditorHeader = {
    props: ['isEditing', 'isDisabled'],
    emits: ['onSaveCourse', 'onAddLesson'],
    data(){
        return {
            title: null,
        }
    },
    mounted(){
        this.courseID = parseInt(getParam("cid")) > 0 ? parseInt(getParam("cid")) : null;
    },
    template: `
        <div class="row mb-3 align-items-center">
            <div class="col-12 col-xl">
                <h4>{{ isEditing ? "Editar curso" : "Añadir curso" }}</h4>
            </div>
            <div class="col-12 col-xl-auto">
                <button :disabled="isDisabled" @click="$emit('onSaveCourse')" class="btn btn-primary me-2">
                    <t>{{ isEditing ? "Guardar cambios" : "Guardar curso" }}</t>
                </button>
                <button @click="$emit('onAddLesson')" class="btn btn-primary ">
                    <t>Añadir lección</t>
                </button>
            </div>
        </div>
    `,
};

export default CourseEditorHeader;