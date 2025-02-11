import { UserSupport } from './userSupport.module.js?v=1.1.8'   

const AdddeveloperViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            developers: null,
            filled: false,
            loaded : false,
            realStateDeveloper: {
                real_state_developer_id: null,
                name: null
            },
        }
    },
    watch : {
        realStateDeveloper : {
            handler() {
              this.filled = this.realStateDeveloper.name 
            },
            deep: true
        },
    },
    methods: {
        saveRealStateDeveloper() 
        {
            this.UserSupport.saveRealStateDeveloper({realStateDeveloper:this.realStateDeveloper},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Desarrolladora guardada. redirigiendo...',
                    })

                    setTimeout(() => {  
                        window.location.href = '../../apps/admin-developer'
                    },3000)
                }
            })
        },
        getRealStateDeveloperForEdit() 
        {
            this.UserSupport.getRealStateDeveloperForEdit({real_state_developer_id:this.realStateDeveloper.real_state_developer_id},(response)=>{
                if(response.s == 1)
                {
                    this.realStateDeveloper = response.realStateDeveloper
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
          
            this.UserSupport.uploadImageRealStateDeveloper(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.realStateDeveloper.image = response.target_path
              }
            });
        },
    },
    mounted() 
    { 
        if(getParam("rsdid"))
        {
            this.loaded = true
            this.realStateDeveloper.real_state_developer_id = getParam("rsdid")

            this.getRealStateDeveloperForEdit()
        } else {
            this.loaded = true
        }
    },
    /* html */
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl"> 
                    
                        <p v-if="!loaded" class="placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </p>

                        <span v-else class="h5" v-text="realStateDeveloper.real_state_developer_id ? 'Editar desarrolladora' : 'Añadir desarrolladora'"></span>

                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveRealStateDeveloper">
                            <span v-text="realStateDeveloper.real_state_developer_id ? 'Editar desarrolladora' : 'Guardar desarrolladora'"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-12 mb-3">
                        <label>Nombre desarrolladora *</label>
                        <input 
                            :autofocus="true"
                            :class="realStateDeveloper.name ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.price.focus()"
                            v-model="realStateDeveloper.name"
                            ref="name"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { AdddeveloperViewer } 