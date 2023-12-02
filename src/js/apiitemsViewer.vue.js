import { User } from '../../src/js/user.module.js?v=2.3.7'   

const ApiitemsViewer = {
    name : 'apiitems-viewer',
    data() {
        return {
            User: new User,
            user_api_id: null,
            items: null,
            itemsAux: null,
            status: null,
            query: null,
            STATUS: {
                DELETED: {
                    code: -1,
                    text: 'Eliminadas'
                },
                PENDING: {
                    code: 0,
                    text: 'Pendiente'
                },
                PAYED: {
                    code: 1,
                    text: 'Pagada'
                },
                EXPIRED: {
                    code: 2,
                    text: 'Expirada'
                },
            }
        }
    },
    watch: {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        },
        status: {
            handler() {
                this.filterDataByStatus()
            },
            deep: true
        }
    },
    methods: {
        filterData() {
            this.items = this.itemsAux
            this.items = this.items.filter((item) => {
                return item.title.toLowerCase().includes(this.query.toLowerCase()) || item.description.toLowerCase().includes(this.query.toLowerCase()) || item.price.toString().includes(this.query) 
            })
        },
        getHtmlPlugin(url,encode) {
            const html = `
                <a href="${url}" target="_blank"><img src="https://www.Sitegroup.io/src/img/buy-now.svg" alt="Site Quick payments" style="width:10rem;"></a>
            `
            return encode ? html.replace(/</g, "&lt;").replace(/>/g, "&gt;") : html
        },
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
               target.innerText = 'Done'
            })
        },
        goToEditItem(item) {
            window.location.href = `../../apps/api/editItem?${httpBuildQuery({
                iid : item.item_id,
                uaid : this.user_api_id,
            })}`
        },
        shareLinkOnWhatsApp(item) {
            window.location.href = `Compra *${item.title}* 👉 ${item.short_url.url}`.getWhatsappLink()
        },
        shareLinkOnTelegram(item) {
            window.location.href = item.short_url.url.shareOnTelegram(`Compra ${item.title}`)
        },
        publishItem(item) {
            this.User.publishItem({item_id:item.item_id,user_api_id:this.user_api_id},(response)=> {
                if(response.s == 1)
                {
                    item.status = response.status
                }
            })
        },
        unpublishItem(item) {
            this.User.unpublishItem({item_id:item.item_id,user_api_id:this.user_api_id},(response)=> {
                if(response.s == 1)
                {
                    item.status = response.status
                }
            })
        },
        viewButtonsIntegration(item) {
            const html = this.getHtmlPlugin(item.short_url.url,true)
            const alert = alertCtrl.create({
                title: "Button's integration",
                html: `
                    <div class="row justify-content-center">
                       <div class="col-12">
                            <div class="card">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-xl-10">
                                                <div class="row align-items-center position-relative">
                                                    <div class="col-12">
                                                        <pre>
                                                            `+html+`
                                                        </pre>
                                                        <div class="position-absolute top-0 start-0">
                                                            <button onclick="copyHtmlPlugin('`+item.short_url.url+`',this)" class="btn btn-light mb-0 shadow-none">Copy code</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-xl-2">
                                                <a href="`+item.short_url.url+`" target="_blank"><img src="https://www.Sitegroup.io/src/img/buy-now.svg" alt="Site Quick payments" style="width:10rem;"></a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `,
                size: `modal-fullscreen`,
            })

            alertCtrl.present(alert.modal); 
        },
        deleteItem(item) {
            this.User.deleteItem({item_id:item.item_id,user_api_id:this.user_api_id},(response)=> {
                if(response.s == 1)
                {
                    item.status = response.status
                }
            })
        },
        goToPaymentLink(payment) {
            window.location.href = payment.checkout_url
        },
        cancelPayout(payment) {
            const alert = alertCtrl.create({
                title: "Payout",
                subTitle: `<p>Are you sure to delete <strong>${payment.payout_id}</strong> payout?</p>`,
                buttons: [
                    {
                        text: "Yes, delete",
                        role: "cancel",
                        class: 'btn-success',
                        handler: (data) => {
                            this.User.cancelPayout({ user_api_id: this.user_api_id, payout_id: payment.payout_id }, (response) => {
                                if(response.s == 1)
                                {
                                    payment.status = response.status
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
        viewPaymentQr(payment) {
            const alert = alertCtrl.create({
                title: "Qr de pago",
                modalTitleClass: "text-white",
                html: `
                    <div class="card">
                        <div class="card-body">
                            <img src="${payment.checkout_url.getQrCode()}" class="w-100" title="payment-link" alt="payment-link"/>
                        </div>
                        <div class="card-footer">
                            <div class="d-grid">
                                <a href="${payment.checkout_url.getQrCode()}" download="pago-${payment.unique_id}" class="btn shadow-none mb-0 btn-light">Descargar QR</a>
                            </div>
                        </div>
                    </div>
                `,
                bgColor: 'bg-dark text-white',
                size: `model-md`,
            })

            alertCtrl.present(alert.modal); 
        },
        createItem() {
            window.location.href = `../../apps/api/addItem?uaid=${this.user_api_id}`
        },
        _getUserApiItems() {
            this.getUserApiItems(this.user_api_id).then((items)=>{
                this.items = items
                this.itemsAux = items
            }).catch(() => this.items = false)
        },
        getUserApiItems(user_api_id) {
            return new Promise((resolve,reject)=> {
                this.User.getUserApiItems({user_api_id:user_api_id}, (response) => {
                    if (response.s == 1) {
                        resolve(response.items)
                    }

                    reject()
                })

            })
        },
    },
    mounted() 
    {       
        window.copyHtmlPlugin = (url,element) => {
            navigator.clipboard.writeText(this.getHtmlPlugin(url)).then(() => {
                element.innerText = 'Done'
            })
        }

        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this._getUserApiItems()
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div v-if="items">
                <div class="card overflow-hidden mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-xl fs-4 fw-sembold text-primary">
                                <div class="text-xs">Total {{items.length}}</div>
                                <div class="">Items list</div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <button @click="createItem" class="btn btn-primary mb-0 me-2 shadow-none"><i class="bi bi-plus-circle me-1"></i> New item </button>
                                <button @click="createItem" class="btn btn-success mb-0 shadow-none"><i class="bi bi-plus-circle me-1"></i> Install plugin </button>
                            </div>
                        </div>

                        <div class="mt-3">
                            <input v-model="query" type="text" class="form-control" placeholder="Search item..."/>
                        </div>
                    </div>
                </div>
                <div v-for="(item,index) in items" class="row mb-3 pb-3">
                   <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-12 col-xl-auto">
                                        <div class="avatar avatar-sm me-2 bg-dark">
                                            {{item.title.getAcronime()}}
                                        </div>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <span v-if="item.status" class="badge bg-primary">Published</span>
                                        <span v-else class="badge bg-secondary">Unpublished</span>
                                        <div>{{item.title}}</div>
                                        <div class="fw-semibold">$ {{item.price.numberFormat(2)}} USDT</div>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="btn-group">
                                            <button type="button" class="btn mb-0 shadow-none btn-sm px-3 me-2 btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Share link
                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <li><button @click="shareLinkOnWhatsApp(item)" class="dropdown-item" href="#">WhatsApp</button></li>
                                                <li><button @click="shareLinkOnTelegram(item)" class="dropdown-item" href="#">Telegram</button></li>
                                            </ul>
                                        </div>
                                        <button @click="copy(item.short_url.url,$event.target)" class="btn mb-0 shadow-none btn-sm px-3  btn-primary">Copy link</button>
                                    </div>
                                    <div class="col-12 col-xl-auto">
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-outline-primary px-3 mb-0 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                            </button>
                                            <ul class="dropdown-menu shadow">
                                                <li><button class="dropdown-item" @click="goToEditItem(item)">Edit</button></li>
                                                <li v-if="!item.status"><button class="dropdown-item" @click="publishItem(item)">Publish</button></li>
                                                <li v-else><button class="dropdown-item" @click="unpublishItem(item)">Unpublish</button></li>
                                                <li><button class="dropdown-item" @click="viewButtonsIntegration(item)">Buttons integration</button></li>
                                                <li><button class="dropdown-item" @click="deleteItem(item)">Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-xl-4">
                        <div class="row">
                            <div class="col">
                                <div class="card py-3">
                                    <div class="card-body">
                                        <p class="text-sm mb-0 text-capitalize font-weight-bold">Visitors</p>
                                        <h5 class="font-weight-bolder text-primary mb-0">
                                            0
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card py-3">
                                    <div class="card-body">
                                        <p class="text-sm mb-0 text-capitalize font-weight-bold">Clicks</p>
                                        <h5 class="font-weight-bolder text-primary mb-0">
                                            0
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="items == false" class="card">
                <div class="card-body d-flex justify-content-center py-5">
                    <button @click="createItem" class="btn btn-primary mb-0 shadow-none btn"> 
                        <i class="bi bi-plus-circle me-1"></i>
                        Add item
                    </button>
                </div>
            </div>
        </div>
    `,
}

export { ApiitemsViewer } 