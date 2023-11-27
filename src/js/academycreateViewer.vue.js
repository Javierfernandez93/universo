import { User } from '../../src/js/user.module.js?v=2.3.4'   

const AcademycreateViewer = {
    name : 'academycreate-viewer',
    data() {
        return {
            User: new User,
            marketingFields: null,
        }
    },
    watch : {
        // query : {
        //     handler() {
        //         this.filterData()
        //     },
        //     deep: true
        // }
    },
    methods: {
        saveMarketingField(field) {
            this.User.saveMarketingField(field,(response)=>{
                if(response.s == 1)
                {
                    field.saved = true
                    // alertInfo({
                    //     icon:'<i class="bi bi-ui-checks"></i>',
                    //     message: 'Hemos enviado la información',
                    //     _class:'bg-gradient-success text-white'
                    // })
                } else if(response.r == "NOT_DATA") {
                    field.saved = true
                    // alertInfo({
                    //     icon:'<i class="bi bi-x"></i>',
                    //     message: 'Debes de llenar la información',
                    //     _class:'bg-gradient-danger text-white'
                    // })
                }
            });
        },
        getRadioValue(field)
        {
            return new Promise((resolve) =>{
                resolve($(`[name=${field.name}]:checked`).val() == field.value);
            })
        },
        uploadImage(field)
        {
            return new Promise((resolve, reject) =>{
                let files = $(`#${field.name}`).prop('files');
                var form_data = new FormData();

                if(files != undefined)
                {
                    form_data.append("file", files[0]);
                  
                    this.User.uploadMarketingImage(form_data,null,(response)=>{
                        if(response.s == 1)
                        {
                            resolve(response.target_path)
                        }
                    });
                } else {
                    reject()
                }
            })
        },
        saveComponent(component)
        {
            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de guardar esta información?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            
                            for(let field of component.data)
                            {
                                this.proccessfield(field).then((_field)=>{
                                    field = _field
                                })
                            }

                            this.saveMarketingField(component)
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        processfields(components)
        {
            for(let component of components)
            {
                for(let field of component.data)
                {
                    this.proccessfield(field).then((_field)=>{
                        field = _field
                    })
                }

                component.saved = true
                
                this.saveMarketingField(component)
            }
        },
        proccessfield(field)
        {
            return new Promise((resolve, reject) =>{
                if(field.type == 'file') {
                    this.uploadImage(field).then((src)=>{
                        field.src = src
                    }).catch((error)=>{
    
                    })
                } else if(field.type == 'radio') {
                    this.getRadioValue(field).then((selected)=>{
                        field.selected = selected
                    })
                }
    
                resolve(field)
            })
        },
        sendBasicMarketingInfo(fields)
        {
            this.processfields(fields) 
            
            console.log(fields)
        },
        getAllPendingFields() {
            return new Promise((resolve,reject) => {
                this.User.getAllPendingFields({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.marketingFields)
                    }

                    reject()
                })
            })
        },
        getAllPendingFieldsMain() {
            this.getAllPendingFields().then((marketingFields)=>{
                this.marketingFields = marketingFields
            }).catch(() => {
                this.marketingFields = false
            })
        },
    },
    mounted() {
        this.getAllPendingFieldsMain()
    },
    template : `
        <div v-if="marketingFields" class="row justify-content-center">
           <div class="col-12">
                <div v-for="marketingField in marketingFields" class="row mb-5">
                    <div v-if="marketingField.type == 'info'" class="mb-3">
                        <div class="fs-4 fw-semibold text-danger text-center">Completa todos los datos</div>
                    </div>
                    <div v-else-if="marketingField.type == 'post'" class="mb-3">
                        <div class="fs-4 mb-3 fw-semibold text-danger text-center">¡Hora de crear!</div>
                        <div class="lead text-dark text-center">
                            <p>
                                Completa todos los campos con la información que requieres para tus piezas, usaremos esta información para crear tus Post, Historias y Reels.
                            </p>
                            <p>
                                Recuerda que tienes un plazo máximo de 7 días para compartirnos toda la información.
                            </p>
                        </div>
                    </div>

                    <div v-if="marketingField.fields" class="row">
                        <div class="col-12">
                            <div v-for="field in marketingField.fields" class="card mb-3">
                                <div class="card-header" v-if="field.title">
                                    <div class="row">
                                        <div class="col-12 col-xl fs-5 text-primary">
                                            {{field.title}}
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div v-if="field.saved" class="text-success">
                                                Guardado
                                            </div>
                                            <div v-else-if="field.saved == false" class="text-danger">
                                                Error al guardar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div v-if="field.description">{{field.description}}</div>
                                    
                                    <div v-if="field.data">
                                        <div v-for="input in field.data">
                                            <div v-if="input.type == 'radio'">
                                                <div class="form-check">
                                                    <label v-if="input.label" :for="input.label.for">{{input.label.title}}</label>
                                                    <input :type="input.type" v-model="input.value" :value="input.value" :name="input.name" :class="input.class" :id="input.id" :placeholder="input.placeholder"/>
                                                </div>
                                            </div>
                                            <div v-else-if="['text','file','color'].includes(input.type)">
                                                <div class="">
                                                    <label v-if="input.label" :class="input.label.class" :for="input.label.for">{{input.label.title}}</label>
                                                    <input :type="input.type" v-model="input.value" :name="input.name" :class="input.class" :id="input.id" :placeholder="input.placeholder"/>
                                                </div>

                                                <div v-if="input.buttons" class="d-flex justify-content-end mt-3">
                                                    <div v-for="button in input.buttons">
                                                        <button :id="button.id" @click="saveComponent(field)" :class="button.class">{{button.text}}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="input.type == 'textarea'">
                                                <div class="form-floating">
                                                    <textarea class="form-control" v-model="input.value" :placeholder="input.placeholder" :id="input.id" style="height: 100px"></textarea>
                                                    <label :for="input.for">{{input.placeholder}}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button v-if="marketingField.type == 'info'" @click="sendBasicMarketingInfo(marketingField.fields)" class="btn btn-primary shadow-none btn-lg">Enviar información basica</button>
                        </div>
                    </div>

                    <hr/>
                </div>
            </div>
        </div>
        <div v-else-if="marketingFields == false" class="card bg-transparent shadow-none">
            <div class="card-body text-center">
                Aún no tienes un paquete de marketing. Adquierelo <a href="../../apps/store/package?cptid=2">aquí</a>
            </div>
        </div>
    `,
}

export { AcademycreateViewer } 