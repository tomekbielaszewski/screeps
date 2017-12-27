Spawn.prototype.log = function (message) {
    console.log(`[${Game.time}] Spawn[${this.name}]: ${message}`);
};

Creep.prototype.log = function (message) {
    console.log(`[${Game.time}] Creep[${this.name}]: ${message}`);
};