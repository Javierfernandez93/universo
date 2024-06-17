
const CourseEditorBasicInfoCard = {
    props: ['courseData'],
    emits: ['updateCourseData'],
    data(){
        return {
            editor : null,
            tags: null,
            targetAudience: {
                '-1': 'Para todos',
                '0': 'Sólo no activos',
                '1': 'Sólo activos'
            },
        }
    },
    methods: {
        getTags(){
            return this.tags.value
        },
        initEditor() {
            if(this.editor){
                this.editor.root.innerHTML = this.courseData?.description ?? '';
                return;
            }

            this.editor = new Quill('#editor', {theme: 'snow'});
            this.editor.root.innerHTML = this.courseData?.description ?? ''
            this.editor.on('text-change', () => {
                this.courseData.description = this.editor.root.innerHTML
            });
        },
    },
    watch: {
        'courseData.description': function(newVal) {
            if (this.editor) {
                const currentContent = this.editor.root.innerHTML;
                if (currentContent !== newVal) {
                    this.editor.root.innerHTML = newVal;
                }
            }
        },
    },
    mounted(){
        $('.tagArea').each((_,el) => {this.tags = new Tagify(el);});
        this.initEditor();
        $("#duration").mask('00:00');
    },
    updated(){
        if (this.courseData.free !== undefined) {
            this.$refs.free.checked = this.courseData.free;
        }
    },
    template: `
        <div class="card">
            <div class="card-body">
                <div class="row pb-3 align-items-center">
                    <div class="col lead">
                        <t>Información</t>
                    </div>
                    <div class="col-auto form-check form-switch">
                        <input v-model="courseData.free" class="form-check-input" type="checkbox" ref="free">
                        <label class="form-check-label" for="free">
                            <t>Ofrecer curso gratuito</t>
                        </label>
                    </div>
                    <div class="col-12 col-xl">
                        <select class="form-select" v-model="courseData.target" aria-label="Campaña">
                            <option v-for="(target,code) in targetAudience" :value="Number(code)" :key="code">
                                {{target}} 
                            </option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <div class="form-floating">
                            <input v-model="courseData.title" :class="courseData.title ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.duration.focus()" type="text" autofocus class="form-control" ref="title" placeholder="name@example.com">
                            <label for="title">
                                <t>Nombre del curso</t>
                            </label>
                        </div>
                    </div>
                    <div class="col-12 col-xl">
                        <div class="form-floating">
                            <input v-model="courseData.duration" id="duration" :class="courseData.duration ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.description.focus()" type="text" class="form-control" ref="duration" data-mask="HH:MM">
                            <label for="duration">
                                <t>Horas del curso</t>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="description">Descripción del curso</label>
                    
                    <div id="editor" style="height: 130px;"></div>
                </div>

                <div>
                    <label for="tag"><t>Tags del curso</t></label>
                    <input class="tagArea" name="tags" ref="tag" id="tag" :value="courseData.tag" data-tagify="true">
                </div>
            </div>
        </div>
    `,
};

export default CourseEditorBasicInfoCard;