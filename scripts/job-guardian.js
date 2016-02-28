var service = require('service');

module.exports = (function () {

  function work(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length) {
      if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
        service.goTo(targets[0].pos, creep);
      }
    } else {
      service.goTo(Game.flags.idle.pos, creep, true);
    }
  }

  return {
    work: work
  }
}());