var UnitType = require('unitType');

module.exports = (function() {

    function upgrade(creep) {
        if(creep.carry.energy == 0) {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if(spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        } else {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }

    function harvest(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            mine(creep);
        } else {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var transferResult = creep.transfer(spawn, RESOURCE_ENERGY);
            if(transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }

            if(transferResult == ERR_INVALID_TARGET) {
                creep.say('Cant transfer');
            }
            if(transferResult == ERR_FULL) {
                creep.say('Full');
            }
        }
    }

    function mine(creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        var harvestResult = creep.harvest(source);

        if(harvestResult == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        if(harvestResult == ERR_NOT_ENOUGH_RESOURCES) {
            creep.say('no resources');
        }
        if(harvestResult == ERR_NO_BODYPART) {
            creep.say('no WORK');
        }
    }

    function build(creep) {
        if(creep.carry.energy == 0) {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if(spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        } else {
            var construction = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            var buildResult = creep.build(construction);
            if(buildResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction);
            }

            if(buildResult == ERR_RCL_NOT_ENOUGH) {
                creep.say('RCL to low');
            }
            if(buildResult == ERR_NO_BODYPART) {
                creep.say('no WORK');
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
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            creep.moveTo(spawn);
        }
    }

    function carry(creep) {
        var energyDrop = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        if(creep.carry.energy < creep.carryCapacity &&
            energyDrop) {
            if(creep.pickup(energyDrop) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energyDrop);
            }
        } else {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var transferResult = creep.transfer(spawn, RESOURCE_ENERGY);
            if(transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }

            if(transferResult == ERR_INVALID_TARGET) {
                creep.say('Cant transfer');
            }
            if(transferResult == ERR_FULL) {
                creep.say('Full');
            }
        }
    }

    function workDispatcher(creep) {
        switch(creep.memory.type) {
            case UnitType.HARVESTER: harvest(creep);
                break;
            case UnitType.MINER: mine(creep);
                break;
            case UnitType.BUILDER: build(creep);
                break;
            case UnitType.GUARDIAN: guard(creep);
                break;
            case UnitType.CARRIER: carry(creep);
                break;
            case UnitType.UPGRADER: upgrade(creep);
                break;
        }
    }

    return {
        work : workDispatcher
    }
}());