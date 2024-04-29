import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.4'

const AffiliationViewer = {
    data() {
        return {
            UserSupport: new UserSupport,
            affiliations: null,
            affiliationsAux: null,
            busy: false,
            query: null,
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
            this.affiliations.sort((a, b) => {
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
            this.affiliations = this.affiliationsAux
            this.affiliations = this.affiliations.filter((payment) => {
                return payment.seller.toLowerCase().includes(this.query.toLowerCase()) || payment.title.toLowerCase().includes(this.query.toLowerCase()) || payment.last_payment_number.toString().includes(this.query.toLowerCase())
            })
        },
        getAffiliations() {
            this.affiliationsAux = null
            this.affiliations = null
            this.busy = true
            
            this.UserSupport.getAffiliations({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.affiliationsAux = response.affiliations
                    this.affiliations = this.affiliationsAux
                } else {
                    this.affiliationsAux = false
                    this.affiliations = false
                }
            })
        },
        editAffiliation(affiliation) {
            window.location.href = `../../apps/admin-affiliation/edit.php?aid=${affiliation.affiliation_id}`
        },
        setAffiliationStatus(affiliation,status) {
            this.UserSupport.setAffiliationStatus({affiliation_id:affiliation.affiliation_id,status:status}, (response) => {
                if (response.s == 1) {
                    affiliation.status = status

                    if (status == 1) {
                        toastInfo({
                            message: 'Afiliación habilitada',
                        })
                    } else if (status == 0) {
                        toastInfo({
                            message: 'Afiliación deshabilitada',
                        })
                    } else if (status == -1) {
                        this.getAffiliations()
                    }
                }
            })
        },
    },
    mounted() {
        this.getAffiliations()
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header ">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="affiliations" class="badge text-secondary p-0">Total {{affiliations.length}}</span>
                                <div class="h5">
                                    Afiliaciones
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <a href="../../apps/admin-affiliation/add" class="btn btn-sm px-3 mb-0 shadow-none btn-success">Agregar afiliación</a>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input :disabled="busy" v-model="query" :autofocus="true" type="search" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>


                        <div v-if="query" class="alert alert-light text-center text-dark">Resultados de la búsqueda <b>{{query}}</b> ({{affiliations.length}} resultados)</div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div v-if="busy == true" class="d-flex justify-content-center py-3">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-if="affiliations" class="table-responsive-sm p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th></th>
                                        <th @click="sortData(columns.title)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Afiliación</u>
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
                                    <tr v-for="affiliation in affiliations" class="text-capitalize text-center text-sm">
                                        <td class="text-center">
                                            <span v-if="affiliation.status == '1'" class="badge bg-success">Activo</span>
                                            <span v-if="affiliation.status == '0'" class="badge bg-secondary">Inactivo</span>
                                        </td>
                                        <td class="align-middle fw-bold text-dark">
                                            {{affiliation.name}} 
                                        </td>                                        
                                        <td class="align-middle">
                                            {{affiliation.create_date.formatFullDate()}}
                                        </td>
                                        <td class="align-middle">
                                            <div class="btn-group">
                                                <button type="button" class="btn px-3 mb-0 btn-dark shadow-none px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li>
                                                        <button class="dropdown-item" @click="editAffiliation(affiliation)">Editar</button>
                                                    </li>
                                                    <li v-if="affiliation.status == '1'">
                                                        <button class="dropdown-item" @click="setAffiliationStatus(affiliation,0)">Inhabilitar</button>
                                                    </li>
                                                    <li v-if="affiliation.status == '0'">
                                                        <button class="dropdown-item" @click="setAffiliationStatus(affiliation,1)">Habilitar</button>
                                                    </li>
                                                    <li>
                                                        <button class="dropdown-item" @click="setAffiliationStatus(affiliation,-1)">Eliminar</button>
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
    `
}

export { AffiliationViewer }