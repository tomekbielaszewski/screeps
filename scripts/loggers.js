Spawn.prototype.log = function (message) {
    defaultLogger(`Spawn[${this.name}]`, message);
};

Creep.prototype.log = function (message) {
    defaultLogger(`Creep[${this.name}]`, message);
};

function defaultLogger(loggerName, message) {
    console.log(`[${Game.time}] ${loggerName}: ${message}`)
}

module.exports = defaultLogger;