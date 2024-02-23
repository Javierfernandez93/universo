import { UserSupport } from './userSupport.module.js?v=2.4.6.2'   

const PermissionsViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            permissions: null,
            permissionsAux: null,
            query: null
        }
    },
    watch : {
        query : {
            handler() {
              this.filterData()
            },
            deep: true
        },
    },
    methods: {
        filterData() 
        {
            this.permissions = this.permissionsAux
            this.permissions = this.permissions.filter((permission)=>{
                return permission.permission.toLowerCase().includes(this.query.toLowerCase())
                || permission.description.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        addPermission() {
            let alert = alertCtrl.create({
                title: 'Añadir permiso',
                subTitle: 'Ingresa los datos',
                size: 'modal-md',
                inputs: [
                    {
                        type: 'text',
                        name: 'permission',
                        id: 'permission',
                        placeholder: 'Nombre del permiso',
                        label: 'Nombre del permiso'
                    },
                    {
                        type: 'text',
                        name: 'description',
                        id: 'description',
                        placeholder: 'Descripción del permiso',
                        label: 'Descripción del permiso'
                    }
                ],  
                buttons: [
                    {
                        text: "Aceptar",
                        role: "cancel",
                        handler: (data) => {
                            
                            this.UserSupport.addPermission(data,(response)=>{
                                if(response.s == 1)
                                {
                                    toastInfo({
                                        message: `Se ha añadido el permiso correctamente`
                                    })

                                    this.getPermissions()
                                } else if (response.r == "ALREADY_EXIST") {
                                    toastInfo({
                                        message: `El permiso ingresado ya éxiste`
                                    })
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                            
                        },
                    },
                ],
            });
        
            alertCtrl.present(alert.modal);
        },
        setPermissionStatus(permission,status) 
        {
            this.UserSupport.setPermissionStatus({catalog_permission_id:permission.catalog_permission_id,status:status},(response)=>{
                if(response.s == 1)
                {
                    if(status == 1)
                    {
                        toastInfo({
                            message: 'El permiso ha sido habilitado',
                        })
                    } else if(status == 0) {
                        toastInfo({
                            message: 'El permiso ha sido deshabilitado',
                        })
                    } else if(status == -1) {
                        toastInfo({
                            message: 'El permiso ha sido eliminado',
                        })

                        this.getPermissions()
                    }

                    property.status = status
                } else if(response.r == 'INVALID_PERMISSION') {
                    toastInfo({
                        message: 'No tienes permisos para realizar esta acción',
                    })
                }
            })
        },
        getPermissions() 
        {
            this.permissions = null
            this.permissionsAux = null

            this.UserSupport.getPermissions({},(response)=>{
                if(response.s == 1)
                {
                    this.permissions = response.permissions
                    this.permissionsAux = response.permissions
                }
            })
        },
    },
    mounted() 
    { 
        this.getPermissions()
    },
    template : `
        <div class="card">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        <div v-if="permissions" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{permissions.length}}</span></div>
                        <h6>Permisos</h6>
                    </div>
                    <div class="col-auto text-end">
                        <div><button @click="addPermission" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir permiso</button></div>
                    </div>
                    <div class="col-auto text-end">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="permissions" class="table-responsive-sm p-0 overflow-y-scroll h-100">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    #
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Permiso
                                </th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Creado
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="permission in permissions">
                                <td>
                                    {{permission.catalog_permission_id}}
                                </td>
                                <td>
                                    <div class="text-xs text-secondary">{{permission.permission}}</div>
                                    <div class="fw-sembold text-dark">{{permission.description}}</div>    
                                </td>
                                <td class="align-middle text-center text-sm">
                                    {{permission.create_date.formatFullDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="setPermissionStatus(permission,-1)">Eliminar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="card-body">
                    <div class="alert alert-warning text-white text-center">
                        <div>No tenemos vendedores aún</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { PermissionsViewer } 