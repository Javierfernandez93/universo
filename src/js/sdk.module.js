class SDK {
    constructor() {
        this.logged = false
        this.credentials = {
            apiKey: null,
            merchantId: null,
            merchantToken: null
        }
    }
    init()
    {   
        var scripts = document.getElementsByTagName("script");

        for(let i in scripts)
        {
            let scriptSrc = scripts[i].src;
            
            if(scriptSrc)
            {
                let apiKey = getParamFromString('apiKey', scriptSrc)
                
                if(apiKey)
                {
                    this.credentials.apiKey = apiKey

                    let merchantId = getParamFromString('merchantId', scriptSrc)
                    
                    if(merchantId != undefined)
                    {
                        this.credentials.merchantId = merchantId
                    } else {
                        throw('Invalid merchantId')
                    }
                } 
            }
        }
    }
    createProduct(product){
        return `
            <div class="col-12 col-xl-3 col-md-6">
                <div class="card shadow-none bg-transparent">
                    <img class="card-img-top" src="${product.img}">
                    <div class="card-header bg-transparent">
                        ${product.popular ? '<span class="badge bg-primary">Popular</span>' : ''}
                        <div class="fs-4 fw-semibold">
                            ${product.title}
                        </div>
                    </div>
                    <div class="card-body">
                        ${product.description}
                    </div>
                    <div class="card-footer d-grid">
                        <button class="btn btn-lg shadow-none btn-primary mb-0">Comprar</button>
                    </div>
                </div>
            </div>
        `
    }
    getProducts(){
        return [
            {
                'product_id' : 1,
                'title' : 'Mi producto',
                'popular' : false,
                'description' : 'Descripción',
                'img' : 'https://img.stripecdn.com/cdn-cgi/image/format=auto,height=120,dpr=1/https://d1wqzb5bdbcre6.cloudfront.net/1650f24d6f889c0fe270429b172f00c80cb02b375baa462d0b4fdcfa866ada44/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387854573958646c524a546b78784e48564662475a6166475a7358327870646d56665a55526f6158565452556859633170365632396f5357565a554446765158646c30303450754576744770',
            },
            {
                'product_id' : 3,
                'title' : 'Mi producto 2',
                'popular' : false,
                'description' : 'Descripción',
                'img' : 'https://img.stripecdn.com/cdn-cgi/image/format=auto,height=120,dpr=1/https://d1wqzb5bdbcre6.cloudfront.net/1650f24d6f889c0fe270429b172f00c80cb02b375baa462d0b4fdcfa866ada44/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387854573958646c524a546b78784e48564662475a6166475a7358327870646d56665a55526f6158565452556859633170365632396f5357565a554446765158646c30303450754576744770',
            },
            {
                'product_id' : 4,
                'title' : 'Mi producto 2',
                'popular' : false,
                'description' : 'Descripción',
                'img' : 'https://img.stripecdn.com/cdn-cgi/image/format=auto,height=120,dpr=1/https://d1wqzb5bdbcre6.cloudfront.net/1650f24d6f889c0fe270429b172f00c80cb02b375baa462d0b4fdcfa866ada44/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387854573958646c524a546b78784e48564662475a6166475a7358327870646d56665a55526f6158565452556859633170365632396f5357565a554446765158646c30303450754576744770',
            },
            {
                'product_id' : 5,
                'popular' : true,
                'title' : 'Mi producto 2',
                'description' : 'Descripción',
                'img' : 'https://img.stripecdn.com/cdn-cgi/image/format=auto,height=120,dpr=1/https://d1wqzb5bdbcre6.cloudfront.net/1650f24d6f889c0fe270429b172f00c80cb02b375baa462d0b4fdcfa866ada44/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a6446387854573958646c524a546b78784e48564662475a6166475a7358327870646d56665a55526f6158565452556859633170365632396f5357565a554446765158646c30303450754576744770',
            }
        ]
    }
    showProductsOnScreen(container){
        const products = this.getProducts()
        
        let rowMain = document.createElement('div')
        rowMain.classList = 'row justify-content-center'
        
        let colMain= document.createElement('div')
        colMain.classList = 'col-12 col-xl-10'

        let row = document.createElement('div')
        row.classList = 'row'

        let html = ''
        products.map((product) => {
            html += this.createProduct(product)
        })
        row.innerHTML = html

        colMain.appendChild(row)
        rowMain.appendChild(colMain)

        container.appendChild(rowMain)
    }
    process(){
        window.addEventListener("load", (event) => {
            let productsContainer = document.getElementsByClassName('Site-products')[0]

            if(productsContainer)
            {
                this.showProductsOnScreen(productsContainer)
            }
        })
    }
    login(){
        fetch(API_MANAGER.LOGIN,{
            method: "POST", 
            body: JSON.stringify(this.credentials), // body data type must match "Content-Type" header
        })
        .then((_response) => {
            _response.json().then((response) => {
                if(response.status == 200)
                {
                    this.logged = true
                    this.credentials.merchantToken = response.merchantToken
                } else {
                    throw(response)
                }
            })
        })
        .then((json) => console.log(json));
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

export { SDK }