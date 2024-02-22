import { User } from '../../src/js/user.module.js?v=2.4.6'   

const NoticewidgetViewer = {
    name : 'noticewidget-viewer',
    data() {
        return {
            User: new User,
            index: null,
            INVERTVAL_TIMMER: 5000,
            notice: null,
            notices: null
        }
    },
    methods: {
        getNotice() {   
            this.index = this.index < this.notices.length - 1 ? this.index + 1 : 0

            this.notice = this.notices[this.index]
        },
        showNotice(notice) {   
            window.location.href = `../../apps/backoffice/notice?nid=${notice.notice_id}`
        },
        getNoticeInterval() {   
            this.getNotice()

            setInterval(()=>{
                this.getNotice()
            },this.INVERTVAL_TIMMER)
        },
        getLastNoticesShort() {    
            this.User.getLastNoticesShort({},(response)=>{
                if(response.s == 1)
                {
                    this.notices = response.notices

                    this.getNoticeInterval()
                }
            })
        },
    },
    mounted() 
    {   
        this.getLastNoticesShort()
    },
    template : `
        <div v-if="notice" class="container mt-5 animation-fall-right" style="--delay:500ms">
            <div class="card card-body bg-dark">
                <div class="mb-3">
                    <div class="text-white h3">
                        Noticias 
                    </div>
                    <div class="lead text-xs text-white">
                        {{notice.preview}}
                    </div>
                </div>
                <button @click="showNotice(notice)" class="btn btn-primary mb-0 shadow-none">
                    Más información 
                </button>
            </div>
        </div>
    `,
}

export { NoticewidgetViewer } 