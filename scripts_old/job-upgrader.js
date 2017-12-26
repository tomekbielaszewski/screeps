var service = require('service');

module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy == 0) {
      var storage = service.find.closestStructure(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
      takeResources(storage, creep);
    } else {
      upgradeRoomController(creep);
    }
  }

  function upgradeRoomController(creep) {
    if (creep.room.controller) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        service.goTo(creep.room.controller.pos, creep);
      }
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