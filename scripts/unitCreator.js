module.exports = (function() {
    var counter = 5;

    return {
        miner: function(spawn) {
            Game.spawns[spawn].createCreep( [WORK, WORK, MOVE], 'Miner'+(counter++), { type: 'miner' } );
        },
        harvester: function(spawn) {
            Game.spawns[spawn].createCreep( [WORK, WORK, CARRY, MOVE], 'Harvester'+(counter++), { type: 'harvester' } );
        },
        builder: function(spawn) {
            Game.spawns[spawn].createCreep( [WORK, WORK, CARRY, MOVE], 'Builder'+(counter++), { type: 'builder' } );
        },
        guardian: function(spawn) {
            Game.spawns[spawn].createCreep( [TOUGH, ATTACK, MOVE, MOVE], 'Guard'+(counter++), { type: 'guardian' } );
        },
        carrier: function(spawn) {
            Game.spawns[spawn].createCreep( [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Carrier'+(counter++), { type: 'carrier' } );
        }
    }
}());