const createPoint = require("./createPoint")
const getPoint = require("./getPoint")
const subscribePoint = require("./subscribeMeetPoint")
const getSubscribers = require("./getSubscribers")
const getActivePoints = require("./getAllActivePoints")
const valueMeetPointRate = require("./valueMeetPointRate")

module.exports = {
    createPoint: createPoint,
    getPoint: getPoint,
    subscribePoint: subscribePoint,
    getSubscribers: getSubscribers,
    getActivePoints: getActivePoints,
    valueMeetPointRate: valueMeetPointRate
}