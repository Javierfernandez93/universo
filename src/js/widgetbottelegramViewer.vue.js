const WidgetbottelegramViewer = {
    name : 'Widgetbottelegram-viewer',
    props: ['translator'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() 
    {   
        setTimeout(() => {
            console.log("translator",this.translator)
        }, 3000);
    },
    template : `
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-xl-7 align-items-center">
                <h3>{{translator.words.Site_bot_telegram}}</h3>
                <p class="lead">{{translator.words.join_to_our_telegram_bot}}</p>
                <div class="d-grid">
                    <a href="https://t.me/Sitevirtualbot" class="btn btn-primary btn-lg mb-0 shadow-none">
                        {{translator.words.join_to_channel}}
                    </a>
                </div>
            </div>
            <div class="col-12 col-xl-5">
                <img src="../../src/img/telegram-floating.png" class="img-fluid img-float" alt="telegram-floating" title="telegram-floating"/>
            </div>
        </div>
    `,
}

export { WidgetbottelegramViewer } 