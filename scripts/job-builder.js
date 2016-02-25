var service = require('service');

module.exports = (function () {

  function work(creep) {
    if (canBuild(creep)) {
      var construction = service.find.withCache.constructionSite(creep);
      build(construction, creep);
    } else {
      var spawn = service.find.withCache.storage(creep);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        service.goTo(spawn.pos, creep);
      }
    }
  }

  function canBuild(creep) {
    return creep.carry.energy > 0;
  }

  function build(construction, creep) {
    var buildResult = creep.build(construction);

    if (buildResult == ERR_NOT_IN_RANGE) {
      service.goTo(construction.pos, creep);
    }

    if (buildResult == ERR_RCL_NOT_ENOUGH) {
      creep.say('RCL to low');
    }
    if (buildResult == ERR_NO_BODYPART) {
      creep.say('no [WORK]');
    }
  }

  return {
    work: work
  }
}());