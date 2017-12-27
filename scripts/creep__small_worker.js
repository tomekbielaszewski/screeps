require('./enums');

Creep.prototype[ROLE_SMALL_WORKER] = function () {
    console.log("Small worker working, TTL: " + this.ticksToLive);
};