module.exports = {
    initialize (key) {
        this.trackPageview = () => {
            console.log('Track: Pageview',key);
        }
    },
    trackPageview() {
        console.log('Tracker not ready');
    }
};