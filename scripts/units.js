var UnitType = require('unitType');

module.exports = (function() {

    function harvest(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var transferResult = creep.transfer(spawn, RESOURCE_ENERGY);
            if(transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }

    function build(creep) {
        if(creep.carry.energy == 0) {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if(spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
        else {
            var construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(construction.my && creep.build(construction) == ERR_NOT_IN_RANGE) {
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
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            creep.moveTo(spawn);
        }
    }

    function carry(creep) {
        var energyDrop = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.carry.energy < creep.carryCapacity &&
            energyDrop) {
            //seek
        } else {
            var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var transferResult = creep.transfer(spawn, RESOURCE_ENERGY);
            if(transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }

    function workDispatcher(creep) {
        switch(creep.memory.type) {
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