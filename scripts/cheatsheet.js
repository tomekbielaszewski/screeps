
Memory.creeps.Worker1.type = 'harvester';
Memory.creeps.Builder1.type = 'builder';
Game.spawns['Home'].createCreep( [TOUGH, ATTACK, MOVE, MOVE], 'Guard1', { type: 'guardian' } );
Game.spawns['Home'].createCreep( [WORK, CARRY, MOVE], 'Worker1', { type: 'harvester' } );
Game.spawns['Home'].createCreep( [WORK, WORK, CARRY, MOVE], 'Builder1', { type: 'builder' } );
Game.spawns['Home'].createCreep( [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Carrier1', { type: 'carrier' } );