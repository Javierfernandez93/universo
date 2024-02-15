/* vue */
import { EditcourseViewer } from '../../src/js/editcourseViewer.vue.js?v=2.4.1'
import { EditsessionViewer } from '../../src/js/editsessionViewer.vue.js?v=2.4.1'

Vue.createApp({
    components: {
        EditcourseViewer, EditsessionViewer
    },
    methods: {
        selectSession(session) {
            this.$refs.sessionViewer.selectSession(session)
        },
        saveSession(session) {
            this.$refs.course.saveSession(session)
        },
        addSession() {
            this.$refs.sessionViewer.addSession()
        },
    }
}).mount('#app')