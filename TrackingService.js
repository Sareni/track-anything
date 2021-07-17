const axios = require('axios');
const { trackingURL } = require('./config/track_anything_config');

function mergeParams(key, conf, trackingParams) {
    // add key
    const params = { key };

    // add config
    for(const [key, value] of Object.entries(conf)) {
        if (!!value) {
            params[key] = value;
        }
    }

    // add trackingParams
    for(const [key, value] of Object.entries(trackingParams)) {
        if (!!value) {
            params[key] = value;
        }
    }

    return params;
}

function sendTrack(key, conf, trackingParams) {
    const params = mergeParams(key, conf, trackingParams);
    const { key: account = '', type = '', applicationKey: application = '', value = '' } = params; // TODO: rename key directly
    const trackDate = new Date();
    const res = axios.post(trackingURL, {
        account,
        application,
        type,
        value,
        trackDate
    }).catch(error => {
        console.error(error);
    });
}

module.exports = {
    initialize (key, conf = {}) {
        if(!key) {
            throw new Error('Track-Anything: Key has to be set!');
        }
        this.trackPageview = function(trackingParams) {
            trackingParams.type = 'pageview';
            sendTrack(key, conf, trackingParams);
        };
        this.trackUseraction = function(trackingParams) {
            trackingParams.type = 'useraction';
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