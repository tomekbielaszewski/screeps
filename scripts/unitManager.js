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
        return _.reduce(Game.creeps, function(sum, creep){
            return sum + (creep.type === type) ? 1 : 0;
        }, 0);
    }

    function createIfNeeded() {
        _(needs).forEach(function(need){
            var currentlyHave = countCreeps(need.type);
            if(need.need > currentlyHave) {
                createUnit(need.type);
            }
        });
    }

    function createUnit(type) {
        console.log('Manager creating ' + type);
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