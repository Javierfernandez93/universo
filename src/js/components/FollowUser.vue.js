import { User } from '../../../src/js/user.module.js?v=1.6.7'   
import { OffCanvasViewer } from '../../../src/js/offCanvasViewer.vue.js?v=1.6.7'
import { LoaderViewer } from '../../../src/js/loaderViewer.vue.js?v=1.6.7'

const FollowUser = {
    props : ['signal'],
    components: {
        OffCanvasViewer,
        LoaderViewer
    },
    data() {
        return {
            User : new User,
            landing : null,
            busy : false,
            user : null
        }
    },
    methods: {
        hide() {
            this.$refs.myOffcanvas.hide()
        },
        show() {
            this.$refs.myOffcanvas.show()
        },
        followUser(user) {
            this.busy = true

            this.User.followUser({user_login_id:user.user_login_id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    toastInfo({
                        message: 'Usuario seguido',
                    })

                    this.hide()
                }
            })
        },
        getOpenTrades(id) {
            this.busy = true

            this.User.getOpenTrades({id:id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    
                }
            })
        },
        findUserByLanding: _debounce((self) => {
            const regex = /[^a-zA-Z0-9 ]/g;
            
            self.landing = self.landing.replace(regex, '');
            self.busy = true
            
            self.User.findUserByLanding({landing:self.landing}, (response) => {
                self.busy = false
                if (response.s == 1) {
                    self.user = response.user
                }
            })
        },500),
    },
    mounted() {

    },
    /* html */
    template : `
        <OffCanvasViewer ref="myOffcanvas" :title="t('follow_user')">
            <div class="card card-body">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <div class="form-floating mb-3">
                            <input v-model="landing" @input="findUserByLanding(this)" type="text" class="form-control" placeholder="Buscar usuarios" id="landing" />
                            <label for="landing">Username</label>
                        </div>
                    </div>
                    <div v-if="busy" class="col-12 col-xl-auto">
                        <LoaderViewer/>
                    </div>
                </div>

                <div v-if="user" class="card shadow-none">
                    <div class="card-body pb-0">
                        <div class="mb-3">
                            <div class="text-xs text-secondary">
                                usuario
                            </div>
                            <div class="text-dark h4">
                                {{user.names}}      
                            </div>
                        </div>
                    </div>
                    <div class="card-footer pt-0 row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <button @click="followUser(user)" class="btn btn-sm btn-primary mb-0 shadow-none">
                                Seguir usuario
                            </button>
                        </div>
                        <div class="col-12 col-xl">
                            <button @click="hide()" class="btn btn-sm btn-light mb-0 shadow-none">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </OffCanvasViewer>
    `,
}

export { FollowUser } 