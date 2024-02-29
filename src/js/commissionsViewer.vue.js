import { User } from '../../src/js/user.module.js?v=2.4.6.5'   

const CommissionsViewer = {
    data() {
        return {
            User: new User,
            commissions: null,
            commissionsAux: null,
            query: null,
            filter: {
                start_date: null,
                end_date: null,
            },
            busy: false,
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                active: {
                    name: 'active',
                    desc: false,
                },
                phone: {
                    name: 'phone',
                    desc: false,
                },
                names: {
                    name: 'names',
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
            this.commissions.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.commissions = this.commissionsAux
            this.commissions = this.commissions.filter(commission =>  commission.names.toLowerCase().includes(this.query.toLowerCase()))
        },
        getInBackoffice(company_id) {
            this.UserSupport.getInBackoffice({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    window.open('../../apps/backoffice')
                }
            })
        },
        deleteUser(company_id) {
            this.UserSupport.deleteUser({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    this.getUsers()
                }
            })
        },
        goToEdit(company_id) {
            window.location.href = `../../apps/clients/edit.php?ulid=${company_id}`
        },
        signFile(commission_per_user_id) {
            window.location.href = `../../apps/receipt/?cpuid=${commission_per_user_id}`
        },
        viewFile(file) {
            window.open(file)
        },
        addClient() {
            const param = getParam("ulid") ? `?ulid=${getParam("ulid")}` : ""

            window.location.href = `../../apps/clients/add${param}`
        },
        viewDetail(company_id) {
            window.location.href = `../../apps/clients/view.php?ulid=${company_id}`
        },
        goToSupport() {
            window.open('5213317361196'.sendWhatsApp("Hola necesito ayuda con mis comisiones en Universo de Jade"))
        },
        exportToExcel(id, type, fn, dl) {
            var elt = document.getElementById(id);

            var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
            return dl ?
              XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
              XLSX.writeFile(wb, fn || ('reporte.' + (type || 'xlsx')));
        },
        getCommissions() {
            this.busy = true
            this.commissions = null
            this.commissionsAux = null

            this.User.getCommissions({filter:this.filter}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.commissions = response.commissions
                    this.commissionsAux = response.commissions
                } else {
                    this.commissions = false
                    this.commissionsAux = false
                }
            })
        },
    },
    mounted() {
        this.getCommissions()
    },
    template : `
        <div v-if="busy" class="d-flex justify-content-center align-items-center py-5">
            <div class="spinner-border " role="status">
            </div>
        </div>

        <div class="card shadow-none card-body bg-transparent mb-3">
            <div class="row align-items-center">
                <div class="col">
                    <div v-if="commissions"><span class="text-secondary text-xxs">Total {{commissions.length}}</span></div>
                    <h3 class="text-dark">Comisiones</h3>
                </div>
                <div class="col-auto text-end">
                    <button @click="goToSupport" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">
                        <i class="bi bi-plus button-icon"></i>
                        Soporte
                    </button>
                </div>
            </div>
        </div>

        <div class="card card-body mb-3"> 
            <div class="row justify-content-center"> 
                <div class="col-12 col-md"> 
                    <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                </div>
                <div class="col-12 col-md-auto"> 
                    <div class="row justify-content-center"> 
                        <div class="col-12 col-md"> 
                            <input class="form-control" type="date" v-model="filter.start_date"/>
                        </div>
                        <div class="col-12 col-md"> 
                            <input class="form-control" type="date" v-model="filter.end_date"/>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-auto"> 
                    <button @click="getCommissions" class="btn shadow-none btn-primary mb-0">
                    Filtrar
                    </button>
                </div>
                <div v-if="commissions" class="col-12 col-md-auto"> 
                    <button @click="exportToExcel('table')" class="btn shadow-none btn-primary mb-0">
                        export excel
                    </button>
                </div>
            </div>
        </div>


        <div class="card">
            <div v-if="commissions" class="table-responsive-sm">
                <table id="table" class="table table-borderless align-items-center mb-0">
                    <thead>
                        <tr class="align-items-center">
                            <th class="text-dark text-uppercase font-weight-bolder">
                                USUARIO
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Razón
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Monto
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Creado
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Pagado el 
                            </th>
                            <th class="text-dark text-uppercase text-center font-weight-bolder">
                                Recibo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="commission in commissions">
                            <td>
                                <h6 class="mb-0 text-sm">{{commission.names}}</h6>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge bg-primary-light text-primary">Comisión</span>
                            </td>
                            <td class="align-middle text-center  text-sm">
                                <h6 class="mb-0 text-sm">$ {{commission.amount.numberFormat(2)}} {{commission.currency}}</h6>
                            </td>
                            <td class="align-middle text-center  text-sm">
                                {{commission.create_date.formatFullDate()}}
                            </td>
                            <td class="align-middle text-center  text-sm">
                                {{commission.deposit_date.formatFullDate()}}
                            </td>
                            <td class="align-middle text-center  text-sm">
                                <button @click="viewFile(commission.file)" class="btn btn-primary btn-sm px-3 me-2 shadow-none mb-0">Ver</button>
                                <button v-if="!commission.signature" @click="signFile(commission.commission_per_user_id)" class="btn btn-primary btn-sm px-3 me-2 shadow-none mb-0">Firmar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="users == false" class="alert alert-light text-center mb-0">
                <div>No tienes clientes aún. Añade uno dando clic en "Añadir cliente"</div>
            </div>
        </div>
    `
}

export { CommissionsViewer }