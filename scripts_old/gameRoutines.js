function cleanMemory() {
  cleanCreeps();

  function cleanCreeps() {
    var cleanMemory = {};
    for (var name in Memory.creeps) {
      var creep = Memory.creeps[name];
      if(Game.creeps[name]) {
        cleanMemory[name] = creep;
      }
    }
    Memory.creeps = cleanMemory;
  }
}

module.exports = function () {
  cleanMemory();
}