
const AdminUsersTableHeaderCell = {
    props: ['column', 'isSortable', 'order'],
    emits: ['onClick'],
    data(){
        return {
            orderValues: {
                ASC: true,
                DESC: false,
            },
        }
    },
    methods: {
        onClick() {
            if (this.column) {
                this.$emit('onClick', this.column, !this.order);
            }
        }
    },
    template: `
        <th @click="onClick" class="text-center text-uppercase font-weight-bolder">
            <span v-if="column">
                <span v-if="order === orderValues.ASC">
                    <i class="bi text-primary bi-arrow-up-square-fill"></i>
                </span>    
                <span v-else-if="order === orderValues.DESC">
                    <i class="bi text-primary bi-arrow-down-square-fill"></i>
                </span>
                <u class="c-pointer text-primary text-sm ms-2"><slot></slot></u>
            </span>
            <span v-else class="text-xxs">
                <slot></slot>
            </span>
        </th>
    `,
    
            

};

export default AdminUsersTableHeaderCell;