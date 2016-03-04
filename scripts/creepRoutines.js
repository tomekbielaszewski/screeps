function onDie(creep) {
  if(creep.ticksToLive == 1) {
    dropResources(creep);
    sayGoodbye(creep);
    cleanMemory(creep);
  }

  function dropResources(creep) {
    creep.drop(RESOURCE_ENERGY);
    creep.drop(RESOURCE_POWER);
  }

  function sayGoodbye(creep) {
    creep.say('bye bye...')
  }

  function cleanMemory(creep) {
    console.log('Deleting ' + creep.name);
    Memory.creeps[creep.name] = undefined;
  }
}

module.exports = function (creep) {
  onDie(creep);
}