import { UserSupport } from './userSupport.module.js?v=1.0.9'   

const AddbannerViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            real_states: null,
            filled: false,
            loaded : false,
            banner: {
                banner_id: null,
                title: null,
                link: '',
                image: null
            },
        }
    },
    watch : {
        banner : {
            handler() {
              this.filled = this.banner.title && this.banner.link.isValidLink() && this.banner.image
            },
            deep: true
        },
    },
    methods: {
        saveBanner() 
        {
            this.UserSupport.saveBanner({banner:this.banner},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Banner guardado. redirigiendo...',
                    })

                    setTimeout(() => {  
                        window.location.href = '../../apps/admin-banner'
                    },3000)
                }
            })
        },
        getBannerForEdit() 
        {
            this.UserSupport.getBannerForEdit({banner_id:this.banner.banner_id},(response)=>{
                if(response.s == 1)
                {
                    this.banner = response.banner
                }
            })
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile() 
        {
            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.UserSupport.uploadImageBanner(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.banner.image = response.target_path
              }
            });
        },
    },
    mounted() 
    { 
        if(getParam("bid"))
        {
            this.loaded = true
            this.banner.banner_id = getParam("bid")

            this.getBannerForEdit()
        } else {
            this.loaded = true
        }
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl"> 
                    
                        <p v-if="!loaded" class="placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </p>

                        <span v-else class="h5" v-text="banner.banner_id ? 'Editar banner' : 'Añadir banner'"></span>

                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveBanner">
                            <span v-text="banner.banner_id ? 'Editar banner' : 'Guardar banner'"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Título del banner *</label>
                        <input 
                            :autofocus="true"
                            :class="banner.title ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.price.focus()"
                            v-model="banner.title"
                            ref="title"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Link completo (incluye http/https) *</label>
                        <input 
                            v-model="banner.link"
                            :class="banner.link.isValidLink() > 0 ? 'is-valid' : 'is-invalid'"
                            ref="link"
                            type="text" class="form-control" placeholder="Link de sitio inicial">
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-5">
                        <div class="card image-500-x-500 card-body shadow cursor-pointer z-zoom-element" :style="{'background-image':'url('+banner.image+')'}">
                            <div class="d-flex text-center h-100 align-items-center" @click="openFileManager">
                                <div class="row justify-content-center w-100">
                                    <div class="col-12">
                                        <div class="text-muted">
                                            <span :class="banner.image ? 'text-white' :'text-dark'" v-text="banner.image ? 'Actualizar imagen' : 'Subir imagen'"></span>
                                            
                                            <div class="text-xs">
                                                (500px x 500px)
                                            </div>
                                        </div>

                                        <input class="d-none" ref="file" @change="uploadFile($event)" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { AddbannerViewer } 