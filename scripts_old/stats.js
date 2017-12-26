module.exports = (function () {

  function avgCpu() {
    var avg = Memory.avg || {
        sum: 0,
        counter: 0
      };
    avg.sum += Game.cpu.getUsed();
    avg.counter++;
    Memory.avg = avg;
    return avg.sum / avg.counter;
  }

  function print() {
    var time = Game.time;
    var avg = avgCpu();
    var cpuLimit = Game.cpu.limit;
    var cpuTickLimit = Game.cpu.tickLimit;
    var cpuBucket = Game.cpu.bucket;
    var cpuUsed = Game.cpu.getUsed();

    console.log("#### Time:"+time+"; CPU(curr): "+cpuUsed.toFixed(1)+"; CPU(avg): "+avg.toFixed(1)+"/"+cpuLimit+" ["+cpuTickLimit+"] + "+cpuBucket+" ####")
  }

  return {
    print: print
  }
}());