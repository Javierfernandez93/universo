import { User } from '../../../src/js/user.module.js?v=1.6.7'   
import { LoaderViewer } from '../../../src/js/loaderViewer.vue.js?v=1.6.7'

const WallItem = {
    props : ['signal'],
    components: {
        LoaderViewer
    },
    data() {
        return {
            User : new User,
            busy : false
        }
    },
    methods: {
        sendToCopyTrading(signal) {
            signal.busy_copytrading = true
            this.User.sendToCopyTrading({signal:signal.data,signal_provider_id:signal.signal_provider_id},(response)=>{
                signal.busy_copytrading = false

                if(response.s == 1)
                {
                    toastInfo({
                        message: this.t('signal_sent_to_copy_trading')+ ` #${response.order.positionId}`,
                    })
                } else {
                    toastInfo({
                        message: this.t('error_sending_signal'),
                    })
                }
            })
        },
        sendToTelegram(signal) {
            signal.busy_telegram = true
            this.User.sendToTelegram({signal:signal.data,signal_provider_id:signal.signal_provider_id},(response)=>{
                signal.busy_telegram = false
                if(response.s == 1)
                {
                    toastInfo({
                        message: t('signal_sent_to_telegram'),
                    })
                }
            })
        },
    },
    mounted() {

    },
    template : `
        <div class="card card-signal cursor-pointer z-zoom-element bg-dark" :class="signal.data.side == 'buy' ? 'bg-fade-gradient-success': 'bg-fade-gradient-danger'">
            <div class="mask candle"></div>
            <div class="position-relative z-index-1">
                <div class="card-body">
                    <div class="mb-3">
                        <div class="text-light text-xs">Side</div>
                        <div class="h5 text-white">{{signal.data.side}}</div>
                    </div>
                    <div class="mb-3">
                        <div class="text-light text-xs">Symbol</div>
                        <div class="h5 text-white">{{signal.data.symbol}}</div>
                    </div>
                    <div class="row">
                        <div v-if="signal.data.takeProfit" class="col-12 col-md">
                            <div class="text-light text-xs">Take Profit</div>
                            <div class="h5 text-white">$ {{signal.data.takeProfit.numberFormat(4)}} </div>
                        </div>
                        <div v-if="signal.data.stopLimitPrice" class="col-12 col-md">
                            <div class="text-light text-xs">Stop Loss</div>
                            <div class="h5 text-white">$ {{signal.data.stopLimitPrice.numberFormat(4)}} </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-none py-3">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <div class="card-footer pt-0">
                    <div class="d-grid">
                        <button :disabled="signal.busy_telegram" class="btn btn-lg mb-2 btn-dark bg-dark shadow-none" @click="sendToTelegram(signal)">
                            <span v-if="signal.busy_telegram"> 
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                            <span v-else>Telegram</span>
                        </button>
                        <button :disabled="signal.busy_copytrading" class="btn btn-lg mb-0 btn-dark bg-dark shadow-none" @click="sendToCopyTrading(signal)">
                            <span v-if="signal.busy_copytrading"> 
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </span>
                            <span v-else>CopyTrading</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { WallItem } 