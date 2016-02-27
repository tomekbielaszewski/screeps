module.exports = (function () {

  function findStorage(creep) {
    if (creep.memory.structure && creep.memory.structure.structureType == STRUCTURE_STORAGE) { //What if builder is building a storage - construction site will have structureType = 'storage'
      var storage = Game.getObjectById(creep.memory.structure.id);
      if(storage) {
        return storage;
      }
    }
    return findStructureType(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
  }

  function findConstructionSite(creep) {
    if (creep.memory.structure) {
      var construction = Game.getObjectById(creep.memory.structure.id);
      if (construction instanceof ConstructionSite && (construction.progress < construction.progressTotal)) {
        return construction;
      }
    }
    return findStructure(creep, FIND_MY_CONSTRUCTION_SITES);
  }

  function findStructureType(creep, finder, structureType) {
    var filter = function (s) {
      return structureType ? s.structureType == structureType : true;
    };
    return findStructure(creep, finder, filter);
  }

  function findStructure(creep, finder, filter) {
    var structure = creep.pos.findClosestByRange(finder, {
      filter: filter
    });
    creep.memory.structure = structure;
    return structure;
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
      byStructure: findStructure,
      byStructureType: findStructureType,
      withCache: {
        storage: findStorage,
        constructionSite: findConstructionSite
      }
    },
    goTo: goTo
  }
}());