var _ = require('lodash');
var queue = require('unitTrainingQueue');
var UnitType = require('unitType');
var factory = require('unitFactory');

module.exports = (function() {
    var needs = [
            {
                type: UnitType.HARVESTER,
                need: 1
            },
            {
                type: UnitType.MINER,
                need: 2
            },
            {
                type: UnitType.CARRIER,
                need: 3
            },
            {
                type: UnitType.BUILDER,
                need: 2
            },
            {
                type: UnitType.UPGRADER,
                need: 1
            },
            {
                type: UnitType.REPAIRER,
                need: 2
            },
            {
                type: UnitType.GUARDIAN,
                need: 3
            }
        ];

    function countCreeps(type) {
        var counter = 0;
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.type === type) {
                counter++;
            }
        }
        return counter;
    }

    function createIfNeeded() {
        _.forEach(needs, function(need){
            var currentlyHave = countCreeps(need.type);
            if(need.need > currentlyHave) {
                console.log('Not enough '+need.type+'('+currentlyHave+'). Creating! You need to have ' + need.need);
                createUnit(need.type);
            }
        });
    }

    function createUnit(type) {
        var creator = getCreator(type);
        queue.enqueue(creator, _.isString); //TODO: equeue unit creation order - pass function from unitFactory for now. Fix later
    }

    function getCreator(type) {
        switch(type) {
            case UnitType.HARVESTER: return factory.harvester;
            case UnitType.MINER: return factory.miner;
            case UnitType.BUILDER: return factory.builder;
            case UnitType.GUARDIAN: return factory.guardian;
            case UnitType.CARRIER: return factory.carrier;
            case UnitType.UPGRADER: return factory.upgrader;
        }
    }

    function getNeed(type) {
        var foundNeed = _.find(needs, function(need){
            return need.type === type;
        });
        if(foundNeed) {
            return foundNeed;
        } else {
            throw 'unknown type ' + type;
        }
    }

    function setNeed(type, newNeed) {
        getNeed(type).need = newNeed;
    }

    function getAllNeeds() {
        return needs;
    }

    return {
        update: createIfNeeded,
        setNeed: setNeed,
        getNeed: getNeed,
        getAllNeeds: getAllNeeds,
        createUnit: createUnit
    }
}());