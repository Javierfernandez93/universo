const BackButton = {
    props : ['myClass'],
    data() {
        return {
            defaultClass: 'btn-dark'
        }
    },
    methods: {
        back() {
            window.history.back()
        },
    },
    mounted() {
        this.defaultClass = this.myClass != undefined ? this.myClass : this.defaultClass
    },
    template : `
        <button @click="back" class="btn btn-sm px-3 shadow-none mb-0" :class="defaultClass">
            <i class="bi bi-arrow-left-short"></i>
        </button>
    `,
}

export default BackButton 