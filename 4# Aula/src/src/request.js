class Request {

    errorTimeOut = (reject, urlRequest) => () => reject(new Error(`timeout at [${urlRequest}] :(`));

    raceTimeoutDelay(url, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(this.errorTimeOut(reject, url), timeout);
        });
    }

    async get(url){
        
    };

    async makeRequest({url, method, timeout}) {
        return Promise.race([
            this[method](url),
            this.raceTimeoutDelay(url, timeout)
        ])
    };
}

module.exports = Request;