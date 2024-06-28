import { UserSupport } from './userSupport.module.js?v=1.0.2'   
import LoaderViewer from './loaderViewer.vue.js?v=1.0.2'
import BackButton from './components/backButton.vue.js?v=1.0.2'

const AddrealstateViewer = {
    components : {
        LoaderViewer,
        BackButton
    },  
    data() {
        return {
            UserSupport : new UserSupport,
            real_states: null,
            filled: false,
            loaded : false,
            real_state_developers : false,
            realState: {
                real_state_id: null,
                title: null,
                link: '',
                real_state_developer_id: null,
                sold_out: false,
                main: false,
                image: null
            },
        }
    },
    watch : {
        realState : {
            handler() {
              this.filled = this.realState.title  != null
              && this.realState.image  != null
              && this.realState.real_state_developer_id != null
            },
            deep: true
        },
    },
    methods: {
        getRealStateDevelopers() {
            return new Promise((resolve) => {
                this.UserSupport.getRealStateDevelopers({realState:this.realState},async (response)=>{
                    if(response.s == 1)
                    {
                        this.real_state_developers = response.real_state_developers

                        await sleep(100)
                          
                        $('.selectpicker').selectpicker();
                        $('.selectpicker').change(() =>{
                            this.realState.real_state_developer_id = $('.selectpicker').val();
                        });

                        this.realState.real_state_developer_id = this.real_state_developers[0].real_state_developer_id
                    }

                    resolve()
                })
            })
        },
        saveRealState() {
            this.busy = true
            this.UserSupport.saveRealState({realState:this.realState},async (response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Desarrolladora guardada. redirigiendo...',
                    })

                    await sleep(3000)   
                    
                    window.location.href = '../../apps/admin-realstate'
                }
            })
        },
        getRealStateForEdit() {
            this.busy = true
            this.UserSupport.getRealStateForEdit({real_state_id:this.realState.real_state_id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.realState = response.realState

                    $('.selectpicker').val(this.realState.real_state_developer_id)
                    $('.selectpicker').selectpicker('refresh');
                }
            })
        },
        openFileManager()  {
            this.$refs.file.click()
        },
        uploadFile()  {
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
    async mounted() 
    { 
        await this.getRealStateDevelopers()

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
        <LoaderViewer :busy="busy" />

        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <BackButton/>
                    </div>
                    <div class="col-12 col-xl"> 
                        <p v-if="!loaded" class="placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </p>

                        <div class="h5">
                            <span v-else v-text="realState.real_state_id ? 'Editar' : 'Añadir'"></span> Proyecto
                        </div>

                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveRealState">
                            <span v-text="realState.real_state_id ? 'Editar' : 'Guardar'"></span> Proyecto
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-6">
                        <div class="mb-3">
                            <label>Nombre desarrolladora *</label>
                            <input 
                                :autofocus="true"
                                :class="realState.title ? 'is-valid' : 'is-invalid'"
                                @keydown.enter.exact.prevent="$refs.price.focus()"
                                v-model="realState.title"
                                ref="title"
                                type="text" class="form-control" placeholder="Nombre(s)">
                        </div>
                        <div class="mb-3">
                            <label>Link completo (incluye http/https) *</label>
                            <input 
                                v-model="realState.link"
                                :class="realState.link.isValidLink() > 0 ? 'is-valid' : ''"
                                ref="link"
                                type="text" class="form-control" placeholder="Link de sitio inicial">
                        </div>
                        <div v-if="real_state_developers" class="mb-3">
                            <label>Desarrolladora *</label>
                            <select class="selectpicker form-control" data-live-search="true" data-style="border shadow-none">
                                <option v-for="real_state_developer in real_state_developers" :data-tokens="real_state_developer.name" :data-content="real_state_developer.name">{{ real_state_developer.real_state_developer_id }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input v-model="realState.main" class="form-check-input" type="checkbox" role="switch" id="main">
                                <label class="form-check-label" for="main">Primer etapa</label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-check form-switch">
                                <input v-model="realState.sold_out" class="form-check-input" type="checkbox" role="switch" id="sold_out">
                                <label class="form-check-label" for="sold_out">Sold out</label>
                            </div>
                        </div>
                    </div>
                
                    <div class="col-12 col-md-5">
                        <small class="mb-3">
                            * Imagen de portada requerida
                        </small>
                        <div class="card image-500-x-500 card-body border border-secondary cursor-pointer z-zoom-element" :style="{'background-image':'url('+realState.image+')'}">
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