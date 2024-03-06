import { User } from '../../src/js/user.module.js?v=2.4.9'   

const ApiedititemViewer = {
    name : 'apiedititem-viewer',
    data() {
        return {
            User: new User,
            isFilled: false,
            user_api_id: null,
            editor : null,
            item: {
                item_id: null,
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
        editItem() {
            this.User.editItem({...{user_api_id:this.user_api_id},...this.item}, (response) => {
                if (response.s == 1) {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: 'Hemos actualizado tu item',
                        _class:'bg-gradient-success text-white'
                    })
                }
            })
        },
        getItem(item_id) {
            return new Promise((resolve, reject) => {
                this.User.getItem({user_api_id:this.user_api_id,item_id:item_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.item)
                    }
                })
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
            if(getParam('iid'))
            {
                this.user_api_id = getParam('uaid')
                this.item.item_id = getParam('iid')

                this.getItem(this.item.item_id).then((item) =>{
                    this.item = item
                    
                    this.initEditor()

                    this.editor.root.innerHTML = this.item.description
                })
            }
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div class="card overflow-hidden mb-3">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-xl fw-sembold text-primary">
                            <div class="text-xs">Edit item</div>
                            <div class="fs-4">
                                {{item.title}}
                            </div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button :disabled="!isFilled" @click="editItem" type="button" class="btn btn-primary btn-xs px-3 mb-0 shadow-none">Edit</button>
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
                                    <div id="editor"  style="height:122px"></div>
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

export { ApiedititemViewer } 