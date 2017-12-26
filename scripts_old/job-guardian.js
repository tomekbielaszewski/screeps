var service = require('service');

module.exports = (function () {

  function work(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      attackTarget(creep, targets);
    } else {
      idle(creep);
    }
  }

  function attackTarget(creep, targets) {
    if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
      service.goTo(targets[0].pos, creep);
    }
  }

  function idle(creep) {
    service.goTo(Game.flags.idle.pos, creep, true);
  }

  return {
    work: work
  }
}());