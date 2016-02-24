var UnitType = require('unitType');
var harvester = require('job-harvester');

module.exports = (function () {

  function upgrade(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
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
    harvester.work(creep);
  }

  function mine(creep) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES, {
      filter: function(s) {
        return !isSourceSorroundedByCreeps(s);
      }
    });
    var harvestResult = creep.harvest(source);

    if (harvestResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }

    if (harvestResult == ERR_NOT_ENOUGH_RESOURCES) {
      creep.say('no resources');
    }
    if (harvestResult == ERR_NO_BODYPART) {
      creep.say('no WORK');
    }
  }

  function isSourceSorroundedByCreeps(source) {
    return false;//source.pos
  }

  function build(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      var construction = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
      var buildResult = creep.build(construction);
      if (buildResult == ERR_NOT_IN_RANGE) {
        creep.moveTo(construction);
      }

      if (buildResult == ERR_RCL_NOT_ENOUGH) {
        creep.say('RCL to low');
      }
      if (buildResult == ERR_NO_BODYPART) {
        creep.say('no WORK');
      }
    }
  }

  function repair(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      var construction = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (s) {
          return (s.my || s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_ROAD) &&
            s.hits < s.hitsMax / 2;
        }
      });
      if (construction) {
        var repairResult = creep.repair(construction);
        if (repairResult == ERR_NOT_IN_RANGE) {
          creep.moveTo(construction);
        }

        if (repairResult == ERR_NO_BODYPART) {
          creep.say('no WORK');
        }
      } else {
        creep.moveTo(Game.flags.idle);
      }
    }
  }

  function guard(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      creep.moveTo(Game.flags.idle);
    }
  }

  function carry(creep) {
    var energyDrop = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (creep.carry.energy < creep.carryCapacity) {
      if (energyDrop && creep.pickup(energyDrop) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energyDrop);
      }
    } else {
      var structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function (s) {
          if ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_LINK) &&
            (s.energy < s.energyCapacity)) {
            return true
          } else {
            return s.structureType == STRUCTURE_STORAGE && (s.store.energy < s.storeCapacity)
          }
        }
      });
      if(structure) {
        var transferResult = creep.transfer(structure, RESOURCE_ENERGY);
        if (transferResult == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }

        if (transferResult == ERR_INVALID_TARGET) {
          creep.say('Cant transfer');
        }
        if (transferResult == ERR_FULL) {
          creep.say('Full');
        }
      }
    }
  }

  function workDispatcher(creep) {
    switch (creep.memory.type) {
      case UnitType.HARVESTER:
        harvest(creep);
        break;
      case UnitType.MINER:
        mine(creep);
        break;
      case UnitType.BUILDER:
        build(creep);
        break;
      case UnitType.REPAIRER:
        repair(creep);
        break;
      case UnitType.GUARDIAN:
        guard(creep);
        break;
      case UnitType.CARRIER:
        carry(creep);
        break;
      case UnitType.UPGRADER:
        upgrade(creep);
        break;
    }
  }

  return {
    work: workDispatcher
  }
}());