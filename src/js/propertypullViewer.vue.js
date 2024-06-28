import { User } from '../../src/js/user.module.js?v=1.0.1'   

const PropertypullViewer = {
    emit : ['refresh'],
    data() {
        return {
            User: new User,
            catalog_payment_methods: null,
            user_login_id: null,
            property: null
        }
    },
    methods : {
        pull(property,user_login_id) {
            this.property = property
            this.user_login_id = user_login_id

            $(this.$refs.offcanvasRight3).offcanvas('show')
            
            setTimeout(()=>{
                $(this.$refs.offcanvasRight3).offcanvas('show')
            },500)
        },
        hide()
        {
            $(this.$refs.offcanvasRight3).offcanvas('hide')
        },
        openFileManager(id) 
        {
            $(`#${id}`).click()
        },
        uploadFile(event,target,user_login_id) 
        {
            let files = $(event.target).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
            form_data.append("user_login_id", user_login_id);
            
            this.User.uploadImageProperty(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                this.property.image = response.target_path
              }
            });
        },
        pullProperty()
        {
            this.User.pullProperty({property_id:this.property.property_id,image:this.property.image,user_login_id:this.user_login_id},(response)=>{
                if(response.s == 1)
                {
                    this.hide()

                    toastInfo({
                        message: "Se ha apartado la propiedad",
                    })

                    this.$emit('refresh')
                }
            })
        },
        getCatalogPaymentMethods()
        {
            this.User.getCatalogPaymentMethods({},(response)=>{
                if(response.s == 1)
                {
                    this.catalog_payment_methods = response.catalog_payment_methods
                }
            })
        }
    },
    mounted() 
    {       
        this.getCatalogPaymentMethods()
    },
    template : `
        <div class="offcanvas offcanvas-end" tabindex="-1" ref="offcanvasRight3" id="offcanvasRight3" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">Comprar propiedad</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="card card-body">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Propiedad
                                </div>
                                <div class="col-12 col-xl-auto">
                                    {{property.title}}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Gestor
                                </div>
                                <div class="col-12 col-xl-auto">
                                    {{property.real_state}}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Precio apartado
                                </div>
                                <div class="col-12 col-xl-auto">
                                    $ {{property.down_payment_price.numberFormat(2)}} MXN
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Precio 
                                </div>
                                <div class="col-12 col-xl-auto">
                                    $ {{property.price.numberFormat(2)}} MXN
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Fecha de apertura
                                </div>
                                <div class="col-12 col-xl-auto">
                                    {{property.create_date.formatFullDate()}}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col-12 col-xl text-xs text-secondary">
                                    Comprobante de pago
                                </div>
                                <div class="col-12 col-xl-auto">
                                    <div class="text-success" v-if="property.image">
                                        Enviado <i class="bi bi-check"></i>
                                    </div>
                                    <div v-else>
                                        <input class="d-none" @change="uploadFile($event,property,user_login_id)" :id="property.property_id" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                        <button type class="btn btn-dark shadow-none mb-0 px-3 btn-sm" @click="openFileManager(property.property_id)">Subir</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-if="catalog_payment_methods" class="my-3">
                        <div v-for="catalog_payment_method in catalog_payment_methods">
                            <div class="row justify-content-center mb-3">
                                <div class="col-12 col-xl">
                                    {{catalog_payment_method.payment_method}}

                                    <div class="text-xs text-secondary">{{catalog_payment_method.description}}</div>
                                </div>
                            </div>

                            <ul v-for="catalog_payment_method in catalog_payment_methods" class="list-group">
                                <li v-for="(data,key) in catalog_payment_method.additional_data" class="list-group-item">
                                    {{key}} {{data}}
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                    <div v-if="property.image" class="card-footer">
                        <div class="row">
                            <div class="col-12">
                                <div class="d-grid">
                                    <button class="btn btn-primary" @click="pullProperty"> Apartar propiedad </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { PropertypullViewer }