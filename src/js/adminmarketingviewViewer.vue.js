import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.4'

const AdminmarketingviewViewer = {
    name : 'adminmarketingview-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            marketingData: null,
        }
    },
    methods: {
        copyToClipboard(text,target) {   
            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Listo'
            })
        },
        openFileManager(catalog_marketing_field_id)
        {
            $(`#${catalog_marketing_field_id}`).click()
        },
        uploadImage(field)
        {
            let files = $(`#${field.catalog_marketing_field_id}`).prop('files');
            var form_data = new FormData();

            if(files != undefined)
            {
                form_data.append("file", files[0]);
                
                this.UserSupport.uploadMarketingImageFeedback(form_data,null,(response)=>{
                    if(response.s == 1)
                    {
                        field.fileFeedback = response.target_path

                        this.UserSupport.attachFeedBackToMarketing({marketing_field_per_user_id:field.marketing_field_per_user_id,feedback:field.fileFeedback},(response)=>{
                            if(response)
                            {
                                console.log("done")
                            }
                        })
                    }
                });
            }
        },
        getAllAdminMarketingData(company_id) {
            return new Promise((resolve,reject) => {
                this.UserSupport.getAllAdminMarketingData({company_id:company_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.marketingData)
                    }

                    reject()
                })
            })
        },
    },
    mounted() {
        if(getParam("cid"))
        {
            this.getAllAdminMarketingData(getParam("cid")).then((marketingData) => {
                this.marketingData = marketingData
            })
        }
    },
    template : `
        <div v-if="marketingData">
            <div v-for="data in marketingData" class="card mb-3">
                <div class="card-header">
                    <div v-if="data.type == 'info'" class="fs-4 fw-semibold text-primary">Información</div>
                    <div v-else-if="data.type == 'post'" class="fs-4 fw-semibold text-primary">Post</div>
                    <div v-else-if="data.type == 'history'" class="fs-4 fw-semibold text-primary">Historias</div>
                    <div v-else-if="data.type == 'reel'" class="fs-4 fw-semibold text-primary">Reel</div>
                </div>
                <div v-for="field in data.fields" class="mb-3">
                    <div class="card-body border-bottom">
                        <div v-if="field.title" class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div class="h4 fw-semibold text-dark">
                                    {{field.title}}
                                </div>
                            </div>

                            <div v-if="field.fileFeedback" class="col-12 col-xl-auto">
                                <img :src="field.fileFeedback" class="img-fluid img-thumbnail" alt="feedback"/>
                            </div>
                            <div v-if="field.feedback" class="col-12 col-xl-auto">
                                <button @click="openFileManager(field.catalog_marketing_field_id)" class="btn btn-success px-3 btn-lg shadow-none">subir imagen</button>
                                <input type="file" class="d-none" @change="uploadImage(field)" :id="field.catalog_marketing_field_id" accept=".png,.jpg,.jpeg,.gif"/>
                            </div>
                        </div>
                        
                        <div v-if="field.value">
                            <div v-for="input in field.value">
                                <div v-if="input.value" class="mb-3">
                                    <div v-if="input.type == 'radio'">
                                        <div class="form-check">
                                            <label v-if="input.label" :for="input.label.for">
                                                {{input.label.title}}
                                            </label>
                                            <input :type="input.type" v-model="input.value" :checked="input.selected == 'true'" :value="input.value" :name="input.name" :class="input.class" :id="input.id" :placeholder="input.placeholder"/>
                                        </div>
                                    </div>
                                    <div v-else-if="['file'].includes(input.type)" class="row align-items">
                                        <div class="col-12 col-xl">
                                            <img :src="input.src" class="img-thumbnail img-fluid" alt="logo" title=""/>
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="d-grid">
                                                <a class="btn btn-primary btn-sm px-3 shadow-none" target="_blank" :href="input.src">Ver imagen</a>
                                            </div>
                                            <div class="d-grid">
                                                <a class="btn btn-primary btn-sm px-3 shadow-none" :href="input.src" download>Descargar imagen</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="['text'].includes(input.type)" class="row align-items-end">
                                        <div class="col-12 col-xl lead">
                                            {{input.value}}
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="d-grid">
                                                <button class="btn btn-primary btn-sm px-3 mb-0 shadow-none" @click="copyToClipboard(input.value,$event.target)" :href="input.src">Copiar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="['color'].includes(input.type)" class="row">
                                        <div class="col-12 col-xl">
                                            <input :type="input.type" v-model="input.value" :name="input.name" :class="input.class" :id="input.id" :placeholder="input.placeholder"/>
                                            {{input.value}}
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="d-grid">
                                                <button class="btn btn-primary btn-sm px-3 shadow-none" @click="copyToClipboard(input.value,$event.target)" :href="input.src">Copiar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="input.type == 'textarea'" class="row">
                                        <div class="col-12 col-xl lead">
                                            {{input.value}}
                                        </div>
                                        <div class="col-12 col-xl-auto">
                                            <div class="d-grid">
                                                <button class="btn btn-primary btn-sm px-3 shadow-none" @click="copyToClipboard(input.value,$event.target)" :href="input.src">Copiar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="alert alert-danger text-center text-white">
                            El usuario no ha subido esta información
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminmarketingviewViewer } 