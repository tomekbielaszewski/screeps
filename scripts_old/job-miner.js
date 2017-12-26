module.exports = (function () {

  function work(creep) {
    var source = creep.pos.findClosestByRange(FIND_SOURCES);
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

  return {
    work: work
  }
}());