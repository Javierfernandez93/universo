import AdminUsersTableRow from './AdminUsersTableRow.vue.js';
import AdminUsersTableHeaderCell from './AdminUsersTableHeaderCell.vue.js';

const AdminUsersTable = {
    props: ['campaigns', 'sortByColumn', 'sortOrder', 'users','filterQuery'],
    emits: [ 'onChangeBusyStatus', 'onDeleteUser', 'onSort', 'openCanvas' ],
    components: {
        Row: AdminUsersTableRow,
        HeaderCell: AdminUsersTableHeaderCell,
    },
    data() {
        return {
            campaignSettings: null,
        }
    },
    methods: {
        settingsFor(campaign) {
            if(this.campaignSettings === null){
                this.updateCampaignSettings();
            }
            return this.campaignSettings?.[campaign];
        },
        changeBusyStatus(newStatus){
            this.$emit('onChangeBusyStatus', newStatus);
        },
        deleteUser(userId){
            this.$emit('onDeleteUser', userId);
        },
        openCanvas(user){
            this.$emit('openCanvas', user);
        },
        sortBy(column, order) {
            this.$emit('onSort', column, order);
        },
        updateCampaignSettings(){
            this.campaignSettings = (this.campaigns ?? []).reduce((prev, campaign) => ({
                ...prev,
                [campaign.campaign]: JSON.parse(campaign.features ?? '{}'),
            }),{});
        },
    },
    template: `
        <div v-if="users?.length && campaigns?.length" class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive-sm p-0">
                <table class="table table-hover mb-0">
                    <thead class="bg-white th-sticky">
                        <tr>
                            <HeaderCell @onClick="sortBy" column="company_id" :order="sortByColumn === 'company_id' ? sortOrder : null">ID</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="names" :order="sortByColumn === 'names' ? sortOrder : null">Usuario</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="" :order="">Activo</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="" :order="null">Productos</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="" :order="null">Cuentas de Trading</HeaderCell>
                            <HeaderCell v-if="campaigns.length > 1" @onClick="sortBy" column="campaign" :order="sortByColumn === 'campaign' ? sortOrder : null">Campaign</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="" :order="null">Atributos</HeaderCell>
                            <HeaderCell @onClick="sortBy" column="signup_date" :order="sortByColumn === 'signup_date' ? sortOrder : null">Miembro desde</HeaderCell>
                            <HeaderCell>Opciones</HeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        <Row v-for="user in users"
                            :settings="settingsFor(user.campaign)"
                            :user="user"
                            @onChangeBusyStatus="changeBusyStatus"
                            @onDeleteUser="deleteUser"
                            @openCanvas="openCanvas"
                            :showCampaignColumn="campaigns.length > 1" />
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="users == false" class="card-body">
            <div class="alert alert-dark text-white mb-0 text-center">
                <strong>Importante</strong>
                <div>No tenemos resultados para el filtro <strong>{{filterQuery}}</strong></div>
            </div>
        </div>
    `,
};

export default AdminUsersTable;