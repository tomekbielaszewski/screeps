var UnitType = require('unitType');
var harvester = require('job-harvester');
var miner = require('job-miner');
var upgrader = require('job-upgrader');
var builder = require('job-builder');
var repairer = require('job-repairer');
var guardian = require('job-guardian');
var carrier = require('job-carrier');
var creepRoutines = require('creepRoutines');

module.exports = (function () {

  function workDispatcher(creep) {
    switch (creep.memory.type) {
      case UnitType.HARVESTER:
        harvester.work(creep);
        break;
      case UnitType.MINER:
        miner.work(creep);
        break;
      case UnitType.BUILDER:
        builder.work(creep);
        break;
      case UnitType.REPAIRER:
        repairer.work(creep);
        break;
      case UnitType.GUARDIAN:
        guardian.work(creep);
        break;
      case UnitType.CARRIER:
        carrier.work(creep);
        break;
      case UnitType.UPGRADER:
        upgrader.work(creep);
        break;
    }

    creepRoutines(creep);
  }

  return {
    work: workDispatcher
  }
}());