module.exports = (function () {

  function findConstructionSite(creep) {
    var cached = findInCache(creep, function(obj) {
      return (obj.progress && obj.progressTotal) && (obj.progress < obj.progressTotal);
    });
    var inGame;

    if(!cached) {
      inGame = findClosestInGame(creep, FIND_MY_CONSTRUCTION_SITES);
    }

    return cached || inGame;
  }

  function findAny(creep, finder, validator) {
    var cached = findInCache(creep, validator);
    var inGame;

    if(!cached) {
      inGame = findClosestInGame(creep, finder);
    }

    return cached || inGame;
  }

  function findStructure(creep, finder, structureType) {
    var cached = findInCache(creep, function(obj) {
      return obj.structureType === structureType;
    });
    var inGame;

    if(!cached) {
      inGame = findClosestInGame(creep, finder, function(s){
        return structureType ? s.structureType === structureType : true;
      });
    }

    return cached || inGame;
  }

  function findClosestInGame(creep, finder, filter) {
    var _object = creep.pos.findClosestByRange(finder, {
      filter: filter
    });
    creep.memory.finderCache = _object;
    return _object;
  }

  function findInCache(creep, validator) {
    var _object = creep.memory.finderCache;
    if(_object && validator(_object)) {
      return Game.getObjectById(creep.memory.finderCache);
    }
  }

  function goTo(target, creep) {
    if (!target instanceof RoomPosition) {
      throw 'Given target is not an instance of RoomPosition!'
    }
    if (!(isEqual(target, creep.memory.target)) || stuck(creep)) {
      console.log(creep.name + ' pathfind..');
      creep.memory.target = target;
      creep.memory.path = creep.pos.findPathTo(target);
    }
    creep.moveByPath(creep.memory.path);
  }

  function stuck(creep) {
    if(!creep.spawning) {
      var lastPos = _.clone(creep.memory.lastPos);
      creep.memory.lastPos = creep.pos;

      if (isEqual(creep.pos, lastPos)) {
        creep.memory.stuckTicks = creep.memory.stuckTicks + 1;
        if (creep.memory.stuckTicks > 3) {
          console.log(creep.name + ' stuck!');
          return true;
        } else {
          return false;
        }
      }
      creep.memory.stuckTicks = 0;
    } else {
      return false;
    }
  }

  function isEqual(o1, o2) {
    return (JSON.stringify(o1) === JSON.stringify(o2));
  }

  return {
    find: {
      closestStructure: findStructure,
      closestConstructionSite: findConstructionSite,
      closestAny: findAny
    },
    goTo: goTo
  }
}());