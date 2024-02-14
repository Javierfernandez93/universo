import { User } from '../../src/js/user.module.js?v=2.3.9'   

const ApiadditemViewer = {
    name : 'apiadditem-viewer',
    data() {
        return {
            User: new User,
            isFilled: false,
            user_api_id: null,
            editor : null,
            item: {
                title: null,
                description: null,
                price: null,
                image: '',
                recomend: false,
            }
        }
    },
    watch: {
        item: {
            handler() {
                this.isFilled = this.item.title && this.item.description && this.item.price && this.item.image
            },
            deep: true
        },
    },
    methods: {
        initEditor()
        {
            this.editor = new Quill('#editor', {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ]
                },
                theme: 'snow'
            });

            this.editor.on('text-change', () => {
                this.item.description = this.editor.root.innerHTML
            });
        },
        addItem() {
            this.User.addItem({...{user_api_id:this.user_api_id},...this.item}, (response) => {
                if (response.s == 1) {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: 'Hemos añadido tu item',
                        _class:'bg-gradient-success text-white'
                    })
                }
            })
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile() 
        {
            $(".progress").removeClass("d-none")

            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.User.uploadItemImage(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.item.image = response.target_path
              }
            });
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this.initEditor()
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div class="card overflow-hidden mb-3">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-xl fw-sembold">
                            <div class="fs-4 text-primary">Add item</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button :disabled="!isFilled" @click="addItem" type="button" class="btn btn-primary btn-xs px-3 mb-0 shadow-none">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card-body">
                        <div class="row">
                           <div class="col-12">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl">
                                        <div class="form-floating mb-3">
                                            <input :class="item.title ? 'is-valid' : ''" :autofocus="true" v-model="item.title" type="text" class="form-control" id="title" placeholder="name">
                                            <label for="title">Title</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div class="form-floating mb-3">
                                            <input :class="item.price ? 'is-valid' : ''" v-model="item.price" type="number" class="form-control" id="price" placeholder="Price">
                                            <label for="price">Price</label>
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="form-check form-switch">
                                            <input v-model="item.recomend" class="form-check-input" type="checkbox" role="switch" id="recomend">
                                            <label class="form-check-label" for="recomend">Star Item</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div id="editor" style="height:122px"></div>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4">
                                <div class="mb-3 card card-bg bg-light shadow-none py-5" :style="{ 'background-image': 'url(' + item.image + ')' }">
                                    <div class="card-body text-center">
                                        <div class="fw-semibold text-primary">
                                            <div v-if="item.image">change image</div>
                                            <div v-else>upload image</div>
                                        </div>
                                        <input class="opacity-0 cursor-pointer bg-dark w-100 h-100 start-0 top-0 position-absolute" ref="file" @change="uploadFile($event)" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { ApiadditemViewer } 