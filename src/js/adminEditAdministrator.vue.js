import { UserSupport } from '../../src/js/userSupport.module.js?v=2.3.6'

/* vue */

Vue.createApp({
    data() {
        return {
            administratorComplete: false,
            UserSupport: new UserSupport,
            query: null,
            feedback: null,
            administrator: {
                name: null,
                password: null,
                email: null,
                permissions: {},
            },
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        },
        administrator:
        {
            handler() {
                this.administratorComplete = this.administrator.name != null && this.administrator.email != null && this.administrator.password != null
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.administrator.permissions = this.administrator.permissionsAux

            this.administrator.permissions = this.administrator.permissions.filter((permission) => {
                return permission.description.toLowerCase().includes(this.query.toLowerCase())
                    || permission.permission.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        editAdministrator() {
            this.feedback = null
            this.UserSupport.editAdministrator({administrator:this.administrator}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Actualizado"
                } else if (response.r == 'MAIL_ALREADY_EXISTS') {
                    this.feedback = 'El correo proporcionado ya está registrado'
                }
            })
        },
        getAdministrator(user_support_id) {
            this.UserSupport.getAdministrator({user_support_id:user_support_id}, (response) => {
                if (response.s == 1) {
                    this.administrator = {...this.administrator, ...response.administrator}
                    this.administrator.permissionsAux = this.administrator.permissions

                    console.log(this.administrator)
                }
            })
        },
    },
    mounted() {

        if(getParam('usid'))
        {
            this.getAdministrator(getParam('usid'));
        }
    },
}).mount('#app')