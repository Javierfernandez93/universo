
const AdminUsersPageNavigation = {
    props: ['numOfPages', 'current'],
    emits: ['onPageChange'],
    methods: {
        goToPage(page){
            this.$emit('onPageChange', page);
        },
        nextPage(){
            this.$emit('onPageChange', Math.min(this.numOfPages, this.current + 1));
            
        },
        prevPage(){
            this.$emit('onPageChange', Math.max(1, this.current - 1));
        },
    },
    template: `
        <div class="container overflow-scroll" v-if="numOfPages > 0">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li v-if="numOfPages > 1" class="page-item"><a class="page-link cursor-pointer" :class="current === 1 ? 'disabled' : ''" @click="prevPage"><i class="bi bi-arrow-left-short"></i></a></li>
                    <li v-for="index in numOfPages" class="page-item">
                        <a class="page-link cursor-pointer" :class="index == current ? 'active text-white' : ''" @click="goToPage(index)">{{index}}</a>
                    </li>
                    <li v-if="numOfPages > 1" class="page-item"><a class="page-link cursor-pointer" :class="current === numOfPages ? 'disabled' : ''" @click="nextPage"><i class="bi bi-arrow-right-short"></i></a></li>
                </ul>
            </nav>
        </div>
    `,
};

export default AdminUsersPageNavigation;