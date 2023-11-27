import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.5'   

const AdminapisViewer = {
    name : 'adminapis-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            apis: null,
            apisAux: null,
            gettingGas: false,
            STATUS: { 
                DELETE : -1,
                INACTIVE : 0,
                ACTIVE : 1,
            },
            columns: { // 0 DESC , 1 ASC 
                user_api_id: {
                    name: 'user_api_id',
                    desc: false,
                },
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                sandbox: {
                    name: 'sandbox',
                    desc: false,
                },
                trx: {
                    name: 'trx',
                    desc: false,
                },
                name: {
                    name: 'name',
                    desc: false,
                    alphabetically: true,
                },
                address: {
                    name: 'address',
                    desc: false,
                    alphabetically: true,
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
            this.apis.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.apis = this.apisAux
            this.apis = this.apis.filter(api =>  api.name.toLowerCase().includes(this.query.toLowerCase()))
        },
        getAdminUserApis() {
            return new Promise((resolve, reject) =>{
                this.UserSupport.getAdminUserApis({},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.apis)
                    }

                    reject()
                })
            })
        },
        deleteUserApi(api) {
            this.UserSupport.deleteUserApi({user_api_id:api.user_api_id},(response)=>{
                if(response.s == 1)
                {
                    api.status = response.status   
                }
            })
        },
        getAdminTrx(data) {
            return new Promise((resolve, reject) =>{
                this.UserSupport.getAdminTrx(data,(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.trx)
                    }

                    reject()
                })
            })
        },
        getAdminTrxs() {
            this.gettingGas = true 

            for(let api of this.apis)
            {
                api.trx = 0

                this.getAdminTrx({address:api.address,sandbox:api.sandbox}).then((trx)=>{
                    api.trx = trx
                }).catch(() => {
                    api.trx = 0
                })
            }

            this.gettingGas = false
        }
    },
    mounted() 
    {       
        this.getAdminUserApis().then((apis)=>{
            this.apis = apis.map(api => {
                api.trx = 0
                return api
            })
            this.apisAux = apis
        })
    },
    template : `
    <div class="card border-radius-2xl mb-4">
        <div class="card-header pb-0">
            <div class="row align-items-center">
                <div v-if="apis" class="col fw-sembold text-primary">
                    <div><span class="badge bg-secondary text-xxs">Total {{apis.length}}</span></div>
                    <div class="fs-5">User api's list</div>
                </div>
                <div class="col-auto">
                    <button :disabled="gettingGas" @click="getAdminTrxs" class="btn btn-primary mb-0 shadow-none px-3 btn-sm">
                        <span v-if="gettingGas" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <span v-else>
                            Get gas
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="card-header">
            <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
        </div>
        <div v-if="apis" class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr class="align-items-center text-center">
                            <th @click="sortData(columns.user_api_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                <span v-if="columns.user_api_id.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">ID</u>
                            </th>
                            <th 
                                @click="sortData(columns.name)"
                                class="c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.name.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Usuario</u>
                            </th>
                            <th 
                                @click="sortData(columns.sandbox)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.sandbox.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Apis</u>
                            </th>
                            <th 
                                @click="sortData(columns.create_date)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.create_date.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Create date</u>
                            </th>
                            <th 
                                @click="sortData(columns.address)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.address.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Address</u>
                            </th>
                            <th 
                                @click="sortData(columns.trx)"
                                class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7">
                                <span v-if="columns.trx.desc">
                                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                </span>    
                                <span v-else>    
                                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                </span>    
                                <u class="text-sm ms-2">Gas</u>
                            </th>
                            <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="api in apis" class="text-center">
                            <td class="align-middle text-center">
                                {{api.user_api_id}}
                            </td>
                            <td class="align-middle">
                                {{api.name}}
                            </td>
                            <td class="align-middle">
                                <span v-if="!api.sandbox" class="badge bg-success">
                                    Live
                                </span>
                                <span v-else class="badge bg-secondary">
                                    Sandbox
                                </span>
                            </td>
                            <td class="align-middle">
                                {{api.create_date.formatFullDate()}}
                            </td>
                            <td class="align-middle">
                                {{api.trx.numberFormat(2)}}
                            </td>
                            <td class="align-middle text-xs">
                                <span class="text-break">
                                    <a :href="api.address.getTronScanAddress(api.sandbox)" target="_blank" class="text-decoration-underline text-primary cursor-pointer">
                                        {{api.address}}
                                    </a>
                                </span>
                            </td>
                            <td class="align-middle">
                                <span v-if="api.status == STATUS.DELETE" class="badge bg-danger">Deleted</span>
                                <span v-else-if="api.status == STATUS.INACTIVE" class="badge bg-secondary">Inactive</span>
                                <span v-else-if="api.status == STATUS.ACTIVE" class="badge bg-primary">Active</span>
                            </td>
                            <td class="align-middle">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-outline-primary px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                    </button>
                                    <ul class="dropdown-menu shadow">
                                        <li><button class="dropdown-item" @click="deleteUserApi(api)">Delete</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="apis == false"
            class="card-body">
            <div class="alert alert-secondary text-white text-center">
                <div>Not user apis found</div>
            </div>
        </div>
    </div>
    `
}

export { AdminapisViewer }