import { UserSupport } from '../userSupport.module.js?v=1.6.7';

const AdminUsersTableRow = {
    props: ['settings', 'showCampaignColumn','user'],
    emits: [ 
        'onChangeBusyStatus',
        'onDeleteUser',
        'openCanvas',
    ],
    components: {
    },
    data(){
        return {
            UserSupport: new UserSupport,
            showTradingAccounts: false
        }
    },
    methods: {
        async addTrial() {    
            const alert = alertCtrl.create({
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: () => {
                            this.$emit('onChangeBusyStatus',true);
                            this.UserSupport.addTrial( {user_login_id:this.user.user_login_id}, ({s}) => {
                                this.$emit('onChangeBusyStatus',false);

                                if (s == 1) {
                                    toastInfo({message: `Hemos activado al usuario ${this.user.names}`})
                                } else {
                                    toastInfo({message: `Error al activar el usuario`})
                                }
                            });
                        },
                    },
                    {text: "Cancel", role: "cancel", handler: () => {} },
                ],
                subTitle: `¿Estás seguro de activar el trial a <b>${this.user.names}</b>?`,
                title: "Alert",
            });

            alertCtrl.present(alert.modal);
        },
        copyPublicKey(publicKey) {
            navigator.clipboard.writeText(publicKey).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        },
        deleteUser() {
            this.$emit('onChangeBusyStatus',true);
            this.UserSupport.deleteUser({ company_id: this.user.company_id }, ({s}) => {
                this.$emit('onChangeBusyStatus',false);
                if (s === 1) {
                    toastInfo({ message: `Hemos borrado al usuario correctamente` });
                    this.$emit('onDeleteUser',this.user.company_id);
                }
            })
        },
        getInBackoffice() {
            this.$emit('onChangeBusyStatus',true);
            this.UserSupport.getInBackoffice({ company_id: this.user.company_id }, ({s}) => {
                this.$emit('onChangeBusyStatus',false);
                if (s === 1) {
                    window.open('../../apps/backoffice')
                }
            })
        },
        goToEdit() {
            window.location.href = '../../apps/admin-users/edit?ulid=' + this.user.company_id
        },
        goToViewPublicKey(publicKey) {
            window.location.href = `../../apps/admin-wallet/?publicKey=${publicKey}`
        },
        hasExpirationTime() {
            return this.user.max_end_date !== null || (this.user?.buy?.leftDays !== undefined && this.user?.buy?.leftDays !== null);
        },
        getNumberOfDaysUntilExpiration() {
            if ( this.user.max_end_date !== null ) {
                const expirationDate = new Date(this.user.max_end_date * 1000);
                const currentDate = new Date();
                const diffInMilliseconds = expirationDate - currentDate;
                const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
                return diffInDays;
            }

            return this.user?.buy?.days ?? 0;
        },
        sendActivationWhatsApp() {
            const alert = alertCtrl.create({
                title: "Enviar WhatsApp",
                subTitle: `Envíaremos un WhatsApp con un mensaje preguntando por que aun ${this.user.names} no compra su cuenta`,
                buttons: [
                    {
                        class: 'btn-success',
                        handler: () => {
                            this.$emit('onChangeBusyStatus',true);
                            this.UserSupport.sendActivationWhatsApp(
                                this.user, 
                                ({s}) => {
                                    this.$emit('onChangeBusyStatus',false);
                                    toastInfo({ message: s === 1 ? 'Enviamos el mensaje': 'Error al enviar el mensaje' });
                                });
                        },
                        role: "cancel",
                        text: "Sí, envíar",
                    },
                    { text: "Cancelar", role: "cancel", handler: () => {} },
                ],
            });
            alertCtrl.present(alert.modal); 
        },
        sendMagicLink() {
            this.$emit('onChangeBusyStatus',true);
            this.UserSupport.sendMagicLink({ company_id: this.user.company_id }, (response) => {
                this.$emit('onChangeBusyStatus',false);
                if (response.s == 1) {
                    toastInfo({ message: `Hemos envíado el link de ingreso a ${this.user.names}` });
                }
            })
        },
        toggleTradingAccounts(){
            this.showTradingAccounts = !this.showTradingAccounts;
        },
        viewEwallet() {
            this.$emit('onChangeBusyStatus',true);
            this.UserSupport.viewEwallet({user_login_id:this.user.user_login_id}, ({ewallet, s}) => {
                this.$emit('onChangeBusyStatus',false);
                if (s == 1) {
                    this.user.ewallet = ewallet
                }
            })
        },
    },
    template: `
        <tr>
            <td class="align-middle text-center text-sm">
                <p class="font-weight-bold mb-0">{{user.company_id}}
                    <img  v-if="user.country_id" :src="user.country_id.getCoutryImage()" style="width:16px; margin-left: 10px;" />
                </p>
            </td>
            <td class="overflow-hidden">
                <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{user.names}}</h6>
                        <p class="text-xs text-secondary mb-0">{{user.email}}</p>
                        <p v-if="user.phone" class="text-xs text-secondary mb-0">
                            <a :href="user.phone.formatPhoneNumber(user.countryData.phone_code).sendWhatsApp('¡Hola *'+user.names+'*! te contactamos de DummieTrading')">
                                +{{user.phone.formatPhoneNumber(user.countryData.phone_code)}}
                            </a>
                        </p>
                    </div>
                </div>
                <div v-if="user.ewallet" class="border-top pt-3 mt-3">
                    <div class="row align-items-center">
                        <div class="col">
                            <span class="badge p-0 text-secondary">Public key</span>
                        </div>
                        <div class="col-auto">
                            <button @click="goToViewPublicKey(user.ewallet.public_key)" class="btn btn-light btn-sm px-3 me-2 mb-0 shadow-none">Enviar</button>
                            <button @click="copyPublicKey(user.ewallet.public_key)" class="btn btn-light btn-sm px-3 mb-0 shadow-none">Copiar</button>
                        </div>
                        <div>
                            <span class="text-s">{{user.ewallet.public_key}}</span>
                        </div>
                    </div>
                    <div>
                        <span class="badge p-0  text-secondary">Balance</span>
                        <div class="text-dark fw-semibold">$ {{user.ewallet.amount.numberFormat(2)}} USD</div>
                    </div>
                </div>
            </td>
            <td class="align-middle text-center">
                <span v-if="hasExpirationTime()">
                    <span v-if="getNumberOfDaysUntilExpiration() > 0" class="badge bg-success badge-break ">
                        Días restantes {{getNumberOfDaysUntilExpiration()}}
                    </span>
                    <span v-else>
                        Expirado
                    </span>
                </span>
            </td>
            <td class="align-middle text-center text-sm" v-html="user.products.join('<br>')"></td>
            <td class="align-middle text-center">
                <span v-if="!showTradingAccounts" @click="toggleTradingAccounts">{{user.trading_account.length ? user.trading_account.length : ''}}</span>
                <span v-if="showTradingAccounts">
                    <p v-for="account in user.trading_account" class="text-xs text-secondary mb-0">
                        <a :href="'../admin-trading/?query=' + account">{{account}}</a>
                    </p>
                </span>
            </td>
            <td v-if="showCampaignColumn" class="align-middle text-center text-sm">{{user.campaign}}</td>
            <td class="align-middle text-center text-xs">
                <i v-if="settings?.broker" :class=" user.setup.trading_account ? 'text-success': ''" class="bi bi-wallet-fill px-1" title="Cuenta de Broker"></i>
                <i v-if="settings?.copytrading" :class=" user.setup.copy ? 'text-success': ''" class="bi bi-check2-all px-1" title="Copytrading"></i>
                <i v-if="settings?.signals" :class=" user.setup.signals ? 'text-success': ''" class="bi bi-escape px-1" title="Señales IA"></i>
                <i v-if="settings?.telegram" :class=" user.setup.telegram ? 'text-success': ''" class="bi bi-telegram px-1" title="Telegram"></i>
                <i v-if="settings?.academy" :class=" user.setup.academy ? 'text-success': ''" class="bi bi-clipboard-check px-1" title="Academia"></i>
            </td>
            <td class="align-middle text-center text-sm">
                {{user.signup_date.formatDate()}}
            </td>
            <td class="align-middle text-center text-sm">
                <div class="dropdown">
                    <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                    </button>
                    <ul class="dropdown-menu shadow">
                        <li><button class="dropdown-item" @click="goToEdit()">Editar</button></li>
                        <li><button class="dropdown-item" @click="viewEwallet()">Ver e-wallet</button></li>
                        
                        <li><button class="dropdown-item" @click="getInBackoffice()">Acceder a backoffice</button></li>
                        <li><button class="dropdown-item" @click="deleteUser()">Eliminar</button></li>
                        
                        <li><button class="dropdown-item" @click="addTrial">Activar Trial</button></li>
                        <li><button class="dropdown-item" @click="$emit('openCanvas',user)">Ver eventos Hotmart</button></li>
                        <li><button class="dropdown-item" @click="sendMagicLink()">Enviar link de ingreso por correo</button></li>
                        
                        <li><button class="dropdown-item" @click="sendActivationWhatsApp()">Envíar WhatsApp de activación</button></li>
                        <li v-if="user.buy"><button v-if="user.buy.leftDays == 0" class="dropdown-item" @click="sendActivationWhatsApp()">Envíar Telegram de activación</button></li>
                    </ul>
                </div>
            </td>
        </tr>
    `,
};

export default AdminUsersTableRow;