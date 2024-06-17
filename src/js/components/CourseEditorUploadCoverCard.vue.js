import { UserSupport } from './../userSupport.module.js'

const CourseEditorUploadCoverCard = {
    props: ["courseData"],
    emits: ["onUpdate"],
    data(){
        return{
            UserSupport : new UserSupport,
        }
    },
    methods: {
        openFileManager(ref) {
            ref.click();
        },
        updateCourseCover(path){
            this.course.image = path
        },
        updateImage(){
            this.uploadCoverCourse(this.$refs.uploadCoverCourse)
                .then(path => this.$emit('onUpdate', 'image', path));
        },
        uploadCoverCourse(element) 
        {
            return new Promise((resolve) => {
                const files = $(element).prop('files');
                let form_data = new FormData();
            
                form_data.append("file", files[0]);
            
                this.UserSupport.uploadCoverCourse(form_data,$(".progress").find(".progress-bar"),(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.target_path)
                    }
                });
            })
        },
    },
    mounted(){
        // add instructions here
    },
    template: `
        <div :style="{backgroundImage: courseData.image ? 'url(' +courseData.image+')' : ''}" class="card mb-3 cursor-pointer" style="height:300px;background-size:cover;">
            <div class="card-body">
                <div @click="openFileManager($refs.uploadCoverCourse)" class="row cover h-100 d-flex align-items-center text-center">
                    <div class="col-12">
                        <div v-if="!courseData.image">
                            <div class="lead text-xdark">
                                <t>Imagen de portada</t>
                            </div>
                            <div class="text-muted info small">
                                <t>Arrastra tu archivo aquí. Mínimo 500 pixeles de ancho por 500 pixeles de alto</t>
                            </div>
                            <span class="badge bg-secondary">JPG</span>
                            <span class="badge bg-secondary">PNG</span>
                            <span class="badge bg-secondary">JPEG</span>
                        </div>
                        <div v-else>
                            Cambiar foto de portada
                        </div>
                    </div>
                </div>

                <input class="upload-file d-none" ref="uploadCoverCourse" @change="updateImage" capture="filesystem" type="file" accept=".jpg, .png, jpeg" />
                <div class="progress progress-sm">
                    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    `,
};

export default CourseEditorUploadCoverCard;