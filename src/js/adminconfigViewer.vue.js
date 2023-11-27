import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.5'   

const AdminconfigViewer = {
    name : 'adminconfig-viewer',
    props : ['title','id'],
    data() {
        return {
            UserSupport: new UserSupport,
            systemVars : null,
            systemVarsAux : null,
            busy : false,
            query : null,
        }
    },
    methods: {
        getSystemVars() {
            this.UserSupport.getSystemVars({catalog_system_var_id:this.id},(response)=>{
                if(response.s == 1)
                {
                    this.systemVars = response.systemVars
                }
            })
        },
        updateSystemVar() {
            this.UserSupport.updateSystemVar({},(response)=>{
                if(response.s == 1)
                {
                    this.systemVars = response.systemVars
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

                }
            })
        },
    },
    mounted() 
    {   
        this.getSystemVars()
    },
    template : `
        <div v-if="systemVars" class="card">
            <div class="card-header h4">
                {{title}}
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li v-for="systemVar in systemVars" class="list-group-item py-3 border-0">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-4">
                                <label :for="systemVar.name">{{systemVar.description}}</label>
                                <div class="text-xs mt-n1 ms-1 text-secondary">
                                    {{systemVar.name}}
                                </div>
                            </div>
                            <div class="col-12 col-xl">
                                <div class="input-group">
                                    <input v-model="systemVar.val" :id="systemVar.name" @keypress.exact.enter="saveSystemVar(systemVar)" :class="systemVar.val ? 'is-valid' : 'is-invalid'" type="text" class="form-control px-3" :placeholder="systemVar.description" :aria-label="systemVar.description" aria-describedby="basic-addon1">
                                </div>
                                <div v-if="systemVar.label" class="form-text">
                                    {{systemVar.label}}
                                </div>
                            </div>
                            <div v-if="systemVar.busy" class="col-auto">
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
}

export { AdminconfigViewer }