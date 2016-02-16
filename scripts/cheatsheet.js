Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker1' );
Game.spawns.Spawn1.createCreep( [WORK, WORK, CARRY, MOVE], 'Builder1' );
Memory.creeps.Worker1.role = 'harvester';
Memory.creeps.Builder1.role = 'builder';
Game.spawns.Spawn1.createCreep( [TOUGH, ATTACK, MOVE, MOVE], 'Guard1', { role: 'guard' } );