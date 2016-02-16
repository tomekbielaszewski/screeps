var UnitType = require('unitType');

module.exports = (function() {
    function harvest(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
    }

    function build(creep) {
        if(creep.carry.energy == 0) {
            if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
        else {
            var construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction);
            }
        }
    }

    function guard(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.moveTo(Game.spawns.Spawn1.pos);
        }
    }

    function carry(creep) {

    }

    function workDispatcher(creep) {
        switch(creep.type) {
            case UnitType.HARVESTER: harvest(creep);
                break;
            case UnitType.BUILDER: build(creep);
                break;
            case UnitType.GUARDIAN: guard(creep);
                break;
            case UnitType.CARRIER: carry(creep);
                break;
        }
    }

    return {
        work : workDispatcher
    }
}());