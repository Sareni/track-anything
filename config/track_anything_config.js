const trackingServers= {
        host: '168.119.245.136',
        port: '6767',
        protocol: 'http'
};


module.exports = {
    trackingURL: `${trackingServers.protocol}://${trackingServers.host}:${trackingServers.port}`
}