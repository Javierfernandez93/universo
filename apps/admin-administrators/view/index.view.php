<div class="container-fluid py-4" id="app">
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="card-header pb-0">
                    <div class="row align-items-center">
                        <div class="col fs-4 fw-sembold text-primary">
                            <div v-if="administrators"><span class="badge p-0 text-secondary text-xxs">Total {{administrators.length}}</span></div>
                            <div>Administradores</div>
                        </div>
                        <div class="col-auto text-end">
                            <div><a href="../../apps/admin-administrators/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir adminstrador</a></div>
                        </div>
                    </div>
                </div>
                <div class="card-header pb-0">
                    <input 
                        :autofocus="true"
                        v-model="query"
                        type="text" class="form-control" placeholder="Buscar..."/>
                </div>
                <div 
                    v-if="administrators"
                    class="card-body px-0 pt-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th @click="sortData(columns.user_support_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                        <span v-if="columns.user_support_id.desc">
                                            <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                        </span>    
                                        <span v-else>    
                                            <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                        </span>    
                                        <u class="text-sm ms-2">#</u>
                                    </th>
                                    <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                        <span v-if="columns.names.desc">
                                            <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                        </span>    
                                        <span v-else>    
                                            <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                        </span>    
                                        <u class="text-sm ms-2">Usuario</u>
                                    </th>
                                    <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                        <span v-if="columns.names.desc">
                                            <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                        </span>    
                                        <span v-else>    
                                            <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                        </span>    
                                        <u class="text-sm ms-2">Miembro desde</u>
                                    </th>
                                    
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="administrator in administrators">
                                    <td class="align-middle text-center text-sm">
                                        {{administrator.user_support_id}}
                                    </td>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" :alt="administrator.names">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{administrator.names}}</h6>
                                                <p class="text-xs text-secondary mb-0">{{administrator.email}}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0">Fecha</p>
                                        <p class="text-xs text-secondary mb-0">{{administrator.create_date}}</p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-outline-primary px-3 shadow-none btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                
                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <?php if($UserSupport->hasPermission('edit_administrator')) { ?>
                                                    <li><button class="dropdown-item" @click="goToEdit(administrator.user_support_id)">Editar</button></li>
                                                <?php } ?>
                                                <?php if($UserSupport->hasPermission('delete_administrator')) { ?>
                                                    <li><hr class="dropdown-divider opacity-20"></li>
                                                    <li><button class="dropdown-item" @click="deleteAdministrator(administrator)">Eliminar</button></li>
                                                <?php } ?>
                                            </ul>
                                        </div>
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="card-body">
                    <div class="alert alert-secondary text-white text-center">
                        <div>No tenemos administradores aún</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>