import { User } from '../../src/js/user.module.js?v=2.4.2'   

const WithdrawmethodsViewer = {
    name : 'withdrawmethods-viewer',
    data() {
        return {
            User: new User,
            withdrawMethods : ''
        }
    },
    methods: {
        toggleEditing: function (withdrawMethod) {
            withdrawMethod.editing = !withdrawMethod.editing
        },
        getWithdrawsMethods: function () {
            return new Promise((resolve, reject) => {
                this.User.getWithdrawsMethods({  }, (response) => {
                    if (response.s == 1) {
                        resolve(response.withdrawMethods)
                    }

                    reject()
                })
            })
        },
        editWithdrawMethod: function (withdrawMethod) {
            this.User.editWithdrawMethod(withdrawMethod, (response) => {
                if (response.s == 1) {
                    this.toggleEditing(withdrawMethod)
                }
            })
        },
    },
    mounted() 
    {       
        this.getWithdrawsMethods().then((withdrawMethods)=>{
            this.withdrawMethods = withdrawMethods
        }).catch((error) => { this.withdrawMethods = false })
    },
    template : `
        <div class="card bg-transparent shadow-none mt-4 overflow-hidden border-radius-xl">
            <div class="card-header bg-transparent">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="mb-0">Método de retiro</h6>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group list-group">
                    <li
                        v-for="withdrawMethod in withdrawMethods"
                        class="list-group-item border-0">
                        
                        <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                            <img class="w-10 me-3 mb-0" :src="withdrawMethod.image" alt="logo">
                            <div class="w-100">
                                <div>
                                    <div class="mb-1 text-primary fw-semibold">
                                        <img :src="withdrawMethod.catalog_currency.image" style="width:1.5rem">
                                        {{withdrawMethod.method}} - {{withdrawMethod.catalog_currency.currency}} <span class="badge bg-primary">{{withdrawMethod.catalog_currency.description}}</span>
                                    </div>
                                </div>
                                <div v-if="!withdrawMethod.editing"
                                    @click="toggleEditing(withdrawMethod)">
                                    <div v-if="withdrawMethod.wallet"
                                        class="text-truncate">
                                        <h6 class="mb-0">{{withdrawMethod.wallet}}</h6>
                                    </div>
                                    <div v-else class="cursor-pointer">
                                        <u>Configurar cuenta</u>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="row align-items-center mt-3">
                                        <div class="col-12 col-xl">
                                            <div class="form-floating">
                                                <input 
                                                    v-model="withdrawMethod.wallet"
                                                    placeholder="Wallet address"
                                                    type="text" class="form-control"/>

                                                <label>Wallet address</label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <button 
                                                :disabled="!withdrawMethod.wallet"
                                                @click="editWithdrawMethod(withdrawMethod)"
                                                class="btn btn-primary shadow-none mb-0">Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span 
                                v-if="!withdrawMethod.editing"
                                @click="toggleEditing(withdrawMethod)"
                                class="ms-auto">
                                <i class="fas fa-pencil-alt text-dark cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="top" aria-hidden="true" aria-label="Edit Card"></i>
                                <span class="sr-only">Editar tarjeta</span>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
}

export { WithdrawmethodsViewer } 