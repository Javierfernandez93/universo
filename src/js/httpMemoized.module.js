import { Http } from "../../src/js/http.module.js?v=1.0.5";

class HttpMemoized extends Http {
    static instances = new Map();
    memo = {};

    constructor() {
        super();
        const className = this.constructor.name;

        if (HttpMemoized.instances.has(className)) {
            return HttpMemoized.instances.get(className);
        }
        this.initialize();
        HttpMemoized.instances.set(className, this);
    }

    initialize() {
        // override and add any custom initialization
    }
    
    memoizedCall = (url, data, callback, method = 'POST') => {
        const key = url + JSON.stringify(data);

        if(this.memo[key] !== undefined){
            return callback(this.memo[key])
        }
        this.call(url, data, (response) => {
            this.memo[key] = response;

            callback(response);
        }, method);
    }

    call(url, data, callback, method = 'POST') {
        const wrapperCallback = response => {
            const {s, r, error} = response;
            if(s === 0 && (r !== undefined || error !== undefined)){
                // toastInfo({message: 'Se encontro un error:' + r ?? error})
            }
            callback(response);
        }
        return super.call(url, data, wrapperCallback, null, null, method);
    }
}

export default HttpMemoized;