import { UserSupport } from '../../src/js/userSupport.module.js?t=5'

const AdmintoolsViewer = {
    name: 'admintools-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            tools : {},
            toolsAux : {},
            query : null,
            columns: { // 0 DESC , 1 ASC 
                tool_id : {
                    name: 'tool_id',
                    desc: true,
                },
                title : {
                    name: 'title',
                    desc: false,
                    alphabetically: true,
                },
                tool : {
                    name: 'tool',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    watch : {
        query : 
        {
            handler() {
                this.filterData()
            },
            deep : true
        },
    },
    methods: {
        sortDat (column) {
            this.tools.sort((a,b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if(column.alphabetically)
                {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        goToEdit(tool_id) {
            window.location.href = `../../apps/admin-tools/edit?tid=${tool_id}`
        },
        publishTool(tool_id) {
            this.UserSupport.publishTool({tool_id:tool_id},(response)=>{
                if(response.s == 1)
                {
                    this.getAdminTools()
                }
            })
        },
        unpublishTool(tool_id) {
            this.UserSupport.unpublishTool({tool_id:tool_id},(response)=>{
                if(response.s == 1)
                {
                    this.getAdminTools()
                }
            })
        },
        deleteTool(tool_id) {
            this.UserSupport.deleteTool({tool_id:tool_id},(response)=>{
                if(response.s == 1)
                {
                    this.getAdminTools()
                }
            })
        },
        filterData() {
            this.tools = this.toolsAux
            
            this.tools = this.toolsAux.filter((tool)=>{
                return tool.title.toLowerCase().includes(this.query.toLowerCase()) ||tool.create_date.formatDate().toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getAdminTools() {
            this.UserSupport.getAdminTools({},(response)=>{
                if(response.s == 1)
                {
                    this.toolsAux = response.tools
                    this.tools = this.toolsAux
                }
            })
        },
    },
    mounted() 
    {
        this.UserSupport = 
        this.getAdminTools()
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <i class="bi bi-pie-chart-fill"></i>
                            </div>
                            <div class="col fw-semibold text-dark">
                                <div class="small">Herramientas</div>
                            </div>
                            <div class="col-auto text-end">
                                <div><a href="../../apps/admin-tools/add" type="button" class="btn btn-dark shadow-none">Añadir herramienta</a></div>
                                <div><span class="badge bg-secondary">Total de herramientas {{Object.keys(tools).length}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-header">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div
                        v-if="Object.keys(tools).length > 0" 
                        class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th @click="sortData(columns.tool_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.tool_id">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">ID</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.title)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Título</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.tool)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.tool.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Tipo</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tool in tools">
                                        <td class="align-middle text-center text-sm">
                                            <p class="font-weight-bold mb-0">{{tool.tool_id}}</p>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <div>
                                                        <span class="badge bg-gradient-success text-xxs" v-if="tool.status == '1'">Publicada</span>
                                                        <span class="badge bg-gradient-secondary text-xxs" v-else-if="tool.status == '0'">Sin publicar</span>
                                                    </div>

                                                    <h6 class="mb-0 text-sm">{{tool.title}}</h6>
                                                    <h6 class="mb-0 text-xs text-secondary">Por {{tool.names}}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                        {{tool.tool}}
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-xs text-dark mb-0">{{tool.create_date.formatDate()}}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <?php if($UserSupport->hasPermission('edit_tool')) { ?>
                                                        <li><button class="dropdown-item" @click="goToEdit(tool.tool_id)">Editar</button></li>
                                                    <?php } ?>
                                                    <?php if($UserSupport->hasPermission('publish_tool')) { ?>
                                                        <li v-if="tool.status == '0'"><button class="dropdown-item" @click="publishTool(tool.tool_id)">Publicar herramienta</button></li>
                                                    <?php } ?>
                                                    <?php if($UserSupport->hasPermission('unpublish_tool')) { ?>
                                                        <li v-if="tool.status == '1'"><button class="dropdown-item" @click="unpublishTool(tool.tool_id)">Despublicar herramienta</button></li>
                                                    <?php } ?>
                                                    <?php if($UserSupport->hasPermission('delete_tool')) { ?>
                                                        <li>
                                                            <hr class="dropdown-divider">
                                                        </li>
                                                        <li><button class="dropdown-item" @click="deleteTool(tool.tool_id)">Eliminar</button></li>
                                                    <?php } ?>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else
                        class="card-body">
                        <div class="alert alert-secondary text-white text-center">
                            <div>No tenemos herramientas aún</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdmintoolsViewer }