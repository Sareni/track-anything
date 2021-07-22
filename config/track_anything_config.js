const trackingServers= {
        host: 'tracking.ds2g.io',
        port: '443',
        protocol: 'https'
};


module.exports = {
    trackingURL: `${trackingServers.protocol}://${trackingServers.host}:${trackingServers.port}`
}