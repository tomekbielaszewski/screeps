
Memory.creeps.Worker1.type = 'harvester';
Memory.creeps.Builder1.type = 'builder';
Game.spawns[0].createCreep( [TOUGH, ATTACK, MOVE, MOVE], 'Guard1', { type: 'guardian' } );
Game.spawns[0].createCreep( [WORK, CARRY, MOVE], 'Worker1', { type: 'harvester' } );
Game.spawns[0].createCreep( [WORK, WORK, CARRY, MOVE], 'Builder1', { type: 'builder' } );