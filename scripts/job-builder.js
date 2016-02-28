var service = require('service');

module.exports = (function () {

  function work(creep) {
    if (canBuild(creep)) {
      var construction = service.find.closestConstructionSite(creep);
      build(construction, creep);
    } else {
      var storage = service.find.closestStructure(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
      takeResources(storage, creep);
    }
  }

  function canBuild(creep) {
    return creep.carry.energy > 0;
  }

  function build(construction, creep) {
    var buildResult = creep.build(construction);

    if (buildResult == ERR_NOT_IN_RANGE) {
      service.goTo(construction.pos, creep);
    } else if (buildResult == ERR_RCL_NOT_ENOUGH) {
      creep.say('RCL to low');
    } else if (buildResult == ERR_NO_BODYPART) {
      creep.say('no [WORK]');
    }
  }

  function takeResources(storage, creep) {
    var transferResult = storage.transferEnergy(creep);
    if (transferResult == ERR_NOT_IN_RANGE) {
      service.goTo(storage.pos, creep);
    }
  }

  return {
    work: work
  }
}());