module.exports = (function () {
  function work(creep) {
    if (canBuild(creep)) {

      //console.log('canBuild');
      var construction = findConstructionSite(creep);
      build(construction, creep);
    } else {
      //console.log('cannotBuild');
      var spawn = findStorage(creep)
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        goTo(spawn.pos, creep);
      }
    }
  }

  function canBuild(creep) {
    return creep.carry.energy > 0;
  }

  function findConstructionSite(creep) {
    return findStructure(creep, FIND_MY_CONSTRUCTION_SITES);
  }

  function findStorage(creep) {
    return findStructure(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
  }

  function findStructure(creep, finder, structureType) {
    if(!(creep.memory.structure && creep.memory.structure.structureType == structureType)) {
      console.log("finding structure... " + structureType);
      creep.memory.structure = creep.pos.findClosestByRange(finder, {
        filter: function (s) {
          return structureType ? s.structureType == structureType : true;
        }
      });
    }
    return Game.getObjectById(creep.memory.structure.id);
  }

  function goTo(target, creep) {
    if(!(JSON.stringify(target) === JSON.stringify(creep.memory.target))) {
      creep.memory.target = target;
      creep.memory.path = creep.pos.findPathTo(target);
    }
    creep.moveByPath(creep.memory.path);
  }

  function build(construction, creep) {
    var buildResult = creep.build(construction);

    if (buildResult == ERR_NOT_IN_RANGE) {
      goTo(construction.pos, creep);
    }

    if (buildResult == ERR_RCL_NOT_ENOUGH) {
      creep.say('RCL to low');
    }
    if (buildResult == ERR_NO_BODYPART) {
      creep.say('no WORK');
    }
  }

  return {
    work: work
  }
}());