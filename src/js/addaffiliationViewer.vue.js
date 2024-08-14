import { UserSupport } from './userSupport.module.js?v=1.1.6'   
import { BackViewer } from './backViewer.vue.js?v=1.1.6'   

const AddaffiliationViewer = {
    components : {
        BackViewer
    },
    data() {
        return {
            UserSupport : new UserSupport,
            real_states: null,
            filled: false,
            loaded : false,
            affiliation: {
                affiliation_id: null,
                name: null
            },
        }
    },
    watch : {
        affiliation : {
            handler() {
              this.filled = this.affiliation.name
            },
            deep: true
        },
    },
    methods: {
        saveAffiliation() 
        {
            this.UserSupport.saveAffiliation({affiliation:this.affiliation},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'afiliación guardada. redirigiendo...',
                    })

                    setTimeout(() => {  
                        window.location.href = '../../apps/admin-affiliation'
                    },3000)
                }
            })
        },
        getAffiliationForEdit() 
        {
            this.UserSupport.getAffiliationForEdit({affiliation_id:this.affiliation.affiliation_id},(response)=>{
                if(response.s == 1)
                {
                    this.affiliation = response.affiliation
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
          
            this.UserSupport.uploadImageaffiliation(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.affiliation.image = response.target_path
              }
            });
        },
    },
    mounted() 
    { 
        if(getParam("aid"))
        {
            this.loaded = true
            this.affiliation.affiliation_id = getParam("aid")

            this.getAffiliationForEdit()
        } else {
            this.loaded = true
        }
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center align-items-center"> 
                    <div class="col-12 col-xl-auto"> 
                        <BackViewer/>
                    </div>
                    <div class="col-12 col-xl"> 
                    
                        <p v-if="!loaded" class="placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </p>

                        <span v-else class="h5" v-text="affiliation.affiliation_id ? 'Editar afiliación' : 'Añadir afiliación'"></span>

                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveAffiliation">
                            <span v-text="affiliation.affiliation_id ? 'Editar afiliación' : 'Guardar afiliación'"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-12 mb-3">
                        <label>Nombre afiliación *</label>
                        <input 
                            :autofocus="true"
                            :class="affiliation.name ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.price.focus()"
                            v-model="affiliation.name"
                            ref="name"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { AddaffiliationViewer } 