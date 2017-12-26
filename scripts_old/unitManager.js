var _ = require('lodash');
var queue = require('unitTrainingQueue');
var UnitType = require('unitType');

module.exports = (function () {
  //TODO: Store needs in memory as it is in Queue
  var needs = [
    {
      type: UnitType.GUARDIAN,
      priority: 1,
      need: 3
    },
    {
      type: UnitType.REPAIRER,
      priority: 1,
      need: 5
    },
    {
      type: UnitType.BUILDER,
      priority: 1,
      need: 1
    },
    {
      type: UnitType.UPGRADER,
      priority: 2,
      need: 2
    },
    {
      type: UnitType.CARRIER,
      priority: 2,
      need: 3
    },
    {
      type: UnitType.MINER,
      priority: 2,
      need: 3
    },
    {
      type: UnitType.HARVESTER,
      priority: 3,
      need: 1
    },
  ];

  function countCreeps(type) {
    var counter = 0;
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.type === type) {
        counter++;
      }
    }
    return counter;
  }

  function createIfNeeded() {
    _.forEach(needs, function (need) {
      var currentlyHave = countCreeps(need.type);
      if (need.need > currentlyHave) {
        console.log('Not enough ' + need.type + ' (' + currentlyHave + '/' + need.need + ')');
        queue.enqueue(need.type, need.priority);
      }
    });
  }

  function getNeed(type) {
    var foundNeed = _.find(needs, function (need) {
      return need.type === type;
    });
    if (foundNeed) {
      return foundNeed;
    } else {
      throw 'unknown type ' + type;
    }
  }

  function setNeed(type, newNeed) {
    getNeed(type).need = newNeed;
  }

  function getAllNeeds() {
    return needs;
  }

  return {
    update: createIfNeeded,
    setNeed: setNeed,
    getNeed: getNeed,
    getAllNeeds: getAllNeeds,
    count: countCreeps
  }
}());