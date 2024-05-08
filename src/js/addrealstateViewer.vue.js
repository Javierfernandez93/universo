import { UserSupport } from './userSupport.module.js?v=1.0.6'   

const AddrealstateViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            real_states: null,
            filled: false,
            loaded : false,
            realState: {
                real_state_id: null,
                title: null,
                link: '',
                image: null
            },
        }
    },
    watch : {
        realState : {
            handler() {
              this.filled = this.realState.title && this.realState.link.isValidLink() && this.realState.image
            },
            deep: true
        },
    },
    methods: {
        saveRealState() 
        {
            this.UserSupport.saveRealState({realState:this.realState},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Desarrolladora guardada. redirigiendo...',
                    })

                    setTimeout(() => {  
                        window.location.href = '../../apps/admin-realstate'
                    },3000)
                }
            })
        },
        getRealStateForEdit() 
        {
            this.UserSupport.getRealStateForEdit({real_state_id:this.realState.real_state_id},(response)=>{
                if(response.s == 1)
                {
                    this.realState = response.realState
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
          
            this.UserSupport.uploadImageRealState(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.realState.image = response.target_path
              }
            });
        },
    },
    mounted() 
    { 
        if(getParam("rsid"))
        {
            this.loaded = true
            this.realState.real_state_id = getParam("rsid")

            this.getRealStateForEdit()
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

                        <span v-else class="h5" v-text="realState.real_state_id ? 'Editar desarrolladora' : 'Añadir desarrolladora'"></span>

                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveRealState">
                            <span v-text="realState.real_state_id ? 'Editar desarrolladora' : 'Guardar desarrolladora'"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Nombre desarrolladora *</label>
                        <input 
                            :autofocus="true"
                            :class="realState.title ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.price.focus()"
                            v-model="realState.title"
                            ref="title"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Link completo (incluye http/https) *</label>
                        <input 
                            v-model="realState.link"
                            :class="realState.link.isValidLink() > 0 ? 'is-valid' : 'is-invalid'"
                            ref="link"
                            type="text" class="form-control" placeholder="Link de sitio inicial">
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-md-5">
                        <div class="card image-500-x-500 card-body shadow cursor-pointer z-zoom-element" :style="{'background-image':'url('+realState.image+')'}">
                            <div class="d-flex text-center h-100 align-items-center" @click="openFileManager">
                                <div class="row justify-content-center w-100">
                                    <div class="col-12">
                                        <div class="text-muted">
                                            <span :class="realState.image ? 'text-white' :'text-dark'" v-text="realState.image ? 'Actualizar imagen' : 'Subir imagen'"></span>
                                            
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

export { AddrealstateViewer } 