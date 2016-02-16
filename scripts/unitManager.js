var queue = require('unitTrainingQueue');
var UnitType = require('unitType');

module.exports = (function() {
    var needs = [
            {
                type: UnitType.MINER,
                need: 1
            },
            {
                type: UnitType.MINER,
                need: 1
            },
            {
                type: UnitType.CARRIER,
                need: 1
            },
            {
                type: UnitType.BUILDER,
                need: 1
            },
            {
                type: UnitType.UPGRADER,
                need: 1
            },
            {
                type: UnitType.GUARDIAN,
                need: 1
            },
            {
                type: UnitType.HARVESTER,
                need: 1
            }
        ];

    function countCreeps(type) {
        var count = 0;
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.type == type) {
                count++;
            }
        }
        return count;
    }

    function createIfNeeded() {
        for(var i in needs) {
            var tuple = needs[i];
            var presentAmount = countCreeps(tuple.type);

            if(tuple.need > presentAmount) {
                queue.equeue(); //TODO: equeue unit creation order - pass function from unitFactory for now. Fix later
            }
        }
    }

    function setNeed(type, need) {
        for(var i in needs) {
            var tuple = needs[i];
            if(tuple.type == type) {
                tuple.need = need;
                return tuple;
            }
        }
        throw 'unknown type ' + type;
    }

    function getNeed(type) {
        for(var i in needs) {
            var tuple = needs[i];
            if(tuple.type == type) {
                return tuple;
            }
        }
        throw 'unknown type ' + type;
    }

    function getAllNeeds() {
        return needs;
    }

    return {
        update: createIfNeeded,
        setNeed: setNeed,
        getNeed: getNeed,
        getAllNeeds: getAllNeeds
    }
}());