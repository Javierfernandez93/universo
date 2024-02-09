import { UserSupport } from './userSupport.module.js?v=2.3.7'   

const AddpropertyViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            real_states: null,
            filled: false,
            property: {
                real_state_id: null,
                down_payment_price: null,
                title: null,
                price: null,
                size: null,
                single_price: null,
            },
        }
    },
    watch : {
        property : {
            handler() {
              this.filled = this.property.real_state_id && this.property.down_payment_price && this.property.title && this.property.price && this.property.size && this.property.single_price 
            },
            deep: true
        },
    },
    methods: {
        saveProperty() 
        {
            this.UserSupport.saveProperty({property:this.property},(response)=>{
                if(response.s == 1)
                {
                    toastInfo({
                        message: 'Propiedad guardada. redirigiendo...',
                    })

                    setTimeout(() => {  
                        window.location.href = '../../apps/admin-properties'
                    },3000)
                }
            })
        },
        getCatalogRealState() 
        {
            this.UserSupport.getCatalogRealState({},(response)=>{
                if(response.s == 1)
                {
                    this.real_states = response.real_states
                }
            })
        },
    },
    mounted() 
    {   
        this.getCatalogRealState()
    },
    template : `
        <div class="card">
            <div class="card-header"> 
                <div class="row justify-content-center"> 
                    <div class="col-12 col-xl"> 
                        <div class="h5">Añadir propiedad</div>
                        <div class="text-xs text-secondary">(* Campos requeridos)</div>
                    </div>
                    <div class="col-12 col-xl-auto"> 
                        <button 
                            :disabled="!filled"
                            ref="button"
                            type="submit" class="btn shadow-none mb-0 btn-success px-3 btn-sm" @click="saveProperty">Guardar propiedad</button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Nombre propiedad *</label>
                        <input 
                            :autofocus="true"
                            :class="property.title ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.price.focus()"
                            v-model="property.title"
                            ref="title"
                            type="text" class="form-control" placeholder="Nombre(s)">
                    </div>

                    <div class="col-12 col-xl-6 mb-3">
                        <div class="form-floating">
                            <select class="form-select" v-model="property.real_state_id" id="real_state_id" aria-label="Gestor">
                                <option v-for="real_state in real_states" v-bind:value="real_state.real_state_id">
                                    {{ real_state.title }}
                                </option>
                            </select>
                            <label for="real_state_id">Gestor</label>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Precio *</label>
                        <input 
                            v-model="property.price"
                            :class="property.price > 0 ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.down_payment_price.focus()"
                            ref="price"
                            type="number" class="form-control" placeholder="Precio">
                    </div>
                    
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Precio apartado *</label>
                        <input 
                            v-model="property.down_payment_price"
                            :class="property.down_payment_price > 0 ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.size.focus()"
                            ref="down_payment_price"
                            type="number" class="form-control" placeholder="Precio apartado">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Tamaño *</label>
                        <input 
                            v-model="property.size"
                            :class="property.size > 0 ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="$refs.single_price.focus()"
                            ref="size"
                            type="number" class="form-control" placeholder="Tamaño">
                    </div>
                    <div class="col-12 col-xl-6 mb-3">
                        <label>Precio m2 *</label>
                        <input 
                            v-model="property.single_price"
                            :class="property.single_price > 0 ? 'is-valid' : 'is-invalid'"
                            @keydown.enter.exact.prevent="saveProperty"
                            ref="single_price"
                            type="number" class="form-control" placeholder="Precio m2">
                    </div>
                    
                </div>

                <div v-if="feedback" class="alert alert-secondary text-white text-center"> {{feedback}} </div>
            </div>
        </div>
    `,
}

export { AddpropertyViewer } 