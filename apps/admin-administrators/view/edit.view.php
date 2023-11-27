<div class="container-fluid py-4" id="app">
    <div class="card mb-3">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-xl">
                    <div class="fw-semibold text-primary fs-4">Editar administrador</div>
                </div>
                <div class="col-12 col-xl-auto">
                    <button ref="button" type="submit" class="btn btn-dark shadow-none mb-0" @click="editAdministrator">Editar</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-12 col-xl">
                    <label>Nombre</label>
                    <input :autofocus="true" :class="administrator.names ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.email.focus()" v-model="administrator.names" ref="names" type="text" class="form-control" placeholder="nombre">
                </div>
                <div class="col-12 col-xl">
                    <label>Correo electrónico</label>
                    <input v-model="administrator.email" :class="administrator.email ? 'is-valid' : ''" @keydown.enter.exact.prevent="$refs.password.focus()" ref="email" type="text" class="form-control" placeholder="Email">
                </div>
                <div class="col-12 col-xl">
                    <label>Contraseña</label>
                    <input 
                        v-model="administrator.password" 
                        @keydown.enter.exact.prevent="editAdministrator" 
                        ref="password" 
                        :class="administrator.password ? 'is-valid' : ''"
                        type="text" class="form-control" placeholder="Password">
                </div>
            </div>
        </div>
    </div>
    <?php if($UserSupport->hasPermission('edit_permissions')) { ?>
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-12 col-xl fs-4 fw-semibold text-primary">
                        Listado de permisos
                    </div>
                    <div class="col-12 col-xl-auto">
                        <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="buscar...">
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li v-for="permission in administrator.permissions" class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl-auto">
                                <div class="form-check form-switch ps-0">
                                    <input 
                                        v-model="permission.checked"
                                        :id="permission.catalog_permission_id"
                                        class="form-check-input ms-auto" type="checkbox" />
                                </div>
                            </div>
                            <div class="col-12 col-xl">
                                <label :for="permission.catalog_permission_id">
                                    <div class="fw-semibold text-dark">{{permission.description}}</div>
                                </label>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div class="text-xs text-secondary">{{permission.permission}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    <?php } ?>
</div>