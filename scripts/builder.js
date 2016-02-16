module.exports = function (creep) {
    if(creep.memory.role == 'builder') {
    	if(creep.carry.energy == 0) {
    		if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
    			creep.moveTo(Game.spawns.Spawn1);				
    		}
    	}
    	else {
            var construction = creep.pos.findClosest(FIND_CONSTRUCTION_SITES);
			if(creep.build(construction) == ERR_NOT_IN_RANGE) {
				creep.moveTo(construction);					
			}
    	}
    }
}