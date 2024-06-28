import { UserSupport } from '../userSupport.module.js?v=1.0.2';

const AdminUsersHeader = {
    props: [
        'campaigns',
        'endCount',
        'filterFlags',
        'isLoadingData',
        'startCount',
        'totalUsers',
        'usersPerPage',
    ],
    emits: [
        'onCampaignSelect',
         'onChangeBusyStatus',
         'onFilter',
         'onFilterFlagChange',
         'onSelectInactiveUsers',
         'onRefresh'
    ],
    data(){
        return {
            filterString: null,
            selectedCampaign: null,
            showFilters: false,
            UserSupport: new UserSupport,
        }
    },
    methods: {
        filterStringFn: _debounce((self) => {
            self.$emit('onFilter',self.filterString);
        },500),
        switchFilterBar() {
            this.showFilters = !this.showFilters;
        },
        switchFlag(flagValue){
            this.filterFlags[flagValue] = !(this.filterFlags?.[flagValue] ?? false);
            this.$emit('onRefresh');
        }
    },
    watch: {
        selectedCampaign : function(){
            if (this.selectedCampaign !== null) {
                this.$emit('onCampaignSelect', this.selectedCampaign);
            }
        },
    },
    template: `
        <div class="card-header pb-0">
            <div class="row align-items-center">
                <div class="col">
                    <div v-if="totalUsers"><span class="text-xs text-secondary">Mostrando {{startCount}} a {{Math.min(endCount,totalUsers)}} de {{totalUsers}}</span></div>
                    <div class="h4">Usuarios</div>
                </div>
            
                <div class="col-auto text-end">
                    <input @input="filterStringFn(this)" v-model="filterString" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                </div>

                <div class="col-1 text-end">
                    <input v-model="usersPerPage" type="text" class="form-control" placeholder="limite" />
                </div>

                <div v-if="campaigns.length > 1" class="col">
                    <select class="form-select" v-model="selectedCampaign" aria-label="Campaña">
                        <option v-for="campaign in campaigns" :value="campaign.catalog_campaign_id">
                            {{ campaign.campaign }}
                        </option>
                    </select>
                </div>

                <div class="col-auto text-end">
                    <a href="../../apps/admin-users/add" type="button" class="btn shadow-none mb-0 btn-light px-3 btn-sm ml-2">Añadir usuario</a>
                </div>

                <div class="col-auto text-end">
                    <button :disabled="isLoadingData" @click="$emit('onRefresh')" type="button" class="btn shadow-none mb-0 btn-light px-3 mt-1 btn-sm">Actualizar</button>
                </div>

                <div class="col-auto text-end">
                    <button @click="switchFilterBar()" type="button" class="btn shadow-none mb-0 btn-light px-3 mt-1 btn-sm">{{showFilters ? "-" : "+"}} Filtros</button>
                </div>

                <div class="col-auto text-end d-none">
                    <button @click="$emit('onSelectInactiveUsers')" type="button" class="btn shadow-none mb-0 btn-light px-3 btn-sm mt-1">Tomar whatsapp inactivos</button>
                </div>
            </div>
            <div v-if="showFilters" class="row justify-content-end">
                <div class="col col-2 form-check">
                    <input @click="switchFlag('activeMembership')" class="form-check-input" type="checkbox" id="active-membership" />
                    <label for="active-membership">Membresia Activa</label>
                </div>
                <div class="col col-2 form-check">
                    <input @click="switchFlag('inactiveMembership')" class="form-check-input" type="checkbox" id="inactive-membership" />
                    <label for="inactive-membership">Membresia Expirada</label>
                </div>
                <div class="col col-2 form-check">
                    <input @click="switchFlag('brokerReady')" class="form-check-input" type="checkbox" id="broker-ready" />
                    <label for="broker-ready">Broker Configurado</label>
                </div>
            </div>
        </div>
    `,
};

export default AdminUsersHeader;