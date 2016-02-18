var _ = require('lodash');
var UnitType = require('unitType');

module.exports = (function () {
  function create(spawn, body, name, type) {
    if (_.isString(spawn)) {
      spawn = Game.spawns[spawn];
    }

    var amountOfCreeps = _(Memory.creeps).size();
    return spawn.createCreep(body, name + (amountOfCreeps), {type: type});
  }

  return {
    miner: function (spawn) {
      return create(spawn, [WORK, WORK, MOVE], 'Miner', UnitType.MINER);
    },
    harvester: function (spawn) {
      return create(spawn, [WORK, WORK, CARRY, MOVE], 'Harvester', UnitType.HARVESTER);
    },
    builder: function (spawn) {
      return create(spawn, [WORK, WORK, CARRY, MOVE], 'Builder', UnitType.BUILDER);
    },
    repairer: function (spawn) {
      return create(spawn, [WORK, WORK, CARRY, MOVE], 'Repairer', UnitType.REPAIRER);
    },
    guardian: function (spawn) {
      return create(spawn, [TOUGH, ATTACK, MOVE, MOVE], 'Guard', UnitType.GUARDIAN);
    },
    carrier: function (spawn) {
      return create(spawn, [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'Carrier', UnitType.CARRIER);
    },
    upgrader: function (spawn) {
      return create(spawn, [WORK, WORK, CARRY, MOVE], 'Upgrader', UnitType.UPGRADER);
    },

    custom: function (spawn, body, name, type) {
      return create(spawn, body, name, type);
    }
  }
}());