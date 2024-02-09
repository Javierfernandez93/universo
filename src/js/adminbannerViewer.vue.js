import { UserSupport } from '../../src/js/userSupport.module.js?t=1.1.5'   

const AdminbannerViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            banners : null,
            bannersAux : null,
            query : null,
            columns: { // 0 DESC , 1 ASC 
                title: {
                    name: 'title',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                link: {
                    name: 'link',
                    desc: false,
                },
            }
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.banners.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if (column.alphabetically) {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        filterData() {
            this.banners = this.bannersAux
            this.banners = this.banners.filter((banner) => {
                return banner.title.toLowerCase().includes(this.query.toLowerCase()) || banner.link.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getBanners() {
            this.banners = null
            this.UserSupport.getBanners({},(response)=>{
                if(response.s == 1)
                {
                    this.banners = response.banners
                }
            })
        },
        saveBanner(banner) {
            banner.busy = true
            this.UserSupport.saveBanner({banner:banner},(response)=>{                
                if(response.s == 1)
                {
                    banner.busy = false
                }
            })
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile(target,banner) 
        {
            let files = $(target).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.UserSupport.uploadImageBanner(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                banner.image = response.target_path
              }
            });
        },
        editBanner(banner) {
            window.location.href = `../../apps/admin-banner/edit?bid=${banner.banner_id}`
        },
        setBannerStatus(banner,status) {
            this.UserSupport.setBannerStatus({banner_id:banner.banner_id,status:status}, (response) => {
                if (response.s == 1) {
                    banner.status = status

                    if (status == 1) {
                        toastInfo({
                            message: 'Banner habilitado',
                        })
                    } else if (status == 0) {
                        toastInfo({
                            message: 'Banner deshabilitado',
                        })
                    } else if (status == -1) {
                        this.getBanners()
                    }
                }
            })
        },
    },
    mounted() 
    {   
        this.getBanners()
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="banners" class="badge text-secondary p-0">Total {{banners.length}}</span>
                                <div class="h5">
                                    Banners
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-banner/add" class="btn btn-sm px-3 mb-0 shadow-none btn-success">Agregar banner</a>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>


                        <div v-if="query" class="alert alert-light text-center text-dark">Resultados de la búsqueda <b>{{query}}</b> ({{banners.length}} resultados)</div>
                    </div>
                    <div v-if="banners" class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th @click="sortData(columns.title)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Título</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.link)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.link.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Link</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Ingreso</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="banner in banners">
                                        <td class="align-middle text-capitalize text-center text-sm">
                                            <span v-if="banner.status == '1'" class="badge bg-success">Activo</span>
                                            <span v-if="banner.status == '0'" class="badge bg-secondary">Inactivo</span>
                                            
                                            <div>
                                                {{banner.title}} 
                                            </div>
                                        </td>
                                        <td class="align-middle text-decoration-underline text-primary fw-bold text-center text-sm">
                                            {{banner.link}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            {{banner.create_date.formatFullDate()}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 mb-0 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editBanner(banner)">Editar</button>
                                                    </li>
                                                    <li v-if="banner.status == '1'">
                                                        <button class="dropdown-item" @click="setBannerStatus(banner,0)">Inhabilitar</button>
                                                    </li>
                                                    <li v-if="banner.status == '0'">
                                                        <button class="dropdown-item" @click="setBannerStatus(banner,1)">Habilitar</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" @click="setBannerStatus(banner,-1)">Eliminar</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminbannerViewer } 