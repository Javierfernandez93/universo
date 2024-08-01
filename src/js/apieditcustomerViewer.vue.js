import { User } from '../../src/js/user.module.js?v=1.1.2'   

const ApieditcustomerViewer = {
    name : 'apieditcustomer-viewer',
    data() {
        return {
            User: new User,
            isFilled: false,
            countries : null,
            user_api_id: null,
            customer: {
                customer_id: null,
                unique_id: null,
                name: null,
                phone_code: null,
                address: '',
                whatsapp: '',
                email: ''
            }
        }
    },
    watch: {
        customer: {
            handler() {
                this.isFilled = this.customer.name && this.customer.whatsapp && this.customer.email && this.customer.unique_id
            },
            deep: true
        },
    },
    methods: {
        updateCustomer() {
            this.User.updateCustomer({...{user_api_id:this.user_api_id},...this.customer}, (response) => {
                if (response.s == 1) {
                    alertInfo({
                        icon:'<i class="bi bi-ui-checks"></i>',
                        message: 'Updated successfully',
                        _class:'bg-gradient-success text-white'
                    })
                }
            })
        },
        getCountries() {
            this.User.getCountries({},(response)=>{
                if(response.s == 1)
                {
                    this.countries = response.countries
                }
            })
        },
        getIpInfo() {
            return new Promise((resolve, reject) => {
                this.User.getIpInfo({},(response)=>{
                    resolve(response.country)
                })
            })
        },
        getCountryData(country) {
            return new Promise((resolve, reject) => {
                this.User.getCountryData({country:country},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.country)
                    }
                })
            })
        },
        getCustomer(customer_id) {
            return new Promise((resolve, reject) => {
                this.User.getCustomer({customer_id:customer_id,user_api_id:this.user_api_id},(response)=>{
                    if(response.s == 1)
                    {
                        resolve(response.customer)
                    }
                })
            })
        },
    },
    mounted() 
    {       
        if(getParam('uaid'))
        {
            this.user_api_id = getParam('uaid')

            this.getIpInfo().then((country)=> {
                this.getCountryData(country).then((country)=> {

                    this.customer.phone_code = country.phone_code

                    this.getCustomer(getParam('cid')).then((customer)=> {
                        this.customer = {...this.customer, ...customer}

                        this.getCountries()
                    })
                })
            })
        }
    },
    template : `
        <div class="container animation-fall-down" style="--delay:0.5s">
            <div class="card overflow-hidden mb-3">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-xl fw-sembold">
                            <div class="fs-4 text-primary">Edit Customer</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <button :disabled="!isFilled" @click="updateCustomer" type="button" class="btn btn-primary btn-xs px-3 mb-0 shadow-none">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-xl-2 mb-3">
                                <div class="form-floating">
                                    <input @keypress.enter.exact="$refs.name.focus()" ref="unique_id" :class="customer.unique_id ? 'is-valid' : 'is-invalid'" :autofocus="true" v-model="customer.unique_id" type="text" class="form-control" id="unique_id" placeholder="Customer Id">
                                    <label for="name">Customer Id</label>
                                </div>
                            </div>
                            <div class="col-12 col-xl-5 mb-3">
                                <div class="form-floating">
                                    <input @keypress.enter.exact="$refs.email.focus()" ref="name" :class="customer.name ? 'is-valid' : 'is-invalid'" :autofocus="true" v-model="customer.name" type="text" class="form-control" id="name" placeholder="name">
                                    <label for="name">Customer's name</label>
                                </div>
                            </div>
                            <div class="col-12 col-xl-5 mb-3">
                                <div class="form-floating">
                                    <input @keypress.enter.exact="$refs.address.focus()" ref="email" :class="customer.email.isValidMail() ? 'is-valid' : 'is-invalid'" v-model="customer.email" type="email" class="form-control" id="email" placeholder="email">
                                    <label for="email">Customer's email</label>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mb-3">
                                <div class="form-floating">
                                    <input @keypress.enter.exact="$refs.whatsapp.focus()" ref="address" :class="customer.address.isValidTronAddress() ? 'is-valid' : 'is-invalid'" v-model="customer.address" type="address" class="form-control" id="address" placeholder="address">
                                    <label for="address">USDT.TRC20 Wallet address</label>
                                </div>
                            </div>
                            <div v-if="countries" class="col-12 col-xl-4 mb-3">
                                <div class="form-floating">
                                    <select class="form-select" v-model="customer.phone_code" id="phone_code" aria-label="Floating label select example">
                                        <option v-for="country in countries" v-bind:value="country.phone_code">
                                            {{ country.nicename }} <span v-if="country.phone_code > 0">+ {{ country.phone_code }}</span>
                                        </option>
                                    </select>
                                    <label for="floatingSelect">Country</label>
                                </div>
                            </div>
                            <div class="col-12 col-xl-4 mb-3">
                                <div class="form-floating">
                                    <input ref="whatsapp" :class="customer.whatsapp.isValidPhone() ? 'is-valid' : 'is-invalid'" v-model="customer.whatsapp" type="number" class="form-control" id="whatsapp" placeholder="whatsapp">
                                    <label for="whatsapp">Customer's WhatsApp</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `,
}

export { ApieditcustomerViewer } 