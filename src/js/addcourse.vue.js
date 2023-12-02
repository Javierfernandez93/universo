/* vue */
import { AddcourseViewer } from '../../src/js/addcourseViewer.vue.js?v=2.3.7'
import { AddsessionViewer } from '../../src/js/addsessionViewer.vue.js?v=2.3.7'

Vue.createApp({
    components: {
        AddcourseViewer, AddsessionViewer
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