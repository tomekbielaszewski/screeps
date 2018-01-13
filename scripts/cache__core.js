function Cache() {}

Cache.prototype = {
    cache: Memory.cache || {},

    put: function (key, value) {
        this.cache[key] = {
            value: value,
            lastUsed: Game.time
        };
        Memory.cache = cache;
    },

    get, function (key) {
        if (!key) {
            return this.cache;
        }

        let cachedData = this.cache[key];
        if (!cachedData) {
            return undefined;
        }

        cachedData.lastUsed = Game.time;
        return cachedData.value;
    }
};

module.exports = new Cache();