import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.3'

const AdministratorsViewer = {
    data() {
        return {
            UserSupport : new UserSupport,
            administrators : null,
            busy: false,
            columns: { // 0 DESC , 1 ASC 
                user_support_id : {
                    name: 'user_support_id',
                    desc: false,
                },
                names : {
                    name: 'names',
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
    methods: {
        sortData: function (column) {
            this.administrators.sort((a,b) => {
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
        deleteAdministrator(administrator) {
            const alert = alertCtrl.create({
                title: `Aviso`,
                subTitle: `¿Estás seguro de eliminar a <b>${administrator.names}</b>?`,
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            
                            this.UserSupport.deleteSupportUser({user_support_id:administrator.user_support_id},(response)=>{

                                alert.modal.dismiss();

                                if(response.s == 1)
                                {
                                    this.getAdministrators()

                                    alertInfo({
                                        icon:'<i class="bi bi-check"></i>',
                                        message: 'Eliminado correctamente',
                                        _class:'bg-gradient-success text-white'
                                    })
                                    
                                } else if(response.r == "INVALID_SUPPORT_ID") {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'No puedes eliminarte a ti mismo',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        goToEdit(user_support_id) {
            window.location.href = '../../apps/admin-administrators/edit?usid='+user_support_id
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
        getAdministrators() {
            this.busy = true
            this.UserSupport.getAdministrators({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.administrators = response.administrators
                }
            })
        },
    },
    mounted() 
    {
        this.getAdministrators()
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="row gx-2 align-items-center">
                            <div class="col fs-4 fw-sembold text-primary">
                                <div v-if="administrators" class="mb-n2"><span class="badge p-0 text-secondary text-xxs">Total {{administrators.length}}</span></div>
                                <h6>Administradores</h6>
                            </div>
                            <div class="col-auto text-end">
                                <a href="../../apps/admin-administrators/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir adminstrador</a>
                            </div>
                            <div class="col-auto text-end">
                                <button @click="addPermission" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir permiso</button>
                            </div>
                            <div class="col-auto text-end">
                                <button @click="getAdministrators" class="btn btn-success btn-sm px-3 mb-0 shadow-none">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                            <div class="col-auto text-end">
                                <input :disabled="busy" :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar..."/>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div v-if="busy == true" class="d-flex justify-content-center py-3">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-if="administrators" class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Usuario
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Miembro desde
                                        </th>
                                        <th class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo</th>
                                        <th class="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Estatus</th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="administrator in administrators">
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" alt="user1">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{administrator.names}}</h6>
                                                    <p class="text-xs text-secondary mb-0">{{administrator.email}}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-xs font-weight-bold mb-0">{{administrator.create_date.formatFullDate()}}</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="badge bg-primary">{{administrator.name}}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span v-if="administrator.status == 1" class="badge bg-success">activo</span>
                                            <span v-if="administrator.status == 0" class="badge bg-secondary">inactivo</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-dark mb-0 px-3 shadow-none btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    
                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li><button class="dropdown-item" @click="goToEdit(administrator.user_support_id)">Editar</button></li>
                                                    <li><button class="dropdown-item" @click="deleteAdministrator(administrator)">Eliminar</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else-if="administrators == false" class="card-body">
                            <div class="alert alert-secondary text-white text-center">
                                <div>No tenemos administradores aún</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`
}

export { AdministratorsViewer }