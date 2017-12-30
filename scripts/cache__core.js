let cache = Memory.cache || {};
Memory.cache = cache;

module.exports.put = function (key, value) {
    cache[key] = {
        value: value,
        lastUsed: Game.time
    }
};

module.exports.get = function (key) {
    if (!key) {
        return cache;
    }

    let cachedData = cache[key];
    if (!cachedData) {
        return undefined;
    }

    cachedData.lastUsed = Game.time;
    return cachedData.value;
};