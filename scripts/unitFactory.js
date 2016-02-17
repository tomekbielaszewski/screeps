var _ = require('lodash');
var UnitType = require('unitType');

module.exports = (function() {
    var counter = 5;

    function create(spawn, body, name, type) {
        if(_.isString(spawn)) {
            spawn = Game.spawns[spawn];
        }

        var result = spawn.createCreep( body, name+(counter++), { type: type } );

        if(_.isString(result)) {
            console.log('The name is: '+result);
            return result;
        } else {
            console.log('Spawn error: '+result);
            return result
        }
    }

    return {
        miner: function(spawn) {
            return create(spawn, [WORK, WORK, MOVE], 'Miner', UnitType.MINER);
            //return Game.spawns[spawn].createCreep( [WORK, WORK, MOVE], 'Miner'+(counter++), { type: 'miner' } );
        },
        harvester: function(spawn) {
            return create(spawn, [WORK, WORK, CARRY, MOVE], 'Harvester', UnitType.HARVESTER);
        },
        builder: function(spawn) {
            return create(spawn, [WORK, WORK, CARRY, MOVE], 'Builder', UnitType.BUILDER);
        },
        guardian: function(spawn) {
            return create(spawn, [TOUGH, ATTACK, MOVE, MOVE], 'Guard', UnitType.GUARDIAN);
        },
        carrier: function(spawn) {
            return create(spawn, [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Carrier', UnitType.CARRIER);
        },
        upgrader: function(spawn) {
            return create(spawn, [WORK, CARRY, CARRY, MOVE], 'Upgrader', UnitType.UPGRADER);
        },

        custom: function(spawn, body, name, type) {
            return create(spawn, body, name, type);
        }
    }
}());