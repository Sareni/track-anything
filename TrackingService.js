
/* = (function () {
    let _key;
    function initialize (key) {
        _key = key;
    }

    function trackPageview() {
        if (_key) {
            console.log('Track: Pageview', _key);
        } else {
            console.log('Tracker not ready');
        }
    }
})();
/* export default (function () {
    let sendTrack = () => {

    }
    initialize (key, config) {
        
    }

    function trackPageview() {
        console.log('Track: Pageview');
    }
    trackUseraction() {
        console.log('Track: Useraction');
    }
    trackError() {
        console.log('Track: Error');
    }
    sendGenericTrack() {
        console.log('Track: Generic');
    }

})();; */

const axios = require('axios');


function mergeParams(key, conf, trackingParams) {
    // add key
    const params = { key };

    // add config
    for(const [key, value] of Object.entries(conf)) {
        if (!!value) {
            params[key] = value;
        }
    }

    // ad trackingParams
    for(const [key, value] of Object.entries(conf)) {
        if (!!value) {
            params[key] = value;
        }
    }

    return params;
}


function sendTrack(key, conf, trackingParams) {
    const params = mergeParams(key, conf, trackingParams);
    const { key: accountKey = '', type = '', applicationKey = '' } = params;
    console.log('Track: ', type, '. ', key, conf, trackingParams);
    const res = axios.post('http://tracking.zenpa.at', {
        accountKey,
        applicationKey
    }).then(res => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
}

module.exports = {
    initialize (key, conf) {
        this.trackPageview = function(trackingParams) {
            trackingParams.type = 'pageview';
            sendTrack(key, conf, trackingParams);
        };
        this.trackUseraction = function(trackingParams) {
            sendTrack(key, conf, trackingParams);
        };
        this.trackError = function(trackingParams) {
            trackingParams.type = 'error';
            sendTrack(key, conf, trackingParams);
        };
        this.sendGenericTrack = function(trackingParams) {
            sendTrack(key, conf, trackingParams)
        };
    },
    trackPageview() {
        console.log('Tracker not ready');
    },
    trackUseraction() {
        console.log('Tracker not ready');
    },
    trackError() {
        console.log('Tracker not ready');
    },
    sendGenericTrack() {
        console.log('Tracker not ready');
    }
};