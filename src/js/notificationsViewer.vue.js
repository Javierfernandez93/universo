import { User } from '../../src/js/user.module.js?v=1.0.1'   

const NotificationsViewer = {
    view : 'notifications-viewer',
    data() {
        return {
            User : new User,
            notifications : null,
        }
    },
    methods: {
        getNotifications() {
            this.User.getNotifications({},(response)=>{
                if(response.s == 1)
                {
                    this.notifications = response.notifications.map((notification)=>{
                        notification['create_date'] = new Date(notification['create_date']*1000).toLocaleDateString()
                        return notification
                    })
                } else {
                    notifications = false
                }
            })
        },
    },
    mounted() 
    {
        this.getNotifications()
    },
    template : `
        <div class="row justify-content-center">
            <div class="col-12 col-xl-6">
                <div v-if="notifications" class="card">
                    <div class="card-header">
                        <span class="badge text-secondary p-0">total {{notifications.length}}</span>
                        <div class="fs-4 fw-semibold text-primary">
                            Notificaciones 
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="timeline timeline-one-side">
                            <div 
                                v-for="notification in notifications"
                                class="timeline-block mb-3">
                                <div class="align-items-center">
                                    <span class="timeline-step">
                                        <i v-html="notification.extra"></i>
                                    </span>
                                    <div class="timeline-content">
                                        <div class="fw-semibold text-dark small">{{notification.kind}} <span class="badge bg-light text-secondary small">{{notification.create_date}}</span></div>
                                        <div>{{notification.message}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="notifications == false">
                    <div class="alert alert-secondary text-center text-white">
                        No tienes Notifications aún. Vuelve más tarde
                    </div>
                </div>
            </div>
        </div>
    `
}

export { NotificationsViewer } 