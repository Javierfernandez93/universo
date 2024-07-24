import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.5'

const BlogaddViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            editor : null,
            editorPreview : null,
            busy : false,
            filled : false,
            blog_categories : {},
            blog : {
                title: null,
                sub_title: null,
                blog_category_id: null,
                content: '',
                image: null,
                image_blog: null,
            },
        }
    },
    watch : {
        query : 
        {
            handler() {
                this.filterData()
            },
            deep : true
        },
        blog : 
        {
            handler() {
                this.filled = this.blog.title && this.blog.sub_title && this.blog.blog_category_id && this.blog.content
            },
            deep : true
        },
    },
    methods: {
        saveBlog()
        {
            this.busy = true
            this.UserSupport.saveBlog(this.blog,(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    toastInfo({
                        message : 'Entrada guardada. Redirigiendo...',
                    })

                    setTimeout(() => {
                        window.history.back()
                    },3000)
                }
            })
        },
        initEditor()
        {
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'link', 'image', 'video', 'formula' ],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];


            this.editor = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            this.editorPreview = new Quill('#editorPreview', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });

            this.editor.on('text-change', () => {
                this.blog.content = this.editor.root.innerHTML
            });

            this.editorPreview.on('text-change', () => {
                this.blog.sub_title = this.editorPreview.root.innerHTML
            });
        },
        getBlogCategories()
        {
            return new Promise((resolve) => {
                this.busy = true
                this.UserSupport.getBlogCategories({},(response)=>{
                    this.busy = false
                    if(response.s == 1)
                    {
                        this.blog_categories = response.blog_categories
                        this.blog.blog_category_id = response.blog_categories[0].blog_category_id
                    }

                    resolve()
                })
            })
        },
        openFileManager(refs) 
        {
            this.$refs[refs].click()
        },
        viewPreview() 
        {
            $(this.$refs.modal).modal('show')
        },
        uploadFile($event,title) 
        {
            console.log($event)
            let ref = this.$refs[title];

            let files = $(ref).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.UserSupport.uploadImageBlog(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                if(title == 'image')
                {
                    this.blog.image = response.target_path
                } else if(title == 'image_bg') {
                    this.blog.image_bg = response.target_path
                }
              }
            });
        },
    },
    mounted() 
    {
        this.getBlogCategories().then(()=>{
            this.initEditor()
        });
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="row align-items-center">
                            <div class="col fw-semibold text-dark">
                                <div class="h4">Añadir entrada a blog</div>
                            </div>
                            <div class="col-auto text-muted text-sm">
                                <button @click="viewPreview" class="btn btn-primary mb-0 shadow-none">Previo</button>
                            </div>
                            <div class="col-auto text-muted text-sm">
                                <button :disabled="!filled || busy" ref="button" class="btn btn-primary mb-0 shadow-none" @click="saveBlog">Guardar</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-12 col-md">
                                <label>Título</label>
                                <input 
                                    :autofocus="true"
                                    :class="blog.title ? 'is-valid' : ''"
                                    @keydown.enter.exact.prevent="$refs.description.focus()"
                                    v-model="blog.title"
                                    ref="title"
                                    type="text" class="form-control" placeholder="Título">
                            </div>
                            <div class="col-12 col-md">
                                <label>Tipo de blog</label>

                                <select 
                                    :class="blog.blog_category_id ? 'is-valid' : ''"
                                    class="form-select" v-model="blog.blog_category_id" aria-label="Selecciona una categoría">
                                    <option>Selecciona una categoría</option>
                                    <option v-for="blog_category in blog_categories" v-bind:value="blog_category.blog_category_id">
                                        {{ blog_category.category }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label>Previo</label>
                            <div id="editorPreview" style="height: 150px;"></div>
                        </div>

                        <div class="mb-3">
                            <label>Descripción</label>
                            <div id="editor" style="height: 400px;"></div>
                        </div>

                        <div class="row justify-content-center align-items-center mb-3">
                            <div class="col-12 col-md-4">
                                <div class="card image-500-x-500 card-body shadow cursor-pointer z-zoom-element" :style="{'background-image':'url('+blog.image+')'}">
                                    <div class="d-flex text-center h-100 align-items-center" @click="openFileManager('image')">
                                        <div class="row justify-content-center w-100">
                                            <div class="col-12">
                                                <div class="text-muted">
                                                    <div>Imagen de portada</div>
                                                    <span :class="blog.image ? 'text-white' :'text-dark'" v-text="blog.image ? 'Actualizar imagen' : 'Subir imagen'"></span>
                                                    
                                                    <div class="text-xs">
                                                        (500px x 500px)
                                                    </div>
                                                </div>

                                                <input class="d-none" ref="image" @change="uploadFile($event,'image')" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="card image-500-x-500 card-body shadow cursor-pointer z-zoom-element" :style="{'background-image':'url('+blog.image_bg+')'}">
                                    <div class="d-flex text-center h-100 align-items-center" @click="openFileManager('image_bg')">
                                        <div class="row justify-content-center w-100">
                                            <div class="col-12">
                                                <div class="text-muted">
                                                    <div>Imagen de fondo</div>
                                                    <span :class="blog.image_bg ? 'text-white' :'text-dark'" v-text="blog.image_bg ? 'Actualizar imagen' : 'Subir imagen'"></span>
                                                    
                                                    <div class="text-xs">
                                                        (1720px x 720px)
                                                    </div>
                                                </div>

                                                <input class="d-none" ref="image_bg" @change="uploadFile($event,'image_bg')" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" ref="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{blog.title}}</h1>
                        <button type="button" class="btn mb-0 shadow-none px-3  btn-dark" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="blog.content"><span v-html="blog.content"></span></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar previo</button>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { BlogaddViewer }