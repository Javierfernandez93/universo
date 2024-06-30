import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.3'   
import LoaderViewer from '../../src/js/loaderViewer.vue.js?v=1.0.3' 
import HighLigth from '../../src/js/components/HighLigth.vue.js?v=1.0.3'

const AdminconfigViewer = {
    components : {
        LoaderViewer,
        HighLigth
    },
    data() {
        return {
            UserSupport: new UserSupport,
            busy : false,
            systemVars : [],
            systemVarsAux : [],
            busy : false,
            query : null,
        }
    },
    watch: {
        query() {
             this.systemVars = this.systemVarsAux.filter((systemVar) => {
                return systemVar.description.toLowerCase().includes(this.query.toLowerCase()) 
                || systemVar.name.toLowerCase().includes(this.query.toLowerCase()) 
            })
        }
    },
    methods: {
        getSystemVars() {
            this.busy = true
            this.systemVars = []
            this.systemVarsAux = []
            this.UserSupport.getSystemVars({catalog_system_var_id:this.id},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.systemVars = response.systemVars
                    this.systemVarsAux = response.systemVars
                }
            })
        },
        saveSystemVars() {
            this.UserSupport.saveSystemVars({},(response)=>{
                if(response.s == 1)
                {
                    this.systemVars = response.systemVars
                }
            })
        },
        saveSystemVar(systemVar) {
            systemVar.busy = true
            this.UserSupport.saveSystemVar({systemVar:systemVar},(response)=>{
                systemVar.busy = false
                
                if(response.s == 1)
                {
                    toastInfo({
                        message: `Se ha guardado correctamente`,
                    })
                }
            })
        },
    },
    mounted() 
    {   
        this.getSystemVars()
    },
    template : `
        <LoaderViewer :busy="busy"/>
        
        <div class="container">
            <div class="card">
                <div class="card-header pb-0">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl-auto">
                            <i class="bi bi-gear-fill"></i>
                        </div>
                        <div class="col-12 col-xl h5 mb-0">
                            Ajustes del sitio
                        </div>
                    </div>
                </div>
                    
                <HighLigth :busy="busy" :dataLength="systemVars.length" :query="query"/>

                <div v-if="systemVars.length > 0" class="card-body">
                    <div v-for="systemVar in systemVars" class="card overflow-hidden border border-light mb-3">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl">
                                    {{systemVar.title}}
                                </div>
                                <div class="col-12 col-xl-auto">
                                    <button @click="systemVar.show = !systemVar.show" class="btn btn-light btn-sm px-3 mb-0 shadow-none">
                                        <i class="bi bi-eye-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-if="systemVar.show" class="card-body">
                            <ul class="list-group list-group-flush">
                                <li v-for="_var in systemVar.vars" class="list-group-item border-0">
                                    <div class="row align-items-center">
                                        <div class="col-12 col-xl">
                                            <div class="form-floating">
                                                <input v-model="_var.val" :id="_var.name" @keypress.exact.enter="saveSystemVar(_var)" :class="_var.val ? 'is-valid' : 'is-invalid'" type="text" class="form-control px-" :placeholder="_var.description" :aria-label="_var.description" aria-describedby="basic-addon1">
                                                <label :for="_var.name">
                                                    {{_var.description}}

                                                    <span class="text-secondary ms-2 badge border border-light">
                                                        {{_var.name}}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <button @click="saveSystemVar(_var)" class="btn btn-primary btn-sm px-3 mb-0 shadow-none">
                                                <i class="bi bi-check-circle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminconfigViewer }