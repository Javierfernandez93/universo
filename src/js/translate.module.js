import { Cookie } from '../../src/js/cookie.module.js?v=1.0.2';

class Translate extends Cookie {
    constructor() {
        super();

        this.translations = {}
        this.TAG_LANGUAGE = 'lang:Site'
        this.DEFAULT_LANGUAGE = 'es'

        if(!this.hasLanguage())
        {
            this.setDefaultLanguage()
            this.loadLanguage()
        }
    }
    setLanguage(language) {
        this.setCookie(this.TAG_LANGUAGE,language)
        this.loadLanguage()
    }
    hasLanguageLoaded() {
        return this.getCookie(`${this.TAG_LANGUAGE}_data`) != undefined
    }
    hasLanguage() {
        return this.getCookie(this.TAG_LANGUAGE) != undefined
    }
    setDefaultLanguage() {
        this.setCookie(this.TAG_LANGUAGE,this.DEFAULT_LANGUAGE)
    }
    getLanguage() {
        return this.getCookie(this.TAG_LANGUAGE)
    }
    loadLanguageFromCookie() {
        this.translations = JSON.parse(this.getCookie(`${this.TAG_LANGUAGE}_data`))

        console.log(this.translations)
    }
    saveLanguageData(data) {
        this.setCookie(`${this.TAG_LANGUAGE}_data`,data)
    }
    getJsonLanguage() {
        return new Promise((resolve)=>{
            if(!this.hasLanguageLoaded())
            {
                $.get(`../../src/languages/${this.getLanguage()}.json`, (data, status) => {
                    this.saveLanguageData(JSON.stringify(data))
                    
                    resolve()
                });
            } else {
                resolve()
            }
        })
    }
    transalate() {
        let elements = document.body.getElementsByTagName("*");
        
        // for(let element in elements){
        //     console.log(elements[element])
        // }

        // console.log(elements1)
    }
    loadLanguage() {
        if(this.getLanguage() != this.DEFAULT_LANGUAGE)
        {
            this.getJsonLanguage().then(()=>{
                this.loadLanguageFromCookie()
                this.transalate()
            })
        }
    }
}

export { Translate }