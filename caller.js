const tracker = require('./tracker');

module.exports = {
    track() {
        tracker.trackPageview();
    }
};