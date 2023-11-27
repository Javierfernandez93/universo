class Site {
    constructor() {
        this.view = VIEWS.ITEMS
        this.logged = false
        this.items = null
        this.credentials = {
            api_key: null,
            merchant_id: null,
            merchant_token: null
        }
    }
    init()
    {   
        if(!this.isLogged())
        {
            var scripts = document.getElementsByTagName("script");
    
            for(let i in scripts)
            {
                let scriptSrc = scripts[i].src;
                
                if(scriptSrc)
                {
                    let api_key = getParamFromString('api_key', scriptSrc)
                    
                    if(api_key)
                    {
                        this.credentials.api_key = api_key
    
                        let merchant_id = getParamFromString('merchant_id', scriptSrc)
                        
                        if(merchant_id != undefined)
                        {
                            this.credentials.merchant_id = merchant_id
                        } else {
                            throw('Invalid merchant_id')
                        }
                    } 
                }
            }
        }
    }
    existMerchantTokenCookie(){
        return this.getCookie('merchant_token') ? true : false
    }
    isLogged(){
        if(this.existMerchantTokenCookie())
        {
            this.credentials.merchant_token = this.getCookie('merchant_token')
            this.logged = true
        }

        return this.logged
    }
    createItem(item){
        return `
            <div class="col-12 col-xl">
                <div class="card shadow-none bg-transparent">
                    <img class="card-img-top" src="${item.image}">
                    <div class="card-body">
                        <div>
                            ${item.popular ? '<span class="badge bg-primary">Popular</span>' : ''}
                            <div class="fs-4 fw-semibold">
                                ${item.title}
                            </div>
                        </div>
                        ${item.description}
                    </div>
                    <div class="card-footer">
                        <button onclick="purchaseItem(${item.item_id})" class="btn w-100 btn-lg shadow-none btn-primary mb-0">Comprar</button>
                    </div>
                </div>
            </div>
        `
    }
    createItemList(item){
        return `
            <li class="list-group">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <div class="fw-semibold fs-4 text-dark">
                            ${item.title}
                        </div>
                        <div class="fw-semibold text-dark">
                            $ ${item.price} USDT.TRC20
                        </div>
                    </div>
                    <div class="col-12 col-xl-auto d-none">
                        <button class="btn btn-danger mb-0 shadow-none px-3 btn-sm">Del</button>
                    </div>
                </div>
            </li>
        `
    }
    async getItems() {
        if(this.logged)
        {
            const _response = await fetch(API_MANAGER.ITEMS,{
                method: "POST", 
                body: JSON.stringify({merchant_token:this.credentials.merchant_token}), 
            })

            const response = await _response.json()
            
            if(response.status === 200)
            {
                this.items = response.items

                return response.items
            }
        }
    }
    async getFields() {
        if(this.logged)
        {
            const _response = await fetch(API_MANAGER.FIELDS,{
                method: "POST", 
            })

            const response = await _response.json()
            
            if(response.status === 200)
            {
                return response.fields
            }
        }
    }
    async getViewCheckout(container) {        
        let html = `
            <div class="row justify-content-center">
                <div class="col-12 col-xl-6">
                    <div class="card">
                        <div class="card-header">
                            Resumen de tu compra
                        </div>
                        <div class="card-body">
                            <div id="cp-fields">
                            </div>
                            <div id="cp-items">
                            </div>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary w-100 btn-lg shadow-none mb-0">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        container.innerHTML = html

        let listFields = document.getElementById("cp-fields")

        this.getViewFields(listFields)

        let listItems = document.getElementById("cp-items")

        this.getViewItemsResume(listItems)
    }
    async getViewItemsResume(container){
        let items = getItemsFromStorage(container)
        
        let rowMain = document.createElement('div')
        rowMain.classList = 'row justify-content-center'
        
        let colMain= document.createElement('div')
        colMain.classList = 'col-12 col-xl-10'

        let row = document.createElement('div')
        row.classList = 'row'

        let html = ''
        items.map((item) => {
            html += this.createItemList(item)
        })
        row.innerHTML = html

        colMain.appendChild(row)
        rowMain.appendChild(colMain)

        container.appendChild(rowMain)
    }
    async getViewFields(container){
        let fields = this.getFields()

        await this.getCountryData()

        container.innerHTML = `
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
        `
    }
    async getViewItems(container){
        const items = await this.getItems()
        
        let rowMain = document.createElement('div')
        rowMain.classList = 'row justify-content-center'
        
        let colMain= document.createElement('div')
        colMain.classList = 'col-12 col-xl-10'

        let row = document.createElement('div')
        row.classList = 'row'

        let html = ''
        items.map((item) => {
            html += this.createItem(item)
        })
        row.innerHTML = html

        colMain.appendChild(row)
        rowMain.appendChild(colMain)

        container.appendChild(rowMain)
    }
    getView(){
        const view = getParamFromString('view',window.location.href)

        return view ? view : DEFAULT_VIEW;
    }
    process(){
        window.addEventListener("load", (event) => {
            let Site = document.getElementsByClassName('Site')[0]

            if(Site)
            {
                if(this.getView() == VIEWS.ITEMS)
                {
                    this.getViewItems(Site)
                } else if(this.getView() == VIEWS.CHECKOUT) {
                    this.getViewCheckout(Site)
                }
            }
        })
    }
    async getCountryData(){
        if(this.logged)
        {        
            let ipInfoResponse = await fetch("https://ipinfo.io/?token=f1d59709f7dad4",{method : "GET"})

            ipInfoResponse = await ipInfoResponse.json()
    
            console.log(ipInfoResponse)

            let _response = await fetch(API_MANAGER.COUNTRY_DATA,{
                method: "POST", 
                body: JSON.stringify({
                    merchant_token: this.credentials.merchant_token,
                    country: ipInfoResponse.country
                }), 
            })

            _response = await _response.json()

            console.log(_response)

        }
    }
    login(){
        if(!this.logged)
        {
            fetch(API_MANAGER.LOGIN,{
                method: "POST", 
                body: JSON.stringify(this.credentials), 
            })
            .then((_response) => {
                _response.json().then((response) => {
                    console.log(response)
                    if(response.status == 200)
                    {
                        this.logged = true
                        this.credentials.merchant_token = response.merchant_token
    
                        this.setCookie('merchant_token', response.merchant_token)
                    } else {
                        throw(response)
                    }
                })
            })
            .then((json) => console.log(json));
        }
    }
    setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (this.DEFAULT_COOLIE_DAYS*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    clearCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

